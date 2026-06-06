import React from "react";
import TeamIcon from "../assets/Team_icon1.png"
const teamMembers = [
    {
        id: 1,
        name: "Michael Scofield",
        role: "Co-Founder & CEO",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&sat=-100", // Man
    },
    {
        id: 2,
        name: "Olivia Stone",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&sat=-100", // Woman
    },
    {
        id: 3,
        name: "Daniel Carter",
        role: "UI/UX Lead",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&sat=-100", // Man
    },
    {
        id: 4,
        name: "Sophia Lee",
        role: "Marketing Lead",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&sat=-100", // Woman
    },
    {
        id: 5,
        name: "James Walker",
        role: "Frontend Developer",
        image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&h=400&sat=-100", // Man
    },
    {
        id: 6,
        name: "Emily Watson",
        role: "Project Manager",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&sat=-100", // Woman
    },
    {
        id: 7,
        name: "Liam Brooks",
        role: "Backend Engineer",
        image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=400&h=400&sat=-100", // Man
    },
    {
        id: 8,
        name: "Ava Mitchell",
        role: "Brand Strategist",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&h=400&sat=-100", // Woman
    },
    {
        id: 9,
        name: "Noah Smith",
        role: "Motion Designer",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&h=400&sat=-100", // Man
    },
];

const TeamCard = ({ member }) => {
    return (
        <div className="group relative min-w-[400px] h-[200px] rounded-full border border-white/80 bg-white/5 backdrop-blur-md flex items-center px-4 overflow-hidden ">

            {/* Image */}
            <div className="w-[160px] h-[160px] rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                <img
                    src={`${member.image}?grayscale`}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            {/* Info */}
            <div className="ml-4 text-white">
                <h3 className="text-lg font-semibold whitespace-nowrap">
                    {member.name}
                </h3>

                <p className="text-sm text-neutral-400">
                    {member.role}
                </p>
            </div>
        </div>
    );
};

const Team = () => {
    return (
        <section className="w-full min-h-screen bg-black text-white py-24 overflow-hidden mt-80">

            {/* Heading */}
            <div className="text-center mb-20 px-6">
                <div className="text-4xl mb-4 h-10 flex justify-center items-center rounded-full">
                    <img src={TeamIcon} alt="Team" className="object-contain h-15 w-15" />
                </div>

                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
                    Minds Behind The Innovation
                </h1>

                <p className="text-neutral-400 mt-6 max-w-2xl mx-auto leading-relaxed">
                    A passionate team of creators, thinkers, and builders dedicated
                    to crafting meaningful digital experiences.
                </p>
            </div>

            {/* Row 1 */}
            <div className="relative overflow-hidden mb-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="flex gap-10 w-max animate-scroll">
                    {[...teamMembers, ...teamMembers].map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>

            {/* Row 2 */}
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div className="flex gap-10 w-max animate-scroll-reverse">
                    {[...teamMembers, ...teamMembers].map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;