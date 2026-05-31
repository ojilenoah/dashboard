"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const subscribe = () => () => {};
const useIsMounted = () =>
	useSyncExternalStore(
		subscribe,
		() => true,
		() => false
	);

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const mounted = useIsMounted();
	const isDark = mounted && resolvedTheme === "dark";

	const toggle = () => {
		const next = isDark ? "light" : "dark";
		const doc = document as Document & {
			startViewTransition?: (cb: () => void) => { ready: Promise<void> };
		};
		if (typeof doc.startViewTransition === "function") {
			doc.startViewTransition(() => setTheme(next));
		} else {
			setTheme(next);
		}
	};

	return (
		<Button
			aria-label="Toggle theme"
			size="icon-sm"
			variant="outline"
			onClick={toggle}
			className="relative overflow-hidden transition-all duration-200 hover:scale-105"
		>
			<SunIcon
				className={`absolute size-4 transition-all duration-300 ${
					isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
				}`}
			/>
			<MoonIcon
				className={`absolute size-4 transition-all duration-300 ${
					isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
				}`}
			/>
		</Button>
	);
}
