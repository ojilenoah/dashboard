import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, FilterIcon } from "lucide-react";

export function ProjectsHeader({ total }: { total: number }) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-3">
				<h1 className="font-semibold text-xl tracking-tight">Projects</h1>
				<Badge variant="outline" className="font-normal text-muted-foreground">
					{total}
				</Badge>
			</div>
			<div className="flex items-center gap-2">
				<Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-[1.02]">
					<FilterIcon />
					Filter
				</Button>
				<Button size="sm" className="transition-all duration-200 hover:scale-[1.02]">
					<PlusIcon />
					New project
				</Button>
			</div>
		</div>
	);
}
