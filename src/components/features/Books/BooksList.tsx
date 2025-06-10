import { observer } from "mobx-react";
import { BookCard } from "./BookCard";
import { Book } from "@/types/book";

interface BooksListProps {
  books: Book[];
  isLoading: boolean;
}

const BooksListComponent = ({ books, isLoading }: BooksListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No books found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

BooksListComponent.displayName = "BooksList";

export const BooksList = observer(BooksListComponent);
