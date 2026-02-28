"use client";

import BoardMemberCard from "@/components/BoardMemberCard";

const BOARD_MEMBERS = [
  {
    name: "Kaleea Alston-Griffin",
    title: "President",
  },
  {
    name: "Portia Wise Bachman",
    title: "Vice President",
  },
  {
    name: "Bjorn Burke",
    title: "Treasurer",
  },
  {
    name: "Gayle Hooker",
    title: "Recording Secretary",
  },
  {
    name: "Karen Anderson",
    title: "Corresponding Secretary",
  },
];

export default function BoardPage() {
  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Our Board
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
            The leaders who guide WHAASCO.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {BOARD_MEMBERS.map((member) => (
              <BoardMemberCard
                key={member.name}
                name={member.name}
                title={member.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
