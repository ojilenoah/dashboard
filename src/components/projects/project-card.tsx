import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import type { Project, ProjectStatus } from "@/components/projects/types";

const statusMeta: Record<
	ProjectStatus,
	{ label: string; tone: string; bar: string }
> = {
	"on-track": {
		label: "On track",
		tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
		bar: "bg-emerald-500",
	},
	"at-risk": {
		label: "At risk",
		tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
		bar: "bg-amber-500",
	},
	blocked: {
		label: "Blocked",
		tone: "bg-red-500/10 text-red-600 dark:text-red-400",
		bar: "bg-red-500",
	},
	completed: {
		label: "Completed",
		tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
		bar: "bg-sky-500",
	},
};

export function ProjectCard({ project }: { project: Project }) {
	const status = statusMeta[project.status];

	return (
		<Card className="card-hover group">
			<CardHeader className="gap-2">
				<div className="flex items-start justify-between gap-3">
					<div className="flex flex-col gap-1">
						<CardTitle className="text-base">{project.name}</CardTitle>
						<CardDescription className="text-xs">
							{project.description}
						</CardDescription>
					</div>
					<Badge
						className={`border-none font-medium text-[10px] ${status.tone}`}
						variant="secondary"
					>
						{status.label}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<div className="space-y-1.5">
					<div className="flex items-baseline justify-between text-xs">
						<span className="text-muted-foreground">Progress</span>
						<span className="font-medium tabular-nums">{project.progress}%</span>
					</div>
					<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
						<div
							className={`h-full rounded-full transition-[width] duration-700 ease-out ${status.bar}`}
							style={{ width: `${project.progress}%` }}
						/>
					</div>
				</div>
				<div className="flex flex-wrap gap-1.5">
					{project.tags.map((tag) => (
						<Badge key={tag} variant="outline" className="text-[10px] font-normal">
							{tag}
						</Badge>
					))}
				</div>
			</CardContent>
			<CardFooter className="justify-between gap-2">
				<div className="flex -space-x-1.5">
					{project.team.map((m) => {
						const initials = m.name
							.split(" ")
							.map((p) => p.charAt(0))
							.slice(0, 2)
							.join("");
						return (
							<Avatar
								key={m.name}
								className="size-6 ring-2 ring-card transition-transform duration-200 group-hover:translate-y-[-1px]"
								title={m.name}
							>
								{m.src ? <AvatarImage src={m.src} alt={m.name} /> : null}
								<AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
							</Avatar>
						);
					})}
				</div>
				<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<CalendarIcon className="size-3.5" />
					<span>{project.dueDate}</span>
				</div>
			</CardFooter>
		</Card>
	);
}
