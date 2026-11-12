import { allGuides } from "content-collections";

/** Every guide, in sidebar order. */
export const guides = [...allGuides].sort((a, b) => a.order - b.order);

export type Guide = (typeof guides)[number];

export const getGuide = (slug: string) =>
	guides.find((guide) => guide.slug === slug);

export type GuideSection = Guide["section"];

/** The guides of one sidebar section, in order. */
export const guidesIn = (section: GuideSection) =>
	guides.filter((guide) => guide.section === section);
