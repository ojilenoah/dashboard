import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/dashboard-card";

const sources = [
	{ name: "Direct", value: 38, count: "9,438" },
	{ name: "Organic search", value: 27, count: "6,724" },
	{ name: "Referral", value: 18, count: "4,480" },
	{ name: "Social", value: 11, count: "2,738" },
	{ name: "Email", value: 6, count: "1,493" },
];

export function TrafficSources() {
	return (
		<DashboardCard className="md:col-span-1">
			<CardHeader>
				<CardTitle>Traffic sources</CardTitle>
				<CardDescription>Share of visitors by channel.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				{sources.map((s) => (
					<div key={s.name} className="space-y-1.5">
						<div className="flex items-baseline justify-between text-xs">
							<span className="font-medium text-foreground">{s.name}</span>
							<span className="tabular-nums text-muted-foreground">
								{s.count}
								<span className="ml-2 text-foreground/80">{s.value}%</span>
							</span>
						</div>
						<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
							<div
								className="h-full rounded-full bg-foreground/80 transition-[width] duration-700 ease-out"
								style={{ width: `${s.value}%` }}
							/>
						</div>
					</div>
				))}
			</CardContent>
		</DashboardCard>
	);
}
