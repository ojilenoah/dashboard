export type ProjectStatus = "on-track" | "at-risk" | "blocked" | "completed";

export type ProjectMember = {
	name: string;
	src?: string;
};

export type Project = {
	id: string;
	name: string;
	description: string;
	status: ProjectStatus;
	progress: number;
	dueDate: string;
	team: ProjectMember[];
	tags: string[];
};
