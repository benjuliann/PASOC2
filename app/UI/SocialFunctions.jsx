import React from "react";

function SocialFunctionItem({ number, description }) {
	return (
		<div className="w-full max-w-244 text-zinc-800">
			<div className="flex items-start gap-4 rounded-xl border-b-[3px] border-zinc-800 px-3 pb-4.5 pt-2">
				<div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-yellow-400">
					<span className="text-base font-medium">{number}</span>
				</div>

				<div className="min-w-50 flex-1 self-center text-lg">
					{description}
				</div>
			</div>
		</div>
	);
}

export default function SocialFunctions() {
	return (
		<section className="mx-auto flex w-full max-w-337.5 flex-col items-start">
			<p className="text-xl text-black">
				Take a glimse of what Pangasinenses here in Calgary have been
				doing, joining forces in reaching out to the less fortunate as
				well as embodied the strong family spirit through these
				functions.
			</p>

			<h3 className="mt-7 ml-2 text-[28px] text-[#556B2F] underline font-serif">
				Our Three Social Functions
			</h3>

			<div className="mt-4 flex w-full max-w-187.5 flex-wrap justify-between gap-4">
				<div className="min-w-70 flex-[1_1_60%] text-xl">
					<SocialFunctionItem
						number="1"
						description="Summer Picnic tentatively scheduled during the first Saturday of Stampede"
					/>

					<div className="mt-12">
						<SocialFunctionItem
							number="2"
							description="Annual Camping normally scheduled on any week-end in August"
						/>
					</div>

					<div className="mt-12">
						<SocialFunctionItem
							number="3"
							description="The Dinner and Dance Christmas Celebration every December"
						/>
					</div>
				</div>
			</div>

			<div className="mx-auto mt-7 w-full max-w-337.5 rounded-lg border-b-[3px] border-black p-3 text-xl text-black">
				<p>
					This is also the portal of of the daring ones. PASOC has
					successfully dared to venture where others have failed to
					tread. This is the organization where leaders are groomed,
					trained, honed and tested. Three past and present Presidents
					of this prestigious organization became President of CAFFA,
					the umbrella group of the many different Filipino
					associations in the city. They are: Albeo Baquiran
					(1996-97), Gregorio Lacuata (2002-03) and Francisco Siapno
					(2004-05). It just proved that PASOC produces quality
					leaders. What&apos;s the secret behind this success? Come and see
					our site, and you will see that it is engraved at an early
					age in the hearts of the youngsters.
				</p>
			</div>
		</section>
	);
}
