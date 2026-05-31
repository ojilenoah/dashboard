"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const user = {
	name: "Noah Ojile",
	avatar: "/noah.png",
	url: "https://noahojile.com",
};

export function NavUser() {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<a
						href={user.url}
						target="_blank"
						rel="noreferrer noopener"
						aria-label={`Open ${user.name}'s portfolio`}
						className="block rounded-full outline-hidden ring-offset-background transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring"
					/>
				}
			>
				<Avatar className="size-8">
					<AvatarImage src={user.avatar} alt={user.name} />
					<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
				</Avatar>
			</TooltipTrigger>
			<TooltipContent side="bottom" className="px-2 py-1">
				{user.name} — Portfolio
			</TooltipContent>
		</Tooltip>
	);
}
