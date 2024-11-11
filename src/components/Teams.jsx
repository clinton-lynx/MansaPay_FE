// import Image from 'next/image';

const teamMembers = [
  { 
    name: "Adeoti Clinton [Lynx]", 
    role: "Software Engineer [Frontend]", 
    bio:   "Leading the MansaPay project with a vision for community impact, Clinton also built the frontend interface and manages product strategy, team coordination, and pitch materials.", 
    imageUrl: "/clinton.jpeg"
  },
  {
    name: "Olayori Latubosun",
    role: "Backend Developer & Payment Integration Specialist",
    bio: "Focused on implementing secure payment flows and handling server-side logic. Responsible for API integration and ensuring the backend supports seamless transactions.",
    imageUrl: "/yori.jpeg"
  },
];

export default function TeamSection() {
  return (
    <section id="teams"  className="bg-[#0069ff] py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-white mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-2 md:justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
              <img 
              
                src={member.imageUrl} 
                alt={`${member.name} profile picture`} 
                width={150} 
                height={70} 
                className="rounded-full mx-auto"
              />
              <h3 className="text-xl text-[#000] font-semibold mt-4">{member.name}</h3>
              <p className="text-sm text-[#0069ff] ">{member.role}</p>
              <p className="mt-4 text-[#000] ">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
