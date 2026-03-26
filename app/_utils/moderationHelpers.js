import { Filter } from "bad-words";

const filter = new Filter();

export function containsProfanity(text = "") {
  if (typeof text !== "string") return false;

  return filter.isProfane(text);
}

export function shouldModerateField(key = "") {
  const moderatedFields = new Set([
    "firstName",
    "lastName",
    "preferredName",
    "currentOrgInvolvement",
    "positionsHeld",
  ]);

  return moderatedFields.has(key);
}

export function shouldRejectForModeration(key, value) {
  if (!shouldModerateField(key)) return false;
  return containsProfanity(value);
}

filter.addWords(
  "hate you",
  "i hate you",
  "kill you",
  "kill this person",
  "i want to kill",
  "die",
  "go die"
);