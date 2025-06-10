# Books Shelf

A Test web application for managing a personal book collection. Built with React, TypeScript, Mobx, Vite, and Tailwind CSS.

## Project Structure

```
components.json
eslint.config.js
index.html
package.json
postcss.config.js
tailwind.config.js
tsconfig*.json
vite*.ts
src/
  App.tsx
  main.tsx
  api/
    booksApi.ts
  components/
    common/
      Header/
        Header.tsx
    features/
      Books/
        AddBookForm.tsx
        BookCard.tsx
        BooksList.tsx
        BooksView.tsx
    ui/
      ... (UI components)
  config/
    index.ts
  controllers/
    booksController.ts
    headerController.ts
  lib/
    utils.ts
  stores/
    appStore.ts
  types/
    book.ts
  __tests__/
    ... (tests)
```

## API Service

The API service is defined in `src/api/booksApi.ts` and provides functions to interact with the backend for managing books (fetch, add, update, delete).

## How to Run the Project

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Run tests:**
   ```sh
   npm run test
   ```
4. **Run tests UI:**
   ```sh
   npm run test:ui
   ```

The app will be available at `http://localhost:5173` by default.

---
