import React from "react";
import { Building2 } from "lucide-react";

export function SponsorSection() {
	return (
		<section className="mt-8 w-full max-w-337.5 self-center rounded-3xl bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] box-border">
			<div className="flex flex-wrap">
				{/* Left Column */}
				<div className="flex-[0_0_18%] min-w-40">
					<div className="flex flex-col items-start">
						<h4 className="m-0 text-[20px] text-black!">
							Sponsor AD
						</h4>

						<div className="mt-2 flex h-35 w-35 items-center justify-center rounded-3xl border-[5px] border-[#84A44D] p-3 box-border">
							<Building2 size={80} className="text-[#84A44D]" />
						</div>

						<p className="mt-3 text-[18px] tracking-[2px] text-black">
							Photo or Logo
						</p>
					</div>
				</div>

				{/* Right Column */}
				<div className="flex-[1_1_70%] min-w-65">
					<div className="flex items-start gap-4">
						<h4 className="m-0 text-[32px] text-black! underline">
							Sponsor Name
						</h4>

						<p className="mt-3 text-[20px] text-black">
							Event Sponsored
						</p>
					</div>

					<div className="mt-6 flex flex-col bg-[rgba(250,204,21,0.8)] p-4 pb-16 text-[20px]">
						<p className="m-0 text-black">About Sponsor</p>
					</div>
				</div>
			</div>
		</section>
	);
}
