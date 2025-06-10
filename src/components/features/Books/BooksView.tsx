import { observer } from "mobx-react";
import { useEffect, useMemo } from "react";
import { BooksController } from "@/controllers/booksController";
import { BooksList } from "./BooksList";
import { AddBookForm } from "./AddBookForm";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ResetBooks } from "./ResetBooks";

const BooksViewComponent = () => {
  const controller = useMemo(() => new BooksController(), []);

  useEffect(() => {
    controller.initialize();
  }, [controller]);

  return (
    <div className="container mx-auto py-3 space-y-4">
      {/* Error Display */}
      {controller.error && (
        <Alert variant="destructive">
          <AlertDescription>{controller.error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-left">
          {controller.currentViewMode === "all"
            ? "All Books"
            : "Your Private Books"}
          <span className="text-muted-foreground text-lg ml-2">
            ({controller.books.length})
          </span>
        </h2>
        <div className="flex items-center space-x-8">
          <Label htmlFor="view-mode" className="text-base font-semibold">
            View Mode:
          </Label>
          <div className="flex items-center space-x-2">
            <Label htmlFor="view-mode" className="text-sm">
              All Books
            </Label>
            <Switch
              id="view-mode"
              checked={controller.currentViewMode === "private"}
              onCheckedChange={(checked) =>
                controller.switchView(checked ? "private" : "all")
              }
            />
            <Label htmlFor="view-mode" className="text-sm">
              Private Books
            </Label>
          </div>
          {/* Reset Button with confirmation dialog */}
          <ResetBooks
            onReset={async () => {
              await controller.resetBooks();
            }}
            disabled={controller.isLoading}
          />
        </div>
      </div>

      <Separator />

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <BooksList
            books={controller.books}
            isLoading={controller.isLoading}
          />
        </div>

        {/* Create Book Form */}
        <div className="lg:col-span-1">
          <AddBookForm
            onSubmit={async (book) => {
              await controller.addBook(book);
            }}
            isLoading={controller.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

BooksViewComponent.displayName = "BooksView";

export const BooksView = observer(BooksViewComponent);
