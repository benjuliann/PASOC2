"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";

function formatDisplayDate(value) {
	if (!value) {
		return "No publish date";
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return String(value);
	}

	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "America/Edmonton",
	}).format(date);
}

function sortBulletins(items) {
	return [...items].sort((left, right) => {
		const leftDate = new Date(
			left.publishDate || left.createdAt || left.updatedAt || 0,
		).getTime();
		const rightDate = new Date(
			right.publishDate || right.createdAt || right.updatedAt || 0,
		).getTime();

		if (rightDate !== leftDate) {
			return rightDate - leftDate;
		}

		return Number(right.bulletinId || 0) - Number(left.bulletinId || 0);
	});
}

export default function Bulletin() {
	const [bulletins, setBulletins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const loadBulletins = async () => {
			try {
				setIsLoading(true);
				setErrorMessage("");
				const response = await fetch("/api/Database/bulletins", {
					cache: "no-store",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Failed to load bulletins");
				}

				const rows = Array.isArray(data) ? data : [];
				setBulletins(rows);
			} catch (error) {
				setErrorMessage(error.message || "Failed to load bulletins");
			} finally {
				setIsLoading(false);
			}
		};

		loadBulletins();
	}, []);

	const publishedBulletins = useMemo(
		() => sortBulletins(bulletins.filter((item) => item.isPublished)),
		[bulletins],
	);

	return (
		<main>
			{/* HERO */}
			<HeroSection
				title="Bulletins"
				description="Stay informed with the latest PASOC announcements and community updates."
			/>
			{/* BULLETIN */}
			<section className="bg-neutral-100 py-24 px-6">
				<div className="max-w-4xl mx-auto flex flex-col gap-6">
					{isLoading && (
						<p className="text-neutral-700 leading-relaxed text-lg">
							Loading bulletins...
						</p>
					)}

					{!isLoading && errorMessage && (
						<p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
							{errorMessage}
						</p>
					)}

					{!isLoading &&
						!errorMessage &&
						publishedBulletins.length === 0 && (
							<p className="text-neutral-700 leading-relaxed text-lg">
								No bulletins have been published yet.
							</p>
						)}

					{!isLoading &&
						!errorMessage &&
						publishedBulletins.map((bulletin) => {
							const publishAnchorTime = bulletin.publishDate
								? new Date(bulletin.publishDate).getTime()
								: bulletin.createdAt
									? new Date(bulletin.createdAt).getTime()
									: NaN;
							const updatedAtTime = bulletin.updatedAt
								? new Date(bulletin.updatedAt).getTime()
								: NaN;
							const showUpdatedAt =
								Number.isFinite(publishAnchorTime) &&
								Number.isFinite(updatedAtTime) &&
								updatedAtTime - publishAnchorTime > 1000;

							return (
								<article
									key={bulletin.bulletinId}
									className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
								>
									<div className="flex flex-col gap-4 p-6 md:p-8">
										<h2 className="text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
											{bulletin.title}
										</h2>
										<p className="whitespace-pre-line text-neutral-700 leading-relaxed text-lg">
											{bulletin.body}
										</p>
										<div className="self-end pt-2 space-y-1 text-right text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">
											<p>
												Published at{" "}
												{formatDisplayDate(
													bulletin.publishDate,
												)}
											</p>
											{showUpdatedAt && (
												<p>
													Updated at{" "}
													{formatDisplayDate(
														bulletin.updatedAt,
													)}
												</p>
											)}
										</div>
									</div>
								</article>
							);
						})}
				</div>
			</section>
		</main>
	);
}
