<script lang="ts">
	import { base } from '$app/paths';
	import { roadmapPhases } from '$lib/data/roadmap';
	import { repos } from '$lib/data/repos';

	let scrolled = $state(false);

	const navLinks = [
		{ label: 'Vision', href: '#vision' },
		{ label: 'Architecture', href: '#architecture' },
		{ label: 'Roadmap', href: '#roadmap' },
		{ label: 'Repos', href: '#repos' },
		{ label: 'Contribute', href: '#contribute' }
	];

	const visionCards = [
		{
			title: 'Multi-Domain',
			description: 'One platform that walks, flies, and swims. Seamless transitions between land, air, and sea.'
		},
		{
			title: 'Intelligent',
			description: 'Advanced AI perception and reasoning. Understands context, learns from experience, adapts in real-time.'
		},
		{
			title: 'Protective',
			description: 'Built-in safety and ethics framework. Prioritizes human safety above all mission objectives.'
		},
		{
			title: 'Capable',
			description: 'Search and rescue, exploration, environmental monitoring — designed for missions that matter.'
		},
		{
			title: 'Autonomous',
			description: 'Full self-direction in complex environments. Operates independently when communication is lost.'
		},
		{
			title: 'Loyal',
			description: 'Bonded to its operator. Personality, memory, and trust built over time. A true companion.'
		}
	];

	const architectureTree = `carokia/
├── brain/          # AI decision engine & perception
│   ├── perception/ # Multi-modal sensor fusion
│   ├── reasoning/  # Planning & decision making
│   └── learning/   # Online adaptation & training
├── body/           # Locomotion & physical control
│   ├── quadruped/  # Walking, running, climbing
│   ├── aerial/     # VTOL flight systems
│   └── aquatic/    # Underwater propulsion
├── guardian/        # Safety & ethics framework
│   ├── constraints/ # Behavioral boundaries
│   └── trust/       # Human-safety protocols
├── soul/            # Personality & bonding
│   ├── emotion/     # Emotional modeling
│   └── memory/      # Long-term experience
├── simulation/      # Training environments
│   ├── physics/     # Multi-domain physics
│   └── scenarios/   # Mission simulations
└── hardware/        # Platform abstraction
    ├── sensors/     # Camera, LiDAR, IMU, sonar
    ├── actuators/   # Motors, servos, thrusters
    └── power/       # Battery & power management`;

	const contributorRoles = [
		'AI / ML Engineers',
		'Robotics Engineers',
		'Simulation Developers',
		'Hardware Designers',
		'Safety Researchers',
		'Technical Writers',
		'Community Builders'
	];

	function handleScroll() {
		scrolled = window.scrollY > 50;
	}
</script>

<svelte:window onscroll={handleScroll} />

<!-- HEADER -->
<header class="header" class:scrolled>
	<nav class="nav">
		<a href="{base}/" class="logo">CAROKIA</a>
		<div class="nav-links">
			{#each navLinks as link}
				<a href={link.href}>{link.label}</a>
			{/each}
			<a href="https://github.com/carokia-robotics" class="github-link" target="_blank" rel="noopener">
				GitHub
			</a>
		</div>
	</nav>
</header>

<!-- HERO -->
<section class="hero">
	<div class="hero-content">
		<span class="eyebrow">OPEN SOURCE ROBOTICS</span>
		<h1 class="headline">Walks. Flies. Swims.<br />Thinks. Protects.</h1>
		<p class="subtitle">The open-source multi-domain autonomous robot.</p>
		<div class="cta-group">
			<a href="https://github.com/carokia-robotics" class="btn btn-primary" target="_blank" rel="noopener">
				View on GitHub
			</a>
			<a href="https://github.com/carokia-robotics/carokia" class="btn btn-secondary" target="_blank" rel="noopener">
				Read the Manifesto
			</a>
		</div>
	</div>
	<div class="hero-glow"></div>
</section>

<!-- VISION -->
<section id="vision" class="section">
	<div class="container">
		<h2 class="section-title">Vision</h2>
		<p class="section-subtitle">Six pillars of the Carokia platform</p>
		<div class="vision-grid">
			{#each visionCards as card}
				<div class="vision-card">
					<h3>{card.title}</h3>
					<p>{card.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ARCHITECTURE -->
<section id="architecture" class="section section-alt">
	<div class="container">
		<h2 class="section-title">Architecture</h2>
		<p class="section-subtitle">The project structure</p>
		<div class="terminal">
			<div class="terminal-header">
				<span class="terminal-dot red"></span>
				<span class="terminal-dot yellow"></span>
				<span class="terminal-dot green"></span>
				<span class="terminal-title">carokia — project tree</span>
			</div>
			<pre class="terminal-body">{architectureTree}</pre>
		</div>
	</div>
</section>

<!-- ROADMAP -->
<section id="roadmap" class="section">
	<div class="container">
		<h2 class="section-title">Roadmap</h2>
		<p class="section-subtitle">From brain to titan — the path forward</p>
		<div class="timeline">
			{#each roadmapPhases as phase, i}
				<div class="timeline-item" class:active={phase.status === 'active'} class:next={phase.status === 'next'}>
					<div class="timeline-marker">
						<span class="timeline-number">{i + 1}</span>
					</div>
					<div class="timeline-content">
						<h3>{phase.title}</h3>
						<span class="timeline-tag">{phase.subtitle}</span>
						{#if phase.status === 'active'}
							<span class="status-badge active">Active</span>
						{:else if phase.status === 'next'}
							<span class="status-badge next">Next</span>
						{/if}
						<p>{phase.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- REPOS -->
<section id="repos" class="section section-alt">
	<div class="container">
		<h2 class="section-title">Repositories</h2>
		<p class="section-subtitle">Explore the codebase</p>
		<div class="repo-grid">
			{#each repos as repo}
				<a href={repo.url} class="repo-card" target="_blank" rel="noopener">
					<h3>{repo.name}</h3>
					<p>{repo.description}</p>
					<div class="repo-tags">
						{#each repo.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- CONTRIBUTE -->
<section id="contribute" class="section">
	<div class="container contribute-container">
		<h2 class="section-title">Contribute</h2>
		<p class="section-subtitle">Join the mission. Build the future of autonomous robotics.</p>
		<div class="roles">
			{#each contributorRoles as role}
				<span class="role-badge">{role}</span>
			{/each}
		</div>
		<div class="cta-group">
			<a href="https://github.com/carokia-robotics" class="btn btn-primary" target="_blank" rel="noopener">
				Get Started on GitHub
			</a>
			<a href="https://github.com/carokia-robotics/planning" class="btn btn-secondary" target="_blank" rel="noopener">
				View Open Issues
			</a>
		</div>
	</div>
</section>

<!-- FOOTER -->
<footer class="footer">
	<div class="container footer-inner">
		<span class="footer-logo">CAROKIA</span>
		<span class="footer-text">Open source under MIT License. Built for the future.</span>
		<a href="https://github.com/carokia-robotics" target="_blank" rel="noopener">GitHub</a>
	</div>
</footer>

<style>
	/* ---- HEADER ---- */
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1rem 2rem;
		transition: background 0.3s, backdrop-filter 0.3s;
	}
	.header.scrolled {
		background: rgba(10, 10, 15, 0.9);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(0, 212, 255, 0.1);
	}
	.nav {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.logo {
		font-size: 1.4rem;
		font-weight: 800;
		letter-spacing: 0.2em;
		color: #00d4ff !important;
	}
	.nav-links {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}
	.nav-links a {
		font-size: 0.875rem;
		font-weight: 500;
		color: #a0a0a0;
		transition: color 0.2s;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.nav-links a:hover {
		color: #00d4ff;
	}
	.github-link {
		padding: 0.4rem 1rem;
		border: 1px solid #00d4ff;
		border-radius: 6px;
		color: #00d4ff !important;
	}
	.github-link:hover {
		background: rgba(0, 212, 255, 0.1);
	}

	/* ---- HERO ---- */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
		overflow: hidden;
	}
	.hero-content {
		position: relative;
		z-index: 1;
	}
	.hero-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, rgba(124, 58, 237, 0.04) 50%, transparent 70%);
		border-radius: 50%;
		pointer-events: none;
	}
	.eyebrow {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.3em;
		color: #7c3aed;
		margin-bottom: 1.5rem;
		padding: 0.4rem 1.2rem;
		border: 1px solid rgba(124, 58, 237, 0.3);
		border-radius: 50px;
	}
	.headline {
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 900;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #7c3aed 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.subtitle {
		font-size: 1.25rem;
		color: #808090;
		margin-bottom: 2.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}
	.cta-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	.btn {
		display: inline-block;
		padding: 0.8rem 2rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 0.95rem;
		transition: all 0.2s;
		cursor: pointer;
	}
	.btn-primary {
		background: #00d4ff;
		color: #0a0a0f !important;
	}
	.btn-primary:hover {
		background: #00b8e0;
		color: #0a0a0f !important;
		transform: translateY(-1px);
	}
	.btn-secondary {
		border: 1px solid #7c3aed;
		color: #7c3aed !important;
	}
	.btn-secondary:hover {
		background: rgba(124, 58, 237, 0.1);
		color: #7c3aed !important;
		transform: translateY(-1px);
	}

	/* ---- SECTIONS ---- */
	.section {
		padding: 6rem 2rem;
	}
	.section-alt {
		background: #0d0d14;
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 0.5rem;
		color: #ffffff;
	}
	.section-subtitle {
		text-align: center;
		color: #707080;
		font-size: 1.1rem;
		margin-bottom: 3rem;
	}

	/* ---- VISION ---- */
	.vision-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
	}
	.vision-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		padding: 2rem;
		transition: border-color 0.3s, transform 0.2s;
	}
	.vision-card:hover {
		border-color: rgba(0, 212, 255, 0.3);
		transform: translateY(-2px);
	}
	.vision-card h3 {
		font-size: 1.2rem;
		font-weight: 700;
		color: #00d4ff;
		margin-bottom: 0.75rem;
	}
	.vision-card p {
		color: #a0a0a8;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	/* ---- ARCHITECTURE ---- */
	.terminal {
		background: #111118;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 12px;
		overflow: hidden;
		max-width: 700px;
		margin: 0 auto;
	}
	.terminal-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}
	.terminal-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	.terminal-dot.red { background: #ff5f57; }
	.terminal-dot.yellow { background: #febc2e; }
	.terminal-dot.green { background: #28c840; }
	.terminal-title {
		margin-left: 0.75rem;
		font-size: 0.8rem;
		color: #606070;
	}
	.terminal-body {
		padding: 1.5rem;
		font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.8rem;
		line-height: 1.7;
		color: #00d4ff;
		overflow-x: auto;
	}

	/* ---- ROADMAP ---- */
	.timeline {
		position: relative;
		max-width: 700px;
		margin: 0 auto;
		padding-left: 3rem;
	}
	.timeline::before {
		content: '';
		position: absolute;
		left: 1rem;
		top: 0;
		bottom: 0;
		width: 2px;
		background: rgba(255, 255, 255, 0.08);
	}
	.timeline-item {
		position: relative;
		margin-bottom: 2.5rem;
	}
	.timeline-marker {
		position: absolute;
		left: -2.5rem;
		top: 0.25rem;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: #16161e;
		border: 2px solid rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.timeline-item.active .timeline-marker {
		border-color: #00d4ff;
		box-shadow: 0 0 12px rgba(0, 212, 255, 0.3);
	}
	.timeline-item.next .timeline-marker {
		border-color: #7c3aed;
	}
	.timeline-number {
		font-size: 0.7rem;
		font-weight: 700;
		color: #606070;
	}
	.timeline-item.active .timeline-number {
		color: #00d4ff;
	}
	.timeline-item.next .timeline-number {
		color: #7c3aed;
	}
	.timeline-content h3 {
		font-size: 1.1rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 0.25rem;
	}
	.timeline-tag {
		display: inline-block;
		font-size: 0.75rem;
		color: #606070;
		font-family: 'SF Mono', 'Fira Code', monospace;
		margin-bottom: 0.5rem;
	}
	.status-badge {
		display: inline-block;
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.15rem 0.6rem;
		border-radius: 50px;
		margin-left: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.status-badge.active {
		background: rgba(0, 212, 255, 0.15);
		color: #00d4ff;
	}
	.status-badge.next {
		background: rgba(124, 58, 237, 0.15);
		color: #7c3aed;
	}
	.timeline-content p {
		color: #808090;
		font-size: 0.9rem;
	}

	/* ---- REPOS ---- */
	.repo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
	}
	.repo-card {
		display: block;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 10px;
		padding: 1.5rem;
		transition: border-color 0.3s, transform 0.2s;
		color: inherit !important;
	}
	.repo-card:hover {
		border-color: rgba(0, 212, 255, 0.3);
		transform: translateY(-2px);
		color: inherit !important;
	}
	.repo-card h3 {
		font-size: 1rem;
		font-weight: 700;
		color: #00d4ff;
		margin-bottom: 0.5rem;
		font-family: 'SF Mono', 'Fira Code', monospace;
	}
	.repo-card p {
		font-size: 0.9rem;
		color: #808090;
		margin-bottom: 1rem;
		line-height: 1.5;
	}
	.repo-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.tag {
		font-size: 0.7rem;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background: rgba(124, 58, 237, 0.1);
		color: #7c3aed;
		font-weight: 500;
	}

	/* ---- CONTRIBUTE ---- */
	.contribute-container {
		text-align: center;
	}
	.roles {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
	}
	.role-badge {
		padding: 0.5rem 1.25rem;
		border-radius: 50px;
		border: 1px solid rgba(0, 212, 255, 0.2);
		color: #c0c0c8;
		font-size: 0.85rem;
		font-weight: 500;
		transition: border-color 0.2s, color 0.2s;
	}
	.role-badge:hover {
		border-color: #00d4ff;
		color: #00d4ff;
	}

	/* ---- FOOTER ---- */
	.footer {
		padding: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}
	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.footer-logo {
		font-weight: 800;
		letter-spacing: 0.15em;
		color: #404050;
		font-size: 0.9rem;
	}
	.footer-text {
		color: #404050;
		font-size: 0.8rem;
	}
	.footer a {
		color: #404050;
		font-size: 0.8rem;
	}
	.footer a:hover {
		color: #00d4ff;
	}

	/* ---- RESPONSIVE ---- */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}
		.vision-grid {
			grid-template-columns: 1fr;
		}
		.repo-grid {
			grid-template-columns: 1fr;
		}
		.section {
			padding: 4rem 1.5rem;
		}
		.footer-inner {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
