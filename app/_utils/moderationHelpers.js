import { Filter } from "bad-words";

const filter = new Filter();

export const MODERATED_FIELDS = new Set([
  "firstName",
  "lastName",
  "preferredName",
  "currentOrgInvolvement",
  "positionsHeld",
]);

filter.addWords(
  "kill",
  "die",
  "go die",
  "hate",
);

export function containsProfanity(text = "") {
  if (typeof text !== "string") return false;

  return filter.isProfane(text);
}

export function shouldModerateField(key = "") {
  return MODERATED_FIELDS.has(key);
}

export function shouldRejectForModeration(key, value) {
  if (!shouldModerateField(key)) return false;
  return containsProfanity(value);
}