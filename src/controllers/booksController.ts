import { makeObservable, action, runInAction } from "mobx";
import { appStore } from "@/stores/appStore";
import { booksApi } from "@/api/booksApi";
import { Book, BookViewMode } from "@/types/book";

export class BooksController {
  private store = appStore;

  constructor() {
    makeObservable(this, {
      initialize: action,
      loadBooks: action,
      loadPrivateBooks: action,
      addBook: action,
      switchView: action,
    });
  }

  async resetBooks() {
    try {
      runInAction(() => {
        this.store.setLoading(true);
        this.store.clearError();
      });
      await booksApi.resetBooks();
      await this.initialize();
      runInAction(() => {
        this.store.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.store.setError(
          error instanceof Error ? error.message : "Failed to reset books",
        );
        this.store.setLoading(false);
      });
    }
  }

  async initialize() {
    await Promise.all([this.loadBooks(), this.loadPrivateBooks()]);
  }

  async loadBooks() {
    try {
      runInAction(() => {
        this.store.setLoading(true);
        this.store.clearError();
      });

      const books = await booksApi.getAllBooks();

      runInAction(() => {
        this.store.setBooks(books);
        this.store.setLoading(false);
      });
    } catch (error) {
      runInAction(() => {
        this.store.setError(
          error instanceof Error ? error.message : "Failed to load books",
        );
        this.store.setLoading(false);
      });
    }
  }

  async loadPrivateBooks() {
    try {
      const privateBooks = await booksApi.getPrivateBooks();

      runInAction(() => {
        this.store.setPrivateBooks(privateBooks);
      });
    } catch (error) {
      runInAction(() => {
        this.store.setError(
          error instanceof Error
            ? error.message
            : "Failed to load private books",
        );
      });
    }
  }

  async addBook(bookData: Book) {
    try {
      runInAction(() => {
        this.store.setLoading(true);
        this.store.clearError();
      });

      const newBook = await booksApi.addBook(bookData);

      // After successful add, reload all and private books
      await Promise.all([this.loadBooks(), this.loadPrivateBooks()]);

      runInAction(() => {
        this.store.setLoading(false);
      });

      return newBook;
    } catch (error) {
      runInAction(() => {
        this.store.setError(
          error instanceof Error ? error.message : "Failed to create book",
        );
        this.store.setLoading(false);
      });
      throw error;
    }
  }

  switchView(mode: BookViewMode) {
    runInAction(() => {
      this.store.setViewMode(mode);
    });
  }

  // Getters for the view
  get books() {
    return this.store.currentBooks;
  }

  get isLoading() {
    return this.store.isLoading;
  }

  get error() {
    return this.store.error;
  }

  get currentViewMode() {
    return this.store.currentViewMode;
  }

  get privateBooksCount() {
    return this.store.privateBooksCount;
  }
}
