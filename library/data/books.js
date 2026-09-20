// Add a book to this list to add it to the shelf.
// - isbn is optional but recommended (ISBN-13, no dashes) — it gets the most reliable cover art.
//   Without it, the shelf searches Open Library by title/author, and falls back to a
//   generated spine if no cover can be found.
// - rating is 0–5, half steps allowed (e.g. 3.5).
// - dateRead is "YYYY-MM".
export const BOOKS = [
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    rating: 4.5,
    dateRead: "2025-01",
    notes: "A sweeping, occasionally maddening tour through everything that made us. Changed how I think about money, myths, and cooperation at scale."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    rating: 4,
    dateRead: "2025-02",
    notes: "Less about willpower, more about systems. The 1% better framing stuck with me long after I finished it."
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9780441013593",
    rating: 5,
    dateRead: "2025-02",
    notes: "Dense on first read, worth every page. Politics, ecology, and prophecy woven tighter than I expected from a book this old."
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "9780593135204",
    rating: 5,
    dateRead: "2025-03",
    notes: "Couldn't put this down. The kind of problem-solving-as-plot that makes a 450 page book feel like a sprint."
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    rating: 4,
    dateRead: "2025-04",
    notes: "Slower going than the fiction on this shelf, but it rewired how I second-guess my own snap judgements."
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "9780465050659",
    rating: 4.5,
    dateRead: "2025-05",
    notes: "Required reading if you've ever pushed a door marked 'pull'. I see affordances everywhere now."
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    rating: 3.5,
    dateRead: "2025-05",
    notes: "Some of it aged better than the rest, but the core argument for naming things properly still holds up."
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    isbn: "9780135957059",
    rating: 4,
    dateRead: "2025-06",
    notes: "A career's worth of good habits distilled into something you can actually read in a week."
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    isbn: "9780807014295",
    rating: 5,
    dateRead: "2025-07",
    notes: "Short, devastating, and somehow hopeful. Re-read it once a year now."
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    rating: 4.5,
    dateRead: "2025-08",
    notes: "Comfort reading. Warmer and funnier than I remembered from being a kid."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "9781455586691",
    rating: 4,
    dateRead: "2025-08",
    notes: "Made me genuinely angry about my own notification settings, in a productive way."
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn: "9780399590504",
    rating: 4.5,
    dateRead: "2025-09",
    notes: "Hard to read in places, impossible to put down. Stuck with me for weeks after finishing."
  }
];
