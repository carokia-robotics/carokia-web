export interface RoadmapPhase {
	title: string;
	subtitle: string;
	description: string;
	status: 'active' | 'next' | 'upcoming';
}

export const roadmapPhases: RoadmapPhase[] = [
	{
		title: 'Phase 1 — The Brain',
		subtitle: 'carokia-brain',
		description: 'Core AI decision engine, multi-modal perception, and reasoning framework. Foundation for all autonomous behavior.',
		status: 'active'
	},
	{
		title: 'Phase 2 — The Simulation',
		subtitle: 'carokia-sim',
		description: 'Physics-based simulation environment for training and testing across land, air, and sea domains.',
		status: 'next'
	},
	{
		title: 'Phase 3 — The Body',
		subtitle: 'carokia-platform',
		description: 'Quadruped locomotion platform. Walking, running, climbing — the ground domain mastered.',
		status: 'upcoming'
	},
	{
		title: 'Phase 4 — The Wings',
		subtitle: 'carokia-platform',
		description: 'Aerial capability module. Hybrid VTOL systems for seamless ground-to-air transitions.',
		status: 'upcoming'
	},
	{
		title: 'Phase 5 — The Deep',
		subtitle: 'carokia-platform',
		description: 'Aquatic locomotion and underwater autonomy. Sealed systems, hydrodynamic adaptation.',
		status: 'upcoming'
	},
	{
		title: 'Phase 6 — The Guardian',
		subtitle: 'carokia-guardian',
		description: 'Safety and ethics framework. Behavioral constraints, human-safety guarantees, and trust protocols.',
		status: 'upcoming'
	},
	{
		title: 'Phase 7 — The Companion',
		subtitle: 'carokia-soul',
		description: 'Personality, emotional modeling, and long-term bonding. The robot becomes a partner.',
		status: 'upcoming'
	},
	{
		title: 'Phase 8 — The Titan',
		subtitle: 'carokia',
		description: 'Full integration. All domains, all capabilities, one unified autonomous system.',
		status: 'upcoming'
	}
];
