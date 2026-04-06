"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function UpcomingEventsSection() {
	const router = useRouter();
	const [events, setEvents] = useState([]);
	const [isLoadingEvents, setIsLoadingEvents] = useState(true);
	const [eventsError, setEventsError] = useState("");

	useEffect(() => {
		let isMounted = true;

		const loadEvents = async () => {
			try {
				setIsLoadingEvents(true);
				setEventsError("");

				const response = await fetch("/api/Database/events", {
					cache: "no-store",
				});
				const payload = await response.json();

				if (!response.ok) {
					throw new Error(payload.error || "Failed to load events");
				}

				if (isMounted) {
					setEvents(Array.isArray(payload.data) ? payload.data : []);
				}
			} catch (error) {
				if (isMounted) {
					setEventsError(
						error.message || "Failed to load upcoming events",
					);
				}
			} finally {
				if (isMounted) {
					setIsLoadingEvents(false);
				}
			}
		};

		loadEvents();

		return () => {
			isMounted = false;
		};
	}, []);

	const upcomingEvents = useMemo(() => {
		const now = new Date();

		return [...events]
			.map((event) => {
				const start = new Date(event?.startDatetime);

				return {
					title: event?.title || "Untitled event",
					datetime: start,
					date: start.toLocaleDateString(),
					time: start.toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
					}),
				};
			})
			.filter(
				(event) =>
					!Number.isNaN(event.datetime.getTime()) &&
					event.datetime > now,
			)
			.sort((left, right) => left.datetime - right.datetime)
			.slice(0, 3);
	}, [events]);

	return (
		<section className="bg-primary-50 py-24 px-6 text-neutral-900">
			<div className="max-w-6xl mx-auto flex flex-col gap-12">
				<h2 className="text-3xl font-bold text-neutral-900">
					Upcoming Events
				</h2>

				{isLoadingEvents && (
					<p className="text-neutral-700">
						Loading upcoming events...
					</p>
				)}

				{!isLoadingEvents && eventsError && (
					<p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
						{eventsError}
					</p>
				)}

				{!isLoadingEvents &&
					!eventsError &&
					upcomingEvents.length === 0 && (
						<p className="text-neutral-700">
							No upcoming events right now.
						</p>
					)}

				{!isLoadingEvents &&
					!eventsError &&
					upcomingEvents.length > 0 && (
						<div className="flex flex-col gap-6">
							{upcomingEvents.map((event, index) => (
								<div
									key={`${event.title}-${event.datetime.toISOString()}-${index}`}
									className="flex justify-between items-center bg-neutral-100 px-8 py-6 rounded-xl"
								>
									<span className="text-lg font-medium text-neutral-900">
										{event.title}
									</span>
									<span className="text-primary-600 font-semibold">
										{event.date} at {event.time}
									</span>
								</div>
							))}
						</div>
					)}

				<div>
					<button
						type="button"
						onClick={() => router.push("/Events")}
						className="text-primary-700 font-semibold hover:underline"
					>
						View more events →
					</button>
				</div>
			</div>
		</section>
	);
}
