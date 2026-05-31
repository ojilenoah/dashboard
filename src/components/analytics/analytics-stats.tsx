import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { DashboardCard } from "@/components/dashboard-card";

type Stat = { label: string; value: string; delta: number; shimmer?: boolean };

const stats: Stat[] = [
	{ label: "Visitors", value: "24,891", delta: 8.2, shimmer: true },
	{ label: "Pageviews", value: "92,401", delta: 12.6 },
	{ label: "Bounce rate", value: "38.4%", delta: -2.1 },
	{ label: "Avg. session", value: "3m 12s", delta: 4.7 },
];

export function AnalyticsStats() {
	return (
		<>
			{stats.map((s) => (
				<DashboardCard key={s.label} className="card-hover">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="font-normal text-xs tracking-wide">
							{s.label}
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-row items-center gap-2">
						<p
							className={`font-semibold text-2xl tabular-nums ${
								s.shimmer ? "shimmer-text" : ""
							}`}
						>
							{s.value}
						</p>
					</CardContent>
					<CardFooter className="gap-1 rounded-none bg-background text-xs">
						<Delta value={s.delta}>
							<DeltaIcon />
							<DeltaValue />
						</Delta>
						<span className="text-muted-foreground">vs last 30 days</span>
					</CardFooter>
				</DashboardCard>
			))}
		</>
	);
}
