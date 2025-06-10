import { describe, it, expect, beforeEach, vi } from "vitest";
import { booksApi } from "@/api/booksApi";
import { API_BASE, currentUser } from "@/config";

// Mock fetch
global.fetch = vi.fn();

describe("BooksApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllBooks", () => {
    it("should fetch all books successfully", async () => {
      const mockBooks = [
        { id: 1, name: "Test Book", author: "Test Author", ownerId: "test" },
      ];

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockBooks,
      } as Response);

      const result = await booksApi.getAllBooks();

      expect(fetch).toHaveBeenCalledWith(`${API_BASE}/${currentUser}/`);
      expect(result).toEqual(mockBooks);
    });

    it("should throw when API fails (network error)", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

      await expect(booksApi.getAllBooks()).rejects.toThrow("Network error");
    });

    it("should throw on HTTP errors", async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(booksApi.getAllBooks()).rejects.toThrow("HTTP error! status: 404");
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

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => bookData,
      } as Response);

      const result = await booksApi.addBook(bookData);

      expect(fetch).toHaveBeenCalledWith(
        `${API_BASE}/${currentUser}/`,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        })
      );
      expect(result).toEqual(bookData);
    });

    it("should throw when addBook API fails (network error)", async () => {
      const bookData = {
        id: 1,
        ownerId: "postnikov",
        name: "New Book",
        author: "New Author",
      };

      vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

      await expect(booksApi.addBook(bookData)).rejects.toThrow("Network error");
    });
  });
});
