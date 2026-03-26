import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";

async function getOfficers() {
    try {

        const baseURL =
            process.env.NEXT_PUBLIC_BASE_URL ||
            "http://localhost:3000";

        const res = await fetch(
            `${baseURL}/api/Database/About`,
            {
                cache:"no-store"
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch officers");
        }

        const data = await res.json();

        return data.data || [];

    } catch (error) {

        console.error("Officer fetch error:", error);

        return [];

    }
}

export default async function AboutUs() {

    const officers = await getOfficers();

    const staticContacts = [
        {
            name: "FirstName LastName",
            position: "Position",
            email: "firstname.lastname@pasc.org"
        }
    ];

    return (
        <main>
            <HeroSection
                title="About PASOC"
                description=" "
            />

            <section className="flex flex-col md:flex-row gap-8 px-6 py-12 max-w-8xl mx-auto">
                <div className="md:w-1/2 mx-auto">
                    <h2 className="text-xl font-semibold text-center underline text-black">
                        Who We Are
                    </h2>

                    <p className="text-lg text-black">
                        The Pangasinan Society of Calgary (PASOC) was established in 1988 to bring together Pangasinenses and friends in Calgary. It was founded by Leopoldo “Pol” Mendoza and a group of dedicated community members, and officially registered under Alberta’s Societies Act on October 6, 1988.
                        <br />Since its founding, PASOC has grown from a small group of 30 members to over 600 members today. Membership is open to everyone — Pangasinenses, other Filipinos, and non-Filipinos alike. 
                    </p>
                </div>
            </section>

            {/* OFFICERS */}
            <section className="bg-neutral-100 w-full gap-6 mx-auto justify-between mt-12 px-6 py-12">
                <h2 className="text-xl font-semibold underline text-black text-center">
                    PASOC Officers
                </h2>

                <div className="w-full mx-auto grid md:grid-cols-3 gap-6 pt-10">

                    {officers.map((officer) => (
                        <div
                            key={officer.officerId}
                            className="text-lg text-black grid grid-cols-[100px_1fr] items-center gap-4 justify-center"
                        >
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 shadow-[0_20px_50px_rgba(0,0,0,0.08)]" />

                            <div>
                                {officer.name}
                                <br />
                                {officer.occupation}
                            </div>
                        </div>
                    ))}

                </div>

            </section>
        </main>
    );
}