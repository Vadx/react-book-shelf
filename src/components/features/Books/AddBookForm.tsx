import { observer } from "mobx-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/book";
import { currentUser } from "@/config";
import { toast } from "sonner";

interface AddBookFormProps {
  onSubmit: (book: Book) => Promise<void>;
  isLoading: boolean;
}

const AddBookFormComponent = ({ onSubmit, isLoading }: AddBookFormProps) => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !author.trim()) return;

    await onSubmit({
      id: Date.now(),
      name: name.trim(),
      author: author.trim(),
      ownerId: currentUser,
    });

    toast.success(`${name.trim()} has been created.`, {
      duration: 3000,
      style: {
        background: "#f0f4f8",
        color: "#333",
      },
      icon: "📚",
      position: "top-right",
      className: "shadow-lg",
      action: {
        label: "OK",
        onClick: () => toast.dismiss(),
      },
    });

    setName("");
    setAuthor("");
  };

  return (
    <Card className="w-full max-w-md bg-gray-100">
      <CardHeader>
        <CardTitle>Add New Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="name">Book Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter book name"
              disabled={isLoading}
              className="bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              disabled={isLoading}
              className="bg-white text-gray-800 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!name.trim() || !author.trim() || isLoading}
          >
            {isLoading ? "Adding..." : "Add Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

AddBookFormComponent.displayName = "AddBookForm";

export const AddBookForm = observer(AddBookFormComponent);
