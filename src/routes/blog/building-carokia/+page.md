---
title: Building an AI Robot Companion in Rust
date: 2026-03-22
---

<svelte:head>
	<title>Building an AI Robot Companion in Rust - Carokia</title>
</svelte:head>

<div class="blog-post">
<a href="/carokia-web/blog" class="back-link">Back to blog</a>

# Building an AI Robot Companion in Rust

<time datetime="2026-03-22">March 22, 2026</time>

Carokia is an autonomous robot brain written from the ground up in Rust. It integrates language understanding, computer vision, speech recognition, persistent memory, autonomous navigation, and a guardian security mode into a single coherent system. This post walks through why Rust, how the architecture works, what the system can do today, and where it is going.

## Why Rust for Robotics

Most robotics AI stacks are built in Python, and for good reason: the ecosystem is mature, iteration is fast, and most ML frameworks are Python-first. But when you move from prototyping to a system that needs to run reliably on real hardware, Python's weaknesses become hard to ignore.

Rust solves the problems that matter most in robotics:

**Memory safety without garbage collection.** A robot brain runs perception, planning, and actuation concurrently. Garbage collector pauses during real-time navigation are not acceptable. Rust gives you deterministic memory management with zero runtime overhead.

**Fearless concurrency.** When a sensor thread, a planning task, and an actuator loop all share state, data races are not hypothetical -- they are the default in most languages. Rust's ownership model eliminates them at compile time.

**Trait-based abstraction.** This turned out to be the biggest win. The core of Carokia is built on traits that define interfaces for sensors, actuators, and communication:

```rust
#[async_trait]
pub trait SensorSource: Send + Sync {
    async fn read_frame(&mut self) -> Result<SensorFrame, BrainError>;
}

#[async_trait]
pub trait Actuator: Send + Sync {
    async fn execute(&mut self, command: ActionCommand) -> Result<(), BrainError>;
}
```

A simulated lidar and a real hardware lidar implement the same `SensorSource` trait. The navigation code does not know or care which one it is talking to. This means algorithms tested in simulation transfer to hardware with zero code changes -- just a different trait implementation.

**Compilation catches integration bugs.** In a Python robotics stack, you discover at runtime that a perception module returns a different data format than the planner expects. In Rust, the type system catches this at compile time. When you have 8 crates that need to work together, this matters enormously.

## Architecture: Hexagonal Design with 8 Crates

Carokia follows a hexagonal (ports-and-adapters) architecture. The core defines the interfaces. Domain crates implement the logic. The top-level brain crate orchestrates everything.

```
                    +-------------------+
                    |   carokia-brain   |  Orchestrator
                    +--------+----------+
                             |
      +----------+-----------+-----------+----------+
      |          |           |           |          |
  +---+---+ +---+----+ +----+---+ +-----+--+ +----+----+
  | core  | |language| | memory | |planner | |decision |
  |traits,| | LLM,  | | short- | | rule   | |behavior,|
  | types,| | chat,  | | term,  | | & LLM  | | patrol, |
  | bus   | | TTS    | | SQLite | | goals  | | threat  |
  +-------+ +--------+ +--------+ +--------+ +---------+
                                                   |
  +-----------+                          +---------+------+
  |perception |                          |   carokia-sim  |
  | vision,   |                          | 2D world,      |
  | audio,    |                          | physics, lidar,|
  | whisper   |                          | ASCII renderer  |
  +-----------+                          +----------------+
```

Here is what each crate does:

- **carokia-core** -- Shared types (`SensorFrame`, `ActionCommand`), traits (`SensorSource`, `Actuator`, `MessageBus`), the event bus, and error definitions. Every other crate depends on this.
- **carokia-language** -- LLM integration via Ollama (and optionally Claude). Manages conversation history, system prompts, and streaming responses. The backend is trait-based, so adding a new LLM provider means implementing one trait.
- **carokia-perception** -- Sensor processing. Camera capture via ffmpeg, face detection, scene analysis through LLM vision models, and speech-to-text via Whisper (using `whisper-rs` bindings to whisper.cpp).
- **carokia-memory** -- Short-term in-process memory and long-term SQLite persistence. Stores facts, experiences, and operator information that persist across sessions.
- **carokia-planner** -- Goal decomposition. A rule-based planner handles known patterns, and an LLM-powered planner handles open-ended goals by breaking them into concrete steps.
- **carokia-decision** -- The behavior engine. Implements `PatrolBehavior`, `ThreatDetectionBehavior`, and emergency response. Behaviors are composable and implement a shared `Behavior` trait.
- **carokia-sim** -- A 2D physics simulation with a robot, walls, obstacles, lidar ray-casting, and an ASCII terminal renderer. This is the testbed for all navigation and guardian algorithms.
- **carokia-brain** -- The top-level orchestrator that wires everything together. Contains the alert manager, the main loop, and all the runnable demo examples.

The key insight is that the crate boundaries are also the abstraction boundaries. When you want to swap a component -- say, replace the simulated lidar with a real hardware driver -- you write a new `SensorSource` implementation in the perception crate and plug it in. The planner, decision engine, and brain orchestrator do not change.

## What Carokia Can Do Today

There are seven runnable demos that show the system's current capabilities. All of them run in a terminal with no hardware required.

**Chat CLI.** An interactive conversation with Carokia using a local LLM. The conversation manager maintains a sliding window of context. This is the simplest entry point -- one command to run, and you are talking to the robot.

**Voice conversation.** Carokia listens through a microphone, transcribes speech with Whisper running on-device, and responds via the LLM. The entire pipeline -- audio capture, transcription, inference, response -- runs locally.

**Vision analysis.** Point a camera or pass an image file, and Carokia describes the scene using an LLM vision model. It identifies objects, people, and spatial relationships. A separate face detection module runs independently for low-latency detection.

**Memory and planning.** Carokia stores facts in SQLite and recalls them across sessions. Given a high-level goal like "patrol the north wing and report anomalies," the LLM planner decomposes it into concrete sub-steps.

**Navigation simulation.** An autonomous 2D robot navigates a room with obstacles using lidar-based obstacle avoidance. The world, lidar rays, and robot path are rendered live in ASCII. The same navigation logic will work on hardware -- the lidar interface is identical.

**Guardian mode.** The most complete demo. A robot patrols waypoints around a room. After 50 ticks, an intruder appears. The threat detection system escalates through Suspicious to Confirmed, triggering an emergency halt and alert. The behavior engine, threat detection, and alert manager all run without an LLM -- this is deterministic Rust logic, not probabilistic inference.

**Demo loop.** Cycles through multiple capabilities in sequence to show the breadth of the system.

## What Is Next

The immediate roadmap has three priorities:

**Hardware integration.** The trait-based design was built specifically for this moment. The next step is implementing `SensorSource` and `Actuator` for real hardware -- starting with a Raspberry Pi or Jetson-based quadruped platform with an actual lidar and camera.

**ROS2 bridge.** A significant amount of robotics infrastructure exists in the ROS2 ecosystem. Rather than rebuilding it, Carokia will get a bridge crate that exposes its traits as ROS2 nodes, allowing hybrid architectures where Rust handles the brain and ROS2 handles the body.

**Multi-domain locomotion.** Carokia's long-term vision is a robot that walks, flies, and swims. The simulation crate will expand to 3D physics, and the planner will learn to reason about domain transitions -- when to switch from walking to flying, how to handle the physical constraints of each mode.

**Improved learning.** The current system uses LLMs for reasoning but does not learn from experience in a deep sense. Future work will add online adaptation: the robot gets better at its specific environment over time, tuning navigation parameters, learning operator preferences, and building a richer world model.

## Get Involved

Carokia is MIT licensed and open for contributions. The areas where help would have the most impact:

- **Robotics hardware** -- If you have experience with embedded Rust, motor control, or sensor drivers, the hardware abstraction layer needs real implementations.
- **Simulation** -- Expanding the 2D sim to 3D, adding more realistic physics, or building training scenarios.
- **AI/ML** -- Better planning algorithms, online learning, or improved vision pipelines.
- **Testing** -- The codebase needs more integration tests, particularly for the async orchestration paths.

To get started:

```bash
git clone https://github.com/carokia-robotics/carokia-brain.git
cd carokia-brain
cargo test --workspace
cargo run --example chat_cli
```

Check the [quickstart guide](https://github.com/carokia-robotics/carokia-brain/blob/main/docs/quickstart.md) for detailed setup instructions, or visit the [repository](https://github.com/carokia-robotics/carokia-brain) to explore the code.

</div>

<style>
	.blog-post {
		max-width: 740px;
		margin: 0 auto;
		padding: 6rem 2rem 4rem;
		line-height: 1.8;
	}
	.back-link {
		display: inline-block;
		font-size: 0.85rem;
		color: #707080;
		margin-bottom: 2rem;
	}
	.back-link:hover {
		color: #00d4ff;
	}
	.blog-post :global(h1) {
		font-size: 2.2rem;
		font-weight: 800;
		color: #ffffff;
		margin-bottom: 0.5rem;
		line-height: 1.2;
	}
	.blog-post :global(time) {
		display: block;
		font-size: 0.85rem;
		color: #505060;
		font-family: 'SF Mono', 'Fira Code', monospace;
		margin-bottom: 2.5rem;
	}
	.blog-post :global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
		color: #00d4ff;
		margin-top: 3rem;
		margin-bottom: 1rem;
	}
	.blog-post :global(p) {
		color: #b0b0b8;
		margin-bottom: 1.25rem;
		font-size: 1.05rem;
	}
	.blog-post :global(strong) {
		color: #e0e0e8;
	}
	.blog-post :global(pre) {
		background: #111118;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 1.25rem;
		overflow-x: auto;
		margin: 1.5rem 0;
		font-size: 0.85rem;
		line-height: 1.6;
	}
	.blog-post :global(code) {
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		color: #00d4ff;
	}
	.blog-post :global(pre code) {
		color: #c0c0c8;
	}
	.blog-post :global(ul),
	.blog-post :global(ol) {
		color: #b0b0b8;
		margin-bottom: 1.25rem;
		padding-left: 1.5rem;
	}
	.blog-post :global(li) {
		margin-bottom: 0.5rem;
	}
	.blog-post :global(a) {
		color: #00d4ff;
	}
	.blog-post :global(a:hover) {
		color: #7c3aed;
	}
</style>
