let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

// Normal: notes 1 and 5. Edge: []
console.log("Search 'BUY':", searchNotes("BUY")); // Buy milk and bread
console.log("Search 'pizza':", searchNotes("pizza")); // []

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest
  );
}

// Normal: note 2. Edge: null when notes is empty.
console.log("Longest note:", longestNote()); // Finish the Day 3 assignment
const savedNotes = notes;
notes = [];
console.log("Longest note in empty list:", longestNote()); // null
notes = savedNotes;

function countByCategory() {
  const counts = {};

  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }

  return counts;
}

// Normal: { personal: 2, study: 2, work: 1 }. Edge: {}
console.log("Category counts:", countByCategory()); // { personal: 2, study: 2, work: 1 }
notes = [];
console.log("Counts for empty list:", countByCategory()); // {}
notes = savedNotes;

function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noun = total === 1 ? "note" : "notes";

  if (total === 0) {
    return "0 notes.";
  }

  const categories = ["personal", "work", "study"]
    .filter(category => counts[category])
    .map(category => `${counts[category]} ${category}`)
    .join(", ");

  return `${total} ${noun}: ${categories}.`;
}

// Normal: "5 notes: 2 personal, 1 work, 2 study." Edge: "0 notes."
console.log("Summary:", getSummary()); // 5 notes: 2 personal, 1 work, 2 study.
notes = [];
console.log("Empty summary:", getSummary()); // 0 notes.
notes = savedNotes;

function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(note => note.text.trim().toLowerCase() === normalizedText);
}

// Normal duplicate: true. Edge non-duplicate: false.
console.log("Duplicate check:", isDuplicate("  BUY MILK AND BREAD ")); // true
console.log("New text check:", isDuplicate("Walk the dog")); // false

function addNote(text, category) {
  const trimmedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Note not added: duplicate text.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Note not added: invalid category.");
    return false;
  }

  const nextId = notes.length
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  notes.push({ id: nextId, text: trimmedText, category });
  console.log("Note added successfully.");
  return true;
}

// Normal: true. Edge cases: duplicate and invalid category return false.
console.log("Add a new note:", addNote("Walk the dog", "personal")); // true
console.log("Add duplicate:", addNote(" walk the DOG ", "work")); // false
console.log("Add invalid category:", addNote("Plan weekend", "fun")); // false
