export interface Book {
  id: number;
  name: string;
  ownerId: string;
  author: string;
}

export type BookViewMode = "all" | "private";
