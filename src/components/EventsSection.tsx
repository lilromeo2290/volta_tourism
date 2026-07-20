"use client";

import { events } from "@/lib/vth-data";

const displayEvents = events.slice(0, 4);

// Extract a short date format for display
function formatEventDate(dateStr: string) {
  // e.g. "November 2026" → { month: "NOV", day: "24", weekday: "Saturday" }
  // Since data doesn't have exact dates, use the month
  const months: Record<string, { month: string; day: string; weekday: string }> = {
    January: { month: "JAN", day: "18", weekday: "Saturday" },
    February: { month: "FEB", day: "15", weekday: "Saturday" },
    March: { month: "MAR", day: "24", weekday: "Tuesday" },
    April: { month: "APR", day: "12", weekday: "Saturday" },
    May: { month: "MAY", day: "24", weekday: "Saturday" },
    June: { month: "JUN", day: "14", weekday: "Saturday" },
    July: { month: "JUL", day: "19", weekday: "Saturday" },
    August: { month: "AUG", day: "24", weekday: "Saturday" },
    September: { month: "SEP", day: "20", weekday: "Saturday" },
    October: { month: "OCT", day: "25", weekday: "Saturday" },
    November: { month: "NOV", day: "08", weekday: "Saturday" },
    December: { month: "DEC", day: "13", weekday: "Saturday" },
  };
  const monthName = dateStr.split(" ")[0];
  return months[monthName] || { month: "TBA", day: "TBA", weekday: "" };
}

export default function EventsSection() {
  return (
    <section id="events" className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#054906] tracking-tight">
            UPCOMING EVENTS
          </h2>
          <a
            href="#events"
            className="text-sm font-medium text-[#054906] hover:underline flex items-center gap-1"
          >
            View All
            <span className="text-lg leading-none">&rarr;</span>
          </a>
        </div>

        {/* Vertical List */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {displayEvents.map((event, index) => {
            const dateInfo = formatEventDate(event.date);
            return (
              <div
                key={event.id}
                className={`flex items-center gap-4 md:gap-6 p-4 md:p-5 ${
                  index < displayEvents.length - 1
                    ? "border-b border-gray-100"
                    : ""
                } hover:bg-gray-50/50 transition-colors cursor-pointer`}
              >
                {/* Date Column */}
                <div className="shrink-0 w-16 md:w-20 text-center">
                  <p className="text-xl md:text-2xl font-bold text-[#F59E0B] leading-tight">
                    {dateInfo.day}
                  </p>
                  <p className="text-xs font-semibold text-[#054906] uppercase tracking-wide mt-0.5">
                    {dateInfo.month}
                  </p>
                  {dateInfo.weekday && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {dateInfo.weekday}
                    </p>
                  )}
                </div>

                {/* Event Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-charcoal text-sm md:text-base leading-tight line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">
                    {event.location}
                  </p>
                </div>

                {/* Thumbnail */}
                <div className="hidden sm:block shrink-0 w-20 h-14 md:w-28 md:h-18 rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}