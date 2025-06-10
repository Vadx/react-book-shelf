import { describe, it, expect, beforeEach } from "vitest";
import { appStore } from "@/stores/appStore";
import { Book } from "@/types/book";

describe("AppStore", () => {
  beforeEach(() => {
    // Reset store state
    appStore.setBooks([]);
    appStore.setPrivateBooks([]);
    appStore.setLoading(false);
    appStore.setError(null);
    appStore.setViewMode("all");
  });

  describe("setters", () => {
    it("should set books", () => {
      const books: Book[] = [
        { id: 1, name: "Test Book", author: "Test Author", ownerId: "test" },
      ];

      appStore.setBooks(books);
      expect(appStore.books).toEqual(books);
    });

    it("should set private books", () => {
      const privateBooks: Book[] = [
        {
          id: 1,
          name: "Private Book",
          author: "Test Author",
          ownerId: "postnikov",
        },
      ];

      appStore.setPrivateBooks(privateBooks);
      expect(appStore.privateBooks).toEqual(privateBooks);
    });

    it("should set view mode", () => {
      appStore.setViewMode("private");
      expect(appStore.currentViewMode).toBe("private");
    });

    it("should set loading state", () => {
      appStore.setLoading(true);
      expect(appStore.isLoading).toBe(true);
    });

    it("should set error", () => {
      const error = "Test error";
      appStore.setError(error);
      expect(appStore.error).toBe(error);
    });

    it("should clear error", () => {
      appStore.setError("Test error");
      appStore.clearError();
      expect(appStore.error).toBe(null);
    });
  });

  describe("addBook", () => {
    it("should add book to books array", () => {
      const book: Book = {
        id: 1,
        name: "New Book",
        author: "New Author",
        ownerId: "test",
      };

      appStore.addBook(book);
      expect(appStore.books).toContainEqual(book);
    });

    it("should add owned book to private books", () => {
      const ownedBook: Book = {
        id: 1,
        name: "Owned Book",
        author: "Test Author",
        ownerId: "postnikov",
      };

      appStore.addBook(ownedBook);
      expect(appStore.privateBooks).toContainEqual(ownedBook);
    });

    it("should not add non-owned book to private books", () => {
      const nonOwnedBook: Book = {
        id: 1,
        name: "Non-Owned Book",
        author: "Test Author",
        ownerId: "other",
      };

      appStore.addBook(nonOwnedBook);
      expect(appStore.privateBooks).not.toContainEqual(nonOwnedBook);
    });
  });

  describe("computed properties", () => {
    beforeEach(() => {
      const allBooks: Book[] = [
        { id: 1, name: "Book 1", author: "Author 1", ownerId: "postnikov" },
        { id: 2, name: "Book 2", author: "Author 2", ownerId: "other" },
      ];
      const privateBooks: Book[] = [allBooks[0]];

      appStore.setBooks(allBooks);
      appStore.setPrivateBooks(privateBooks);
    });

    it("should return all books when view mode is all", () => {
      appStore.setViewMode("all");
      expect(appStore.currentBooks).toHaveLength(2);
    });

    it("should return private books when view mode is private", () => {
      appStore.setViewMode("private");
      expect(appStore.currentBooks).toHaveLength(1);
      expect(appStore.currentBooks[0].ownerId).toBe("postnikov");
    });

    it("should return correct private books count", () => {
      expect(appStore.privateBooksCount).toBe(1);
    });
  });
});
