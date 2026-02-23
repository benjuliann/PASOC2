import * as React from "react";

export function HeroSection({ title, description }) {
  return (
    <section className="relative flex flex-col w-full min-h-[300px] overflow-hidden max-w-[1720px] mx-auto">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/40671902fc11001c38c8e27b20ebb110846d19b4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
        alt="PASOC community gathering"
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,_rgba(132,164,77,1)_0%,_rgba(132,164,77,1)_10%,_rgba(132,164,77,0)_100%)] z-0"></div>
      <div className="relative flex flex-col justify-center items-start p-8 z-10">
        <div className="max-w-[834px]">
          <h1 className="text-[70px] text-white m-0 p-2 font-serif pl-24">{title}</h1>
          <p className="text-[18px] text-white mt-2 pl-24 font-serif max-w-[380px]">{description}</p>
          <div className="flex flex-wrap gap-4 mt-7 max-w-[684px] text-[20px] font-semibold text-black pl-24">
            <button className="flex items-center justify-center py-3 px-8 rounded-full bg-[#f3f4f6] shadow-md cursor-pointer">Become a Member</button>
            <button className="flex items-center justify-center py-3 px-8 rounded-full bg-[#f3f4f6] shadow-md cursor-pointer">Guest Form</button>
          </div>
        </div>
      </div>
    </section>
  );
}
