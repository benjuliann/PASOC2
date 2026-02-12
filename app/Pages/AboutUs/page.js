

export default function AboutUs() {
    const staticOfficers = [
        {
            name: "FirstName LastName",
            position: "Position",
        }
    ];
    const staticContacts = [
        {
            name: "FirstName LastName",
            position: "Position",
            email: "firstname.lastname@pasc.org"
        }
    ];
    return (
        <main>
            <h1 className="text-3xl font-bold text-center my-8 underline">About Us</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <section className="w-full md:w-1/2">
                    <h2 className="text-xl font-semibold text-center underline">Our Officers</h2>
                    <p className="text-lg text-black">{staticOfficers[0].name} <br /> {staticOfficers[0].position}</p>
                </section>
                <section className="w-full md:w-1/2 flex flex-col gap-6">
                    <div>
                        <h2 className="text-xl font-semibold text-center underline">Our Mission</h2>
                        <p className="text-lg text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur efficitur. Sed at felis ac nisl convallis tincidunt. Curabitur a nunc ut enim efficitur bibendum. Nulla facilisi. Donec in ligula a metus efficitur fermentum. Proin sed odio id enim commodo bibendum.</p>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-center underline">Your PASOC Contacts</h2>
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
            </div>
        </main>
    );
}