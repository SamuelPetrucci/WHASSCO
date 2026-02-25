"use client";

import BoardMemberCard from "@/components/BoardMemberCard";

const BOARD_MEMBERS = [
  {
    name: "Kaleea Alston-Griffin",
    title: "President",
    bio: "Kaleea leads WHAASCO with a focus on family engagement and community partnerships. She is committed to creating inclusive spaces where youth and families can thrive and connect with African American heritage and culture.",
  },
  {
    name: "Portia Wise Bachman",
    title: "Vice President",
    bio: "Portia brings experience in education and community organizing to her role. She works to strengthen WHAASCO's programs and support the next generation of leaders in West Hartford and beyond.",
  },
  {
    name: "Bjorn Burke",
    title: "Treasurer",
    bio: "Bjorn oversees the organization's finances and helps ensure resources go directly to programs that support families and youth. He is dedicated to transparency and sustainable growth for WHAASCO.",
  },
  {
    name: "Gayle Hooker",
    title: "Recording Secretary",
    bio: "Gayle keeps our meetings and records organized and helps the board communicate clearly with members and the community. Her attention to detail supports WHAASCO's day-to-day operations.",
  },
  {
    name: "Karen Anderson",
    title: "Corresponding Secretary",
    bio: "Karen manages outreach and correspondence, connecting WHAASCO with families, partners, and the wider community. She helps share our mission and keep everyone informed and engaged.",
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
            The leaders who guide WHAASCO. Tap a card to flip and read their full bio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {BOARD_MEMBERS.map((member) => (
              <BoardMemberCard
                key={member.name}
                name={member.name}
                title={member.title}
                bio={member.bio}
                bioExcerptLength={140}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
