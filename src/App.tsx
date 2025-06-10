import { observer } from "mobx-react";
import { Header } from "@/components/common/Header/Header";
import { BooksView } from "@/components/features/Books/BooksView";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

import React from "react";

const App: React.FC = observer(() => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-xxl">
        <BooksView />
      </main>
      <Toaster />
    </div>
  );
});

App.displayName = "App";

export default App;
