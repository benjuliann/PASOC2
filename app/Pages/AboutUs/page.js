

export default function AboutUs() {
    const staticOfficers = [
        {
            name: "FirstName LastName",
            position: "Position",
        }
    ];
    return (
        <main>
            <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <section className="w-full md:w-1/2">
                    <h2 className="text-xl font-semibold text-center">Our Officers</h2>
                    <p className="text-lg text-black">{staticOfficers[0].name} <br /> {staticOfficers[0].position}</p>
                </section>
                <section className="w-full md:w-1/2">
                    <div>
                        <h2 className="text-xl font-semibold text-center">Our Mission</h2>
                        <p className="text-lg text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur efficitur. Sed at felis ac nisl convallis tincidunt. Curabitur a nunc ut enim efficitur bibendum. Nulla facilisi. Donec in ligula a metus efficitur fermentum. Proin sed odio id enim commodo bibendum.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-center">Your PASOC Contacts</h2>
                        <p className="text-lg text-black">PASOC Secretary: <a href="mailto:dgsv0508@yahoo.ca">dgsv0508@yahoo.ca</a></p>
                        <h3>Contact Persons:</h3>
                        <ul className="list-disc list-inside">
                            <li>
                                
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
}