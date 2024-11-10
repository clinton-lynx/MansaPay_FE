// import Image from 'next/image';

const teamMembers = [
  { 
    name: "Jane Doe", 
    role: "CEO & Founder", 
    bio: "Jane brings over 10 years of experience in fintech and AI, leading teams with a focus on innovation and growth.", 
    imageUrl: "/images/jane.jpg"
  },
  {
    name: "John Smith",
    role: "CTO",
    bio: "John is an AI specialist with a background in blockchain technology and secure transactions.",
    imageUrl: "/images/john.jpg"
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
                height={150} 
                className="rounded-full mx-auto"
              />
              <h3 className="text-xl text-[#0069ff] font-semibold mt-4">{member.name}</h3>
              <p className="text-sm text-[#0069ff] ">{member.role}</p>
              <p className="mt-4 text-[#0069ff] ">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
