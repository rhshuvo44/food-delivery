"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { MOCK_COUPONS } from "@/constants/mockData";
import { toast } from "sonner";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(MOCK_COUPONS);
  function handleDelete(id: string) {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast.success("Coupon removed");
  }
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Coupons</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage platform-wide and restaurant coupons</p>
        </div>
        <Button size="sm"><Plus className="size-4" /> Create coupon</Button>
      </div>
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Valid Till</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((c) => {
              const isExpired = new Date(c.validTill) < new Date();
              return (
                <TableRow key={c.id} className={isExpired ? "opacity-60" : ""}>
                  <TableCell className="font-mono font-bold text-sm tracking-widest">{c.code}</TableCell>
                  <TableCell>
                    <Badge variant={c.type === "PERCENTAGE" ? "warning" : c.type === "FLAT" ? "default" : "success"} className="text-xs">
                      {c.type.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {c.type === "PERCENTAGE" ? `${c.value}%` : c.type === "FLAT" ? `৳${c.value}` : "Free delivery"}
                    {c.maxDiscount && <span className="text-xs text-muted-foreground ml-1">(max ৳{c.maxDiscount})</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {c.restaurantName ? c.restaurantName : "Platform-wide"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(c.validTill).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "2-digit" })}
                    {isExpired && <Badge variant="destructive" className="ml-2 text-[10px]">Expired</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="size-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
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
