import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { DashboardCard } from "@/components/dashboard-card";

const pages = [
	{ path: "/", views: 18420, time: "2m 14s", delta: 6.4 },
	{ path: "/pricing", views: 9210, time: "3m 02s", delta: 11.8 },
	{ path: "/docs/getting-started", views: 7280, time: "4m 41s", delta: 24.3 },
	{ path: "/blog/launching-2026", views: 5840, time: "2m 47s", delta: -3.2 },
	{ path: "/changelog", views: 3110, time: "1m 18s", delta: -0.4 },
	{ path: "/login", views: 2440, time: "0m 38s", delta: 1.9 },
];

export function TopPages() {
	return (
		<DashboardCard className="md:col-span-2 lg:col-span-2">
			<CardHeader>
				<CardTitle>Top pages</CardTitle>
				<CardDescription>Most viewed paths in the last 30 days.</CardDescription>
			</CardHeader>
			<CardContent className="px-0">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Path</TableHead>
							<TableHead className="text-right">Views</TableHead>
							<TableHead className="text-right">Avg. time</TableHead>
							<TableHead className="text-right">Δ</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pages.map((p) => (
							<TableRow key={p.path} className="transition-colors">
								<TableCell className="font-mono text-xs">{p.path}</TableCell>
								<TableCell className="text-right tabular-nums">
									{p.views.toLocaleString()}
								</TableCell>
								<TableCell className="text-right tabular-nums text-muted-foreground">
									{p.time}
								</TableCell>
								<TableCell className="text-right">
									<Delta value={p.delta} className="justify-end">
										<DeltaIcon />
										<DeltaValue />
									</Delta>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</DashboardCard>
	);
}
