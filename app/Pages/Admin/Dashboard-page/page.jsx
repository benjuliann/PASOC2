

import { DashboardStats } from "../../../UI/DashboardStats";
import { DashboardManagers } from "../../../UI/DashboardManagers";
import { AdminHeader } from "../../../UI/AdminHeader";

// This disables the global Header/Footer for this page
export const noLayout = true;

export default function DashboardPage() {
  return (
    <>
      <AdminHeader />
      <main className="bg-[#f6f3ef] min-h-screen">
        {/* Banner Section */}
        <section className="relative h-[160px] flex items-center pl-[60px] mb-0 overflow-hidden" style={{ background: '#6b8642' }}>
          {/* Background image */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/40671902fc11001c38c8e27b20ebb110846d19b4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
            alt="PASOC community gathering"
            className="object-cover absolute inset-0 w-full h-full z-0"
            style={{ opacity: 0.55 }}
          />
          {/* Exact green gradient overlay */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{
            background: 'linear-gradient(90deg, #6b8642 0%, #b7c99c 100%)',
            opacity: 0.82
          }} />
          {/* Text content above image and gradient */}
          <div className="relative z-20">
            <h1 className="text-white text-5xl font-bold drop-shadow-lg font-serif">PASOC Dashboard</h1>
            <div className="text-[#f6f3ef] text-lg mt-2">What would you like to do today?</div>
          </div>
        </section>

        {/* Stats Section */}
        <DashboardStats />

        {/* Manager Icons Section */}
        <DashboardManagers />
      </main>
    </>
  );
}
