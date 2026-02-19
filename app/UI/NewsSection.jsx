import * as React from "react";

export function NewsSection() {
	return (
		<section className="mt-8 w-full max-w-337.5 self-center rounded-3xl bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] box-border">
			<div className="mb-4 flex max-w-83.25 items-center justify-between gap-4 rounded-3xl bg-[#facc15] px-4 py-2 text-[20px] font-bold text-black">
				<h3 className="m-0 text-center">Recent News</h3>
				<div aria-hidden="true">&lt; &gt;</div>
			</div>

			<article className="w-full rounded-3xl border-b-4 border-black px-4 pb-11 pt-6">
				<div className="flex flex-wrap gap-4">
					<div className="min-w-65 flex-3">
						<h4 className="m-0 font-['Instrument_Serif',serif] text-[28px] text-[#556B2F] underline">
							2013 - 2014 PRESIDENT&apos;S PROFILE
						</h4>

						<p className="mt-3 text-[18px] leading-normal text-black">
							A versatile community leader par excellence and has
							been serving the Filipino-Canadian community for
							over 25 years. He is currently working as a Power
							Engineer in Calgary, AB. Prior to his sojourn to
							Canada, he worked for Meralco Industrial Engineering
							Services Corporation as a mechanical engineer.He is
							a naturalized Canadian citizen having been born in
							Manaoag, Pangasinan, Philippines. He migrated to
							Canada in 1982. The ex-seminarian was at the Mary
							Help of Christians Seminary in the Philippines. He
							obtained his Bachelor&apos;s Degree in Mechanical
							Engineering also in the Philippines.
							<br />
							The outstanding, dynamic professional engineer
							turned community leader is, a mentor and a role
							model, serving the community at-large in Calgary
							area. His passion to serve people actually started
							since his grade school years. His father, the late
							Judge Jovencio Mejia Bautista impacted his life when
							he became a government official of his hometown. His
							mother, Marietta Sta. Maria Tiong inspired his
							aspirations with her support to the late Judge with
							love and devotion to public service.
						</p>
					</div>

					<div className="flex min-w-50 flex-1 items-start justify-center">
						<img
							src="https://api.builder.io/api/v1/image/assets/TEMP/3f46141b4606b537fc399765054ec99aac08a77f?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
							alt="President profile photo"
							className="mt-5 h-auto w-full max-w-58.75 object-contain"
						/>
					</div>
				</div>
			</article>
		</section>
	);
}
