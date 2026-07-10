// CATEGORIES PAGE
"use client";

import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_CATEGORIES, MOCK_FOODS } from "@/constants/mockData";
import { toast } from "sonner";

export default function RestaurantCategoriesPage() {
  const [categories, setCategories] = useState(
    MOCK_CATEGORIES.filter((c) => c.restaurantId === "r1"),
  );

  function handleDelete(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organise your menu into categories. Drag to reorder.
          </p>
        </div>
        <Button size="sm"><Plus className="size-4" /> Add category</Button>
      </div>

      <div className="space-y-2">
        {categories.map((cat) => {
          const foodCount = MOCK_FOODS.filter((f) => f.categoryId === cat.id).length;
          return (
            <Card key={cat.id}>
              <CardContent className="flex items-center gap-3 py-3.5">
                <GripVertical className="size-5 text-muted-foreground/40 cursor-grab shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{foodCount} item{foodCount !== 1 ? "s" : ""}</p>
                </div>
                <Badge variant="outline" className="text-xs">Order #{cat.order}</Badge>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="size-8"><Pencil className="size-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(cat.id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
