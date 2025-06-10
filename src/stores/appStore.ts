import { makeObservable, observable, action, computed } from "mobx";
import { Book, BookViewMode } from "@/types/book";
import { currentUser } from "@/config";

class AppStore {
  books: Book[] = [];
  privateBooks: Book[] = [];
  currentViewMode: BookViewMode = "all";
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      books: observable,
      privateBooks: observable,
      currentViewMode: observable,
      isLoading: observable,
      error: observable,
      setBooks: action,
      setPrivateBooks: action,
      setViewMode: action,
      setLoading: action,
      setError: action,
      addBook: action,
      clearError: action,
      currentBooks: computed,
      privateBooksCount: computed,
    });
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  setPrivateBooks(books: Book[]) {
    this.privateBooks = books;
  }

  setViewMode(mode: BookViewMode) {
    this.currentViewMode = mode;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  addBook(book: Book) {
    this.books.push(book);
    if (book.ownerId === currentUser) {
      this.privateBooks.push(book);
    }
  }

  clearError() {
    this.error = null;
  }

  get currentBooks(): Book[] {
    return this.currentViewMode === "all" ? this.books : this.privateBooks;
  }

  get privateBooksCount(): number {
    return this.privateBooks.length;
  }
}

export const appStore = new AppStore();
