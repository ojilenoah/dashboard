import { ProjectsHeader } from "@/components/projects/projects-header";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project, ProjectMember } from "@/components/projects/types";

const noah: ProjectMember = { name: "Noah Ojile", src: "/noah.png" };
const adaeze: ProjectMember = { name: "Adaeze Okonkwo" };
const tunde: ProjectMember = { name: "Tunde Adebayo" };
const chiamaka: ProjectMember = { name: "Chiamaka Nwosu" };
const emeka: ProjectMember = { name: "Emeka Eze" };

const projects: Project[] = [
	{
		id: "atlas",
		name: "Atlas API",
		description: "Core REST + event ingestion gateway.",
		status: "on-track",
		progress: 78,
		dueDate: "Jun 14",
		team: [noah, adaeze, tunde],
		tags: ["Backend", "Q2"],
	},
	{
		id: "north-star",
		name: "North Star dashboard",
		description: "Realtime exec metrics + alerting.",
		status: "at-risk",
		progress: 52,
		dueDate: "Jun 28",
		team: [chiamaka, noah],
		tags: ["Frontend", "Data"],
	},
	{
		id: "kepler",
		name: "Kepler design system",
		description: "Shared tokens, primitives, motion.",
		status: "on-track",
		progress: 91,
		dueDate: "Jun 06",
		team: [tunde, adaeze],
		tags: ["Design"],
	},
	{
		id: "voyager",
		name: "Voyager onboarding",
		description: "First-run flow + activation analytics.",
		status: "on-track",
		progress: 34,
		dueDate: "Jul 12",
		team: [chiamaka, emeka],
		tags: ["Growth"],
	},
	{
		id: "orion",
		name: "Orion billing migration",
		description: "Move legacy billing to Stripe usage.",
		status: "blocked",
		progress: 18,
		dueDate: "Aug 02",
		team: [noah, adaeze, chiamaka],
		tags: ["Backend", "Risk"],
	},
	{
		id: "lyra",
		name: "Lyra mobile beta",
		description: "iOS + Android wrapper using React Native.",
		status: "completed",
		progress: 100,
		dueDate: "May 20",
		team: [emeka],
		tags: ["Mobile"],
	},
];

export function ProjectsView() {
	return (
		<div className="flex flex-col gap-4">
			<ProjectsHeader total={projects.length} />
			<div className="fade-rise grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((p) => (
					<ProjectCard key={p.id} project={p} />
				))}
			</div>
		</div>
	);
}
