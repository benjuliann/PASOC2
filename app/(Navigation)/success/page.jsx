export default async function Success({ searchParams }) {
  const { type } = await searchParams;

  return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center">
      <h1 className="font-serif text-3xl text-[#556B2F] mb-4">
        {type === "donation" ? "Thank you for your donation!" : "Registration complete!"}
      </h1>
      <p className="text-neutral-600 text-sm">
        {type === "donation"
          ? "Your generous support means a lot to the Pangasinan community in Calgary."
          : "Welcome to PASOC! We look forward to having you as part of our community."}
      </p>
    </main>
  );
}