"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

export function FloatingButton() {
	const router = useRouter();
	const pathname = usePathname();

	const adminTopLevelRoutes = new Set(["/Dashboard", "/SponsorManager"]);
	const isAdminPath =
		pathname?.startsWith("/Admin") ||
		adminTopLevelRoutes.has(pathname || "");
	const faqTarget = isAdminPath ? "/Admin/Faqs" : "/Faqs";

	return (
		<button
			onClick={() => router.push(faqTarget)}
			className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-[#556B2F] border-4 border-[#84A44D] flex items-center justify-center shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
		>
			<div className="w-6 h-6 rounded-full flex items-center justify-center">
				<span className="text-white text-lg leading-none">?</span>
			</div>
		</button>
	);
}
