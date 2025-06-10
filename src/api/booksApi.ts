import { Book } from "@/types/book";
import { currentUser, API_BASE } from "@/config";

class BooksApi {
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE}/${currentUser}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async getPrivateBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE}/${currentUser}/private`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async addBook(book: Book): Promise<Book> {
    const response = await fetch(`${API_BASE}/${currentUser}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async resetBooks(): Promise<void> {
    const response = await fetch(`${API_BASE}/${currentUser}/reset`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export const booksApi = new BooksApi();
