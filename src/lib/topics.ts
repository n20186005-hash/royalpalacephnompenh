// Slugs for the long-form visitor-guide topic pages. These are language-neutral
// (the same slug is used across km / en / zh) so hreflang alternates can map 1:1.
export const TOPIC_SLUGS = [
  'tickets',
  'opening-hours',
  'dress-code',
  'silver-pagoda',
  'how-to-get-there',
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export function isTopicSlug(value: string): value is TopicSlug {
  return (TOPIC_SLUGS as readonly string[]).includes(value);
}
