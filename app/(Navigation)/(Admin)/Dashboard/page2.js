"use client";
import React from "react";
import Link from "next/link";
import { Header } from "../UI/Header.jsx";
import { Footer } from "../UI/Footer.jsx";
import { HeroSection } from "../UI/HeroSection.jsx";
import {
	Landmark,
	CalendarDays,
	Users,
	Image,
	Handshake,
	FolderCog,
} from "lucide-react";

const stats = [
	{ label: "Annual Donations", value: "$ 9999.99" },
	{ label: "Active Members", value: "250" },
];

const managerTiles = [
	{ label: "Donation Manager", Icon: Landmark, href: "/DonationsManager" },
	{ label: "Event Manager", Icon: CalendarDays, href: "/EventsManager" },
	{ label: "Member/Guest\nManager", Icon: Users, href: "/MembersManager" },
	{ label: "Gallery Manager", Icon: Image, href: "/GalleryManager" },
	{ label: "Sponsor Manager", Icon: Handshake, href: "/SponsorsManager" },
	{ label: "Reports", Icon: FolderCog, href: "/Reports" },
];

function StatCard({ label, value }) {
	return (
		<div
			style={{
				flex: 1,
				minWidth: 240,
				maxWidth: 320,
				border: "2px solid #556B2F",
				borderRadius: 16,
				padding: "32px 48px",
				backgroundColor: "white",
				boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 10,
			}}
		>
			<span
				style={{
					fontFamily: "Georgia, serif",
					fontSize: 22,
					fontWeight: 700,
					textDecoration: "underline",
					textUnderlineOffset: 4,
					color: "#1a1a1a",
				}}
			>
				{label}
			</span>
			<span
				style={{
					fontFamily: "Georgia, serif",
					fontSize: 40,
					fontWeight: 700,
					color: "#1a1a1a",
					marginTop: 8,
				}}
			>
				{value}
			</span>
		</div>
	);
}

function ManagerTile({ label, Icon, href }) {
	const [hovered, setHovered] = React.useState(false);
	if (href) {
		return (
			<Link
				href={href}
				className="flex flex-col items-center gap-16 text-decoration-none"
				style={{ textDecoration: "none" }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<div
					style={{
						width: 160,
						height: 160,
						border: "3px solid #556B2F",
						borderRadius: 24,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: hovered ? "#556B2F" : "white",
						boxShadow: hovered
							? "0 12px 32px rgba(85,107,47,0.18)"
							: "0 4px 16px rgba(0,0,0,0.10)",
						transition: "all 0.2s ease",
						cursor: "pointer",
					}}
				>
					<Icon
						size={72}
						strokeWidth={2}
						color={hovered ? "white" : "#556B2F"}
					/>
				</div>
				<span
					style={{
						fontSize: 18,
						fontWeight: 700,
						textAlign: "center",
						color: "#2a2420",
						lineHeight: 1.4,
						whiteSpace: "pre-line",
					}}
				>
					{label}
				</span>
			</Link>
		);
	}
	return (
		<div
			className="flex flex-col items-center gap-16"
			style={{ textDecoration: "none" }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div
				style={{
					width: 160,
					height: 160,
					border: "3px solid #556B2F",
					borderRadius: 24,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: hovered ? "#556B2F" : "white",
					boxShadow: hovered
						? "0 12px 32px rgba(85,107,47,0.18)"
						: "0 4px 16px rgba(0,0,0,0.10)",
					transition: "all 0.2s ease",
					cursor: "pointer",
				}}
			>
				<Icon
					size={72}
					strokeWidth={2}
					color={hovered ? "white" : "#556B2F"}
				/>
			</div>
			<span
				style={{
					fontSize: 18,
					fontWeight: 700,
					textAlign: "center",
					color: "#2a2420",
					lineHeight: 1.4,
					whiteSpace: "pre-line",
				}}
			>
				{label}
			</span>
		</div>
	);
}

export default function AdminDashboard() {
	return (
		<div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
			<main className="flex-1">
				{/* Stats */}
				<div
					style={{
						maxWidth: 900,
						margin: "40px auto 0",
						padding: "0 24px",
					}}
				>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 24,
							justifyContent: "center",
						}}
					>
						{stats.map((s) => (
							<StatCard
								key={s.label}
								label={s.label}
								value={s.value}
							/>
						))}
					</div>
				</div>

				{/* Manager Tiles */}
				<div
					style={{
						maxWidth: 1200,
						margin: "96px auto 64px",
						padding: "0 24px",
					}}
				>
					<div
						style={{
							display: "flex",
							flexWrap: "nowrap",
							gap: 32,
							justifyContent: "center",
							overflowX: "auto",
						}}
					>
						{managerTiles.map((t) => (
							<ManagerTile key={t.label} {...t} />
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
