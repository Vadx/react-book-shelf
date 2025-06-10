import { observer } from "mobx-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/types/book";
import { currentUser } from "@/config";

interface BookCardProps {
  book: Book;
}

export const BookCard = observer(({ book }: BookCardProps) => {
  const isOwned = book.ownerId === currentUser;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{book.name}</CardTitle>
          {isOwned && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              Owned
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 text-left">
        <p className="text-sm text-muted-foreground">by {book.author}</p>
        <p className="text-xs text-muted-foreground mt-1">ID: {book.id}</p>
      </CardContent>
    </Card>
  );
});
