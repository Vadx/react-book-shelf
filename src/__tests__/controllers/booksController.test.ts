import { describe, it, expect, beforeEach, vi } from "vitest";
import { BooksController } from "@/controllers/booksController";
import { appStore } from "@/stores/appStore";
import { booksApi } from "@/api/booksApi";
import { Book } from "@/types/book";

// Mock the API
vi.mock("@/api/booksApi", () => ({
  booksApi: {
    getAllBooks: vi.fn(),
    getPrivateBooks: vi.fn(),
    addBook: vi.fn(),
    resetBooks: vi.fn(),
  },
}));

describe("BooksController", () => {
  let controller: BooksController;

  beforeEach(() => {
    controller = new BooksController();
    // Reset store state
    appStore.setBooks([]);
    appStore.setPrivateBooks([]);
    appStore.setLoading(false);
    appStore.setError(null);
    appStore.setViewMode("all");
    vi.clearAllMocks();
  });

  describe("loadBooks", () => {
    it("should load books successfully", async () => {
      const mockBooks = [
        { id: 1, name: "Test Book", author: "Test Author", ownerId: "test" },
      ];

      vi.mocked(booksApi.getAllBooks).mockResolvedValue(mockBooks);

      await controller.loadBooks();

      expect(appStore.books).toEqual(mockBooks);
      expect(appStore.isLoading).toBe(false);
      expect(appStore.error).toBe(null);
    });

    it("should handle errors when loading books", async () => {
      const errorMessage = "Network error";
      vi.mocked(booksApi.getAllBooks).mockRejectedValue(
        new Error(errorMessage)
      );

      await controller.loadBooks();

      expect(appStore.error).toBe(errorMessage);
      expect(appStore.isLoading).toBe(false);
    });

    it("should set loading state during API call", async () => {
      let resolvePromise: (value: Book[]) => void;
      const promise = new Promise<Book[]>((resolve) => {
        resolvePromise = resolve;
      });

      vi.mocked(booksApi.getAllBooks).mockReturnValue(promise);

      const loadPromise = controller.loadBooks();

      // Check loading state is true during API call
      expect(appStore.isLoading).toBe(true);

      // Resolve the API call
      resolvePromise!([]);
      await loadPromise;

      expect(appStore.isLoading).toBe(false);
    });
  });

  describe("addBook", () => {
    it("should create a book successfully", async () => {
      const bookData = {
        id: 1,
        ownerId: "postnikov",
        name: "New Book",
        author: "New Author",
      };

      vi.mocked(booksApi.addBook).mockResolvedValue(bookData);
      vi.mocked(booksApi.getAllBooks).mockResolvedValue([bookData]);
      vi.mocked(booksApi.getPrivateBooks).mockResolvedValue([bookData]);

      const result = await controller.addBook(bookData);

      expect(result).toEqual(bookData);
      expect(appStore.books).toContainEqual(bookData);
      expect(appStore.privateBooks).toContainEqual(bookData);
    });

    it("should handle errors when creating a book", async () => {
      const bookData = {
        id: 1,
        ownerId: "postnikov",
        name: "New Book",
        author: "New Author",
      };
      const errorMessage = "Creation failed";

      vi.mocked(booksApi.addBook).mockRejectedValue(new Error(errorMessage));

      await expect(controller.addBook(bookData)).rejects.toThrow(errorMessage);
      expect(appStore.error).toBe(errorMessage);
    });
  });

  describe("switchView", () => {
    it("should switch view mode to private", () => {
      controller.switchView("private");
      expect(appStore.currentViewMode).toBe("private");
    });

    it("should switch view mode to all", () => {
      appStore.setViewMode("private");
      controller.switchView("all");
      expect(appStore.currentViewMode).toBe("all");
    });
  });

  describe("getters", () => {
    beforeEach(() => {
      const allBooks = [
        { id: 1, name: "Book 1", author: "Author 1", ownerId: "postnikov" },
        { id: 2, name: "Book 2", author: "Author 2", ownerId: "other" },
      ];
      const privateBooks = [allBooks[0]];

      appStore.setBooks(allBooks);
      appStore.setPrivateBooks(privateBooks);
    });

    it("should return all books when view mode is all", () => {
      appStore.setViewMode("all");
      expect(controller.books).toHaveLength(2);
    });

    it("should return private books when view mode is private", () => {
      appStore.setViewMode("private");
      expect(controller.books).toHaveLength(1);
      expect(controller.books[0].ownerId).toBe("postnikov");
    });

    it("should return correct private books count", () => {
      expect(controller.privateBooksCount).toBe(1);
    });
  });
});
