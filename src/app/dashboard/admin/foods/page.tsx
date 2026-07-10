"use client";

import { useState } from "react";
import { Search, MoreHorizontal, EyeOff, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MOCK_FOODS } from "@/constants/mockData";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export default function AdminFoodsPage() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState(MOCK_FOODS);
  const debounced = useDebounce(query, 300);

  const filtered = foods.filter((f) =>
    !debounced ||
    f.name.toLowerCase().includes(debounced.toLowerCase()) ||
    f.restaurantName?.toLowerCase().includes(debounced.toLowerCase()),
  );

  function toggleAvailability(id: string) {
    setFoods((prev) => prev.map((f) => f.id === id ? { ...f, isAvailable: !f.isAvailable } : f));
    toast.success("Food item availability updated");
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Foods</h1>
        <p className="mt-1 text-sm text-muted-foreground">{foods.length} food items across all restaurants</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search food items…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Food Item</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((food) => (
              <TableRow key={food.id} className={!food.isAvailable ? "opacity-60" : ""}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted font-display text-sm font-bold text-muted-foreground/40">
                      {food.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-sm">{food.name}</p>
                        {food.isVegetarian && <Leaf className="size-3 text-accent" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{food.totalSold} sold</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{food.restaurantName}</TableCell>
                <TableCell className="text-sm">
                  <span className="font-semibold text-primary">৳{food.discountPrice ?? food.price}</span>
                  {food.discountPrice && (
                    <span className="ml-1.5 text-xs text-muted-foreground line-through">৳{food.price}</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">★ {food.avgRating}</TableCell>
                <TableCell>
                  <Badge variant={food.isAvailable ? "success" : "secondary"} className="text-xs">
                    {food.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleAvailability(food.id)}>
                        <EyeOff className="size-4" />
                        {food.isAvailable ? "Mark unavailable" : "Mark available"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
