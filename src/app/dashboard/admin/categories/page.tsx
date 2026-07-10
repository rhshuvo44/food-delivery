// Admin Categories Page
"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MOCK_CATEGORIES, MOCK_FOODS } from "@/constants/mockData";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  function handleDelete(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  }
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">Platform-wide category management</p>
        </div>
        <Button size="sm"><Plus className="size-4" /> Add category</Button>
      </div>
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead className="text-right">Foods</TableHead>
              <TableHead className="text-right">Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => {
              const foodCount = MOCK_FOODS.filter((f) => f.categoryId === cat.id).length;
              return (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium text-sm">{cat.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">Spice Garden</TableCell>
                  <TableCell className="text-right text-sm">{foodCount}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">#{cat.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="size-8"><Pencil className="size-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(cat.id)}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
