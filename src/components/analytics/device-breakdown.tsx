"use client";

import { Cell, Pie, PieChart } from "recharts";
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
import { DashboardCard } from "@/components/dashboard-card";

const devices = [
	{ name: "Desktop", value: 58, fill: "var(--chart-1)" },
	{ name: "Mobile", value: 34, fill: "var(--chart-3)" },
	{ name: "Tablet", value: 8, fill: "var(--chart-5)" },
];

const chartConfig = {
	value: { label: "Share" },
	Desktop: { label: "Desktop", color: "var(--chart-1)" },
	Mobile: { label: "Mobile", color: "var(--chart-3)" },
	Tablet: { label: "Tablet", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function DeviceBreakdown() {
	return (
		<DashboardCard>
			<CardHeader>
				<CardTitle>Device breakdown</CardTitle>
				<CardDescription>Sessions by device type.</CardDescription>
			</CardHeader>
			<CardContent className="flex items-center gap-4">
				<ChartContainer className="aspect-square h-40 w-40" config={chartConfig}>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={devices}
							dataKey="value"
							nameKey="name"
							innerRadius={45}
							outerRadius={70}
							strokeWidth={2}
						>
							{devices.map((d) => (
								<Cell key={d.name} fill={d.fill} />
							))}
						</Pie>
					</PieChart>
				</ChartContainer>
				<div className="flex flex-1 flex-col gap-2 text-sm">
					{devices.map((d) => (
						<div key={d.name} className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-2">
								<span
									aria-hidden
									className="size-2.5 rounded-full"
									style={{ background: d.fill }}
								/>
								<span className="text-foreground">{d.name}</span>
							</div>
							<span className="tabular-nums text-muted-foreground">{d.value}%</span>
						</div>
					))}
				</div>
			</CardContent>
		</DashboardCard>
	);
}
