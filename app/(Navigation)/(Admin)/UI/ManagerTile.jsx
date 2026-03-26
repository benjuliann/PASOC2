"use client";
import React from "react";
import Link from "next/link";
import { Landmark, CalendarDays, Users, Image, Handshake, FolderCog, FileText, UserPlus, Receipt } from "lucide-react";

const iconMap = { Landmark, CalendarDays, Users, Image, Handshake, FolderCog, FileText, UserPlus, Receipt };

export function ManagerTile({ label, icon, href, variant = "large" }) {
	const Icon = iconMap[icon];

	if (variant === "compact") {
		return (
			<Link
				href={href}
				className="flex flex-col items-center justify-center gap-3 h-32 sm:h-36 bg-white border-2 border-[#556B2F] rounded-2xl text-center text-[#556B2F] font-semibold text-sm sm:text-base shadow-sm hover:bg-[#556B2F] hover:text-white transition-all duration-200 group"
			>
				{Icon && <Icon size={28} strokeWidth={1.8} />}
				<span className="leading-snug px-3">{label}</span>
			</Link>
		);
	}

	return (
		<Link href={href} className="flex flex-col items-center gap-3 text-center no-underline group w-full">
			<div className="w-full aspect-square border-2 border-[#556B2F] rounded-3xl flex items-center justify-center bg-white shadow-sm group-hover:bg-[#556B2F] transition-all duration-200">
				{Icon && <Icon size={40} strokeWidth={1.8} className="text-[#556B2F] group-hover:text-white transition-colors duration-200" />}
			</div>
			<span className="text-sm font-bold text-[#2a2420] leading-snug">
				{label}
			</span>
		</Link>
	);
}