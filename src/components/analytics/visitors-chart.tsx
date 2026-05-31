"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { DashboardCard } from "@/components/dashboard-card";

const visitorsDaily = [
	{ day: "May 1", visitors: 720, returning: 310 },
	{ day: "May 4", visitors: 880, returning: 340 },
	{ day: "May 7", visitors: 740, returning: 290 },
	{ day: "May 10", visitors: 980, returning: 410 },
	{ day: "May 13", visitors: 1120, returning: 460 },
	{ day: "May 16", visitors: 1040, returning: 470 },
	{ day: "May 19", visitors: 1280, returning: 520 },
	{ day: "May 22", visitors: 1380, returning: 560 },
	{ day: "May 25", visitors: 1220, returning: 540 },
	{ day: "May 28", visitors: 1490, returning: 610 },
	{ day: "May 31", visitors: 1640, returning: 680 },
];

const chartConfig = {
	visitors: { label: "Visitors", color: "var(--chart-1)" },
	returning: { label: "Returning", color: "var(--chart-3)" },
} satisfies ChartConfig;

const first = visitorsDaily[0].visitors;
const last = visitorsDaily.at(-1)!.visitors;
const growthPct = (((last - first) / first) * 100).toFixed(1);

export function VisitorsChart() {
	return (
		<DashboardCard className="gap-0 md:col-span-2 lg:col-span-3">
			<CardHeader className="gap-2">
				<div className="flex flex-wrap items-center gap-2">
					<CardTitle>Visitors over time</CardTitle>
					<Delta value={Number(growthPct)} variant="badge">
						<DeltaIcon variant="trend" />
						<DeltaValue />
					</Delta>
				</div>
				<CardDescription>Unique vs returning visitors, last 30 days.</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer className="aspect-auto h-64 w-full md:h-80" config={chartConfig}>
					<AreaChart data={visitorsDaily} accessibilityLayer margin={{ left: 0, right: 8, top: 8 }}>
						<defs>
							<linearGradient id="visitors-grad" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="var(--color-visitors)" stopOpacity={0.45} />
								<stop offset="100%" stopColor="var(--color-visitors)" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="returning-grad" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="var(--color-returning)" stopOpacity={0.35} />
								<stop offset="100%" stopColor="var(--color-returning)" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} strokeDasharray="3 3" />
						<XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={8} />
						<YAxis axisLine={false} tickLine={false} width={40} tickFormatter={(v) => `${v}`} />
						<ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} />
						<Area
							dataKey="returning"
							type="monotone"
							stroke="var(--color-returning)"
							strokeWidth={2}
							fill="url(#returning-grad)"
						/>
						<Area
							dataKey="visitors"
							type="monotone"
							stroke="var(--color-visitors)"
							strokeWidth={2}
							fill="url(#visitors-grad)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</DashboardCard>
	);
}
