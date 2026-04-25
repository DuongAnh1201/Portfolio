import type { Locale } from "./locale";
import enAbout from "@/data/en/about.json";
import viAbout from "@/data/vi/about.json";
import enContact from "@/data/en/contact.json";
import viContact from "@/data/vi/contact.json";
import enExperience from "@/data/en/experience.json";
import viExperience from "@/data/vi/experience.json";
import enEducation from "@/data/en/education.json";
import viEducation from "@/data/vi/education.json";
import enProjects from "@/data/en/projects.json";
import viProjects from "@/data/vi/projects.json";
import enWriting from "@/data/en/writing.json";
import viWriting from "@/data/vi/writing.json";
import enReading from "@/data/en/reading.json";
import viReading from "@/data/vi/reading.json";
import enUpdates from "@/data/en/updates.json";
import viUpdates from "@/data/vi/updates.json";
import enOther from "@/data/en/other.json";
import viOther from "@/data/vi/other.json";

export type AboutData = typeof enAbout;
type About = AboutData;
export type ContactData = typeof enContact;
type Contact = ContactData;

const about: Record<Locale, About> = { en: enAbout, vi: viAbout };
const contact: Record<Locale, Contact> = { en: enContact, vi: viContact };

export function getAbout(locale: Locale): About {
  return about[locale] ?? enAbout;
}

export function getContact(locale: Locale): Contact {
  return contact[locale] ?? enContact;
}

export function getExperience(locale: Locale) {
  return locale === "vi" ? viExperience : enExperience;
}

export function getEducation(locale: Locale) {
  return locale === "vi" ? viEducation : enEducation;
}

export function getProjects(locale: Locale) {
  return locale === "vi" ? viProjects : enProjects;
}

export function getWriting(locale: Locale) {
  return locale === "vi" ? viWriting : enWriting;
}

export function getReading(locale: Locale) {
  return locale === "vi" ? viReading : enReading;
}

export function getUpdates(locale: Locale) {
  return locale === "vi" ? viUpdates : enUpdates;
}

export function getOther(locale: Locale) {
  return locale === "vi" ? viOther : enOther;
}
