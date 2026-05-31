import { AnalyticsStats } from "@/components/analytics/analytics-stats";
import { VisitorsChart } from "@/components/analytics/visitors-chart";
import { TrafficSources } from "@/components/analytics/traffic-sources";
import { DeviceBreakdown } from "@/components/analytics/device-breakdown";
import { TopPages } from "@/components/analytics/top-pages";

export function AnalyticsView() {
	return (
		<div className="fade-rise grid grid-cols-1 gap-px bg-border p-px md:grid-cols-2 lg:grid-cols-4">
			<AnalyticsStats />
			<VisitorsChart />
			<TrafficSources />
			<DeviceBreakdown />
			<TopPages />
		</div>
	);
}
