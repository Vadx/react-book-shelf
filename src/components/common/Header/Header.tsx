import { observer } from "mobx-react";
import { HeaderController } from "@/controllers/headerController";
import { useMemo } from "react";
import { BookOpen } from "lucide-react";

import type { FC } from "react";

export const Header: FC = observer(() => {
  const controller = useMemo(() => new HeaderController(), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-semibold">BookShelf</h1>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Your books:</span>
          <span className="font-medium text-foreground">
            {controller.privateBooksCount}
          </span>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
