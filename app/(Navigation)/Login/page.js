import Link from "next/link";

export default function RoleSelectorPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#F4EFE7] " />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-lg mx-6">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Pangasinan Society of Calgary
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Please select your access portal
            </p>
          </div>

          {/* Role Cards */}
          <div className="space-y-4">

            <Link
              href="/Login/Member"
              className="block p-5 rounded-2xl border border-gray-200 
                         hover:border-emerald-600 hover:bg-emerald-50
                         transition duration-200 group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Member Portal
                  </h2>
                  <p className="text-sm text-gray-500">
                    Access events, resources, and updates
                  </p>
                </div>
                <span className="text-emerald-600 group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </Link>

            <Link
              href="/Login/Admin"
              className="block p-5 rounded-2xl border border-gray-200 
                         hover:border-blue-600 hover:bg-blue-50
                         transition duration-200 group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Admin Portal
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage members, content, and operations
                  </p>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </Link>

            <Link
              href="/login/sponsor"
              className="block p-5 rounded-2xl border border-gray-200 
                         hover:border-amber-600 hover:bg-amber-50
                         transition duration-200 group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Sponsor Portal
                  </h2>
                  <p className="text-sm text-gray-500">
                    View partnership opportunities and reports
                  </p>
                </div>
                <span className="text-amber-600 group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </Link>

          </div>

          {/* Footer Help */}
          <div className="mt-8 text-center text-xs text-gray-500">
            Need assistance? Contact support@yourorganization.org
          </div>

        </div>
      </div>
    </div>
  );
}