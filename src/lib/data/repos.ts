export interface Repo {
	name: string;
	description: string;
	url: string;
	tags: string[];
}

export const repos: Repo[] = [
	{
		name: 'carokia',
		description: 'Monorepo root — project manifesto, governance, and integration.',
		url: 'https://github.com/carokia-robotics/carokia',
		tags: ['core', 'manifesto']
	},
	{
		name: 'carokia-brain',
		description: 'AI decision engine, perception stack, and reasoning framework.',
		url: 'https://github.com/carokia-robotics/carokia-brain',
		tags: ['ai', 'autonomy']
	},
	{
		name: 'carokia-sim',
		description: 'Multi-domain physics simulation and training environment.',
		url: 'https://github.com/carokia-robotics/carokia-sim',
		tags: ['simulation', 'training']
	},
	{
		name: 'carokia-web',
		description: 'This website — project homepage and documentation hub.',
		url: 'https://github.com/carokia-robotics/carokia-web',
		tags: ['web', 'docs']
	},
	{
		name: 'carokia-platform',
		description: 'Hardware abstraction, locomotion controllers, and sensor drivers.',
		url: 'https://github.com/carokia-robotics/carokia-platform',
		tags: ['hardware', 'locomotion']
	},
	{
		name: 'research',
		description: 'Research papers, literature reviews, and technical references.',
		url: 'https://github.com/carokia-robotics/research',
		tags: ['research', 'papers']
	},
	{
		name: 'planning',
		description: 'Project planning, milestones, and coordination documents.',
		url: 'https://github.com/carokia-robotics/planning',
		tags: ['planning', 'roadmap']
	},
	{
		name: 'inspiration',
		description: 'Design inspiration, concept art, and vision references.',
		url: 'https://github.com/carokia-robotics/inspiration',
		tags: ['design', 'vision']
	}
];
