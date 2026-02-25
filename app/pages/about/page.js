import { HeroSection } from "@/app/UI/HeroSection";

export default function AboutUs() {
    /*
        * For now, the officers and contacts are hardcoded. In the future, we can fetch this data from a database or an API.
    */
    const staticOfficers = Array.from({ length: 12 }, () => ({
        name: "FirstName LastName",
        position: "Position",
    }));
    const staticContacts = [
        {
            name: "FirstName LastName",
            position: "Position",
            email: "firstname.lastname@pasc.org"
        }
    ];
    return (
        <main>
            {/* HERO */}
            <HeroSection
                title="About PASOC"
                description=" "
            />
            <section className="flex flex-col md:flex-row gap-8 px-6 py-12 max-w-8xl mx-auto">
                <div className="md:w-1/2 mx-auto">
                    <h2 className="text-xl font-semibold text-center underline text-black">Who We Are</h2>
                    <p className="text-lg text-black">
                        The Pangasinan Society of Calgary (PASOC) was established in 1988 to bring together Pangasinenses and friends in Calgary. It was founded by Leopoldo “Pol” Mendoza and a group of dedicated community members, and officially registered under Alberta’s Societies Act on October 6, 1988.
                        <br />Since its founding, PASOC has grown from a small group of 30 members to over 600 members today. Membership is open to everyone — Pangasinenses, other Filipinos, and non-Filipinos alike.
                    </p>
                </div>
            </section>
            <section className="bg-neutral-100 w-full gap-6 mx-auto justify-between mt-12 px-6 py-12">
                <h2 className="text-xl font-semibold underline text-black text-center">PASOC Officers</h2>
                <div className="w-full mx-auto flex flex-col gap-6 grid md:grid-cols-3 pt-10">
                    {staticOfficers.map((officer, index) => (
                            <div
                                key={index}
                                className="text-lg text-black flex items-center gap-4 justify-center"
                            >
                                <div className="w-[100px] h-[100px] rounded-2xl bg-gray-300 shadow-[0_20px_50px_rgba(0,0,0,0.08)]" />
                                <div>
                                    {officer.name}
                                    <br />
                                    {officer.position}
                                </div>
                            </div>
                        ))}
                </div>
            </section>
            <section className="w-full flex flex-row gap-6 max-w-7xl mx-auto justify-between mt-12">
                <div className="w-full md:w-1/2 mx-auto">
                    <h2 className="text-xl font-semibold text-center underline text-black">Your PASOC Contacts</h2>
                    <p className="text-lg text-black">PASOC Secretary: <a href="mailto:dgsv0508@yahoo.ca">dgsv0508@yahoo.ca</a></p>
                        <h3>Contact Persons:</h3>
                        <ul className="list-disc list-inside">
                            <li className="text-black">
                                {staticContacts[0].name} <br /> {staticContacts[0].position} <br /> <a href={`mailto:${staticContacts[0].email}`}>{staticContacts[0].email}</a>
                            </li>
                            <li className="text-black">
                                {staticContacts[0].name} <br /> {staticContacts[0].position} <br /> <a href={`mailto:${staticContacts[0].email}`}>{staticContacts[0].email}</a>
                            </li>
                        </ul>
                </div>
            </section>
        </main>
    );
}