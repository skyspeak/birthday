import { eventConfig } from "./config";

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

function parseEventDate(): { start: Date; end: Date } {
  // Parse "Saturday, March 14, 2026" and "2:00 PM – 5:00 PM"
  const dateStr = eventConfig.date;
  const timeStr = eventConfig.time;

  // Extract date parts
  const dateMatch = dateStr.match(/(\w+),\s+(\w+)\s+(\d+),\s+(\d+)/);
  if (!dateMatch) {
    // Fallback to a default date
    return {
      start: new Date(2026, 2, 14, 14, 0),
      end: new Date(2026, 2, 14, 17, 0),
    };
  }

  const [, , monthName, day, year] = dateMatch;
  const monthMap: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const month = monthMap[monthName] || 0;

  // Parse time range
  const timeMatch = timeStr.match(/(\d+):(\d+)\s+(AM|PM)\s*[–-]\s*(\d+):(\d+)\s+(AM|PM)/);
  let startHour = 14;
  let startMin = 0;
  let endHour = 17;
  let endMin = 0;

  if (timeMatch) {
    const [, sh, sm, sap, eh, em, eap] = timeMatch;
    startHour = parseInt(sh) + (sap === "PM" && sh !== "12" ? 12 : 0);
    if (sap === "AM" && sh === "12") startHour = 0;
    startMin = parseInt(sm);
    endHour = parseInt(eh) + (eap === "PM" && eh !== "12" ? 12 : 0);
    if (eap === "AM" && eh === "12") endHour = 0;
    endMin = parseInt(em);
  }

  return {
    start: new Date(parseInt(year), month, parseInt(day), startHour, startMin),
    end: new Date(parseInt(year), month, parseInt(day), endHour, endMin),
  };
}

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function generateICS(): string {
  const { start, end } = parseEventDate();

  const event: CalendarEvent = {
    title: eventConfig.partyName,
    description: eventConfig.themeDescription,
    location: `${eventConfig.venueName}, ${eventConfig.address}`,
    startDate: start,
    endDate: end,
  };

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Birthday Party Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${formatICSDate(event.startDate)}
DTEND:${formatICSDate(event.endDate)}
DTSTAMP:${formatICSDate(new Date())}
UID:${Date.now()}@birthday-invite.app
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, "\\n")}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  return ics;
}

export function downloadICS(): void {
  const icsContent = generateICS();
  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "birthday-party.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(): string {
  const { start, end } = parseEventDate();

  const formatGoogleDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventConfig.partyName,
    details: eventConfig.themeDescription,
    location: `${eventConfig.venueName}, ${eventConfig.address}`,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookUrl(): string {
  const { start, end } = parseEventDate();

  const formatOutlookDate = (date: Date) => date.toISOString();

  const params = new URLSearchParams({
    subject: eventConfig.partyName,
    body: eventConfig.themeDescription,
    location: `${eventConfig.venueName}, ${eventConfig.address}`,
    startdt: formatOutlookDate(start),
    enddt: formatOutlookDate(end),
    path: "/calendar/action/compose",
    rru: "addevent",
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
