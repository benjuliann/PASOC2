import React from "react";
import {
  Landmark, CalendarDays, Users, Image as LucideImage, Handshake, FolderCog
} from "lucide-react";

const managers = [
  { label: "Donation Manager", Icon: Landmark },
  { label: "Event Manager", Icon: CalendarDays },
  { label: "Member/Guest Manager", Icon: Users },
  { label: "Gallery Manager", Icon: LucideImage },
  { label: "Sponsor Manager", Icon: Handshake },
  { label: "Reports", Icon: FolderCog },
];

export function DashboardManagers() {
  return (
    <div className="flex justify-center gap-8 flex-wrap max-w-5xl mx-auto">
      {managers.map(({ Icon, label }) => (
        <div
          key={label}
          className="bg-white border-2 border-[#b7c99c] rounded-xl w-[180px] h-[170px] flex flex-col items-center justify-center mb-8 shadow-md hover:bg-[#f6f3ef] transition"
        >
          <Icon size={54} strokeWidth={1.5} className="text-[#6b8642] mb-2" />
          <div className="text-lg text-[#222] font-semibold text-center">{label}</div>
        </div>
      ))}
    </div>
  );
}
