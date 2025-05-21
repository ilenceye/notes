import { getCollection } from "astro:content";
import md from "./markdown-it";

function getDataFromNoteBody(raw: string) {
  // Extract title
  // Extract body
  const lines = raw.split("\n");
  const heading1 = lines.find((line) => line.startsWith("# "));
  const title = heading1 ? heading1.slice(2) : "Untitled";
  const body = lines.filter((line) => !line.startsWith("# ")).join("\n");
  return { title, body };
}

export async function getNoteList() {
  const col = await getCollection("notes");

  const notes = col
    .map((entry) => {
      const slug = entry.id.slice(16); // "YYYY-MM-DDTHHMM-".length
      const createdAt = entry.id.slice(0, 10); // "YYYY-MM-DD".length
      const [year, month, day] = createdAt.split("-");
      const { title, body } = getDataFromNoteBody(entry.body || "");
      const html = md.render(body);
      return { slug, title, html, createdAt, year, month, day };
    })
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));

  return notes;
}

export type Note = Awaited<ReturnType<typeof getNoteList>>[number];

export async function getNoteGroupByMonth() {
  const map: Map<string, { year: string; month: string; notes: Note[] }> =
    new Map();

  const notes = await getNoteList();

  for (const note of notes) {
    const { year, month } = note;
    const key = `${year}-${month}`;

    if (!map.has(key)) map.set(key, { year, month, notes: [] });

    map.get(key)?.notes.push(note);
  }

  return [...map.values()];
}

export type GroupedNote = Awaited<
  ReturnType<typeof getNoteGroupByMonth>
>[number];

export async function getLatestNoteList(length = 7) {
  const allNotes = await getNoteList();
  const latestNotes = allNotes.slice(0, length);
  return latestNotes;
}
