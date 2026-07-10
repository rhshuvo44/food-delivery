"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle, Eye, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MOCK_RESTAURANTS } from "@/constants/mockData";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "success" | "warning" | "destructive" | "outline"> = {
  APPROVED:        "success",
  PENDING_APPROVAL: "warning",
  SUSPENDED:       "destructive",
  REJECTED:        "secondary",
};

// Augment mock data with status for admin view
const ADMIN_RESTAURANTS = MOCK_RESTAURANTS.map((r, i) => ({
  ...r,
  status: i === 0 ? "APPROVED" : i === 1 ? "APPROVED" : i === 3 ? "SUSPENDED" : "PENDING_APPROVAL",
  totalOrders: [342, 289, 198, 76, 143, 89][i] ?? 0,
  revenue: ["৳95,000", "৳72,500", "৳83,160", "৳31,920", "৳25,740", "৳22,250"][i] ?? "৳0",
}));

export default function AdminRestaurantsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [restaurants, setRestaurants] = useState(ADMIN_RESTAURANTS);
  const debouncedQuery = useDebounce(query, 300);

  const STATUS_TABS = ["All", "Approved", "Pending", "Suspended"];

  const filtered = restaurants.filter((r) => {
    const matchQuery = !debouncedQuery ||
      r.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      r.cuisineTags.some((t) => t.toLowerCase().includes(debouncedQuery.toLowerCase()));
    const matchStatus =
      statusFilter === "All" ? true :
      statusFilter === "Approved" ? r.status === "APPROVED" :
      statusFilter === "Pending"  ? r.status === "PENDING_APPROVAL" :
      statusFilter === "Suspended" ? r.status === "SUSPENDED" : true;
    return matchQuery && matchStatus;
  });

  function updateStatus(id: string, status: string) {
    setRestaurants((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    toast.success(`Restaurant ${status.toLowerCase().replace("_", " ")}`);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Restaurants</h1>
          <p className="mt-1 text-sm text-muted-foreground">{restaurants.length} registered restaurants</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search restaurants…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-1 rounded-xl bg-secondary p-1">
          {STATUS_TABS.map((tab) => (
            <button key={tab} onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted font-display text-sm font-bold text-muted-foreground/40">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.address.area}, {r.address.city}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {r.cuisineTags.slice(0, 2).join(", ")}
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[r.status] ?? "outline"} className="text-xs">
                    {r.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm">{(r as typeof r & { totalOrders: number }).totalOrders}</TableCell>
                <TableCell className="text-right text-sm font-semibold text-primary">
                  {(r as typeof r & { revenue: string }).revenue}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="size-4" /> View details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {r.status !== "APPROVED" && (
                        <DropdownMenuItem onClick={() => updateStatus(r.id, "APPROVED")}>
                          <CheckCircle2 className="size-4 text-accent" /> Approve
                        </DropdownMenuItem>
                      )}
                      {r.status !== "SUSPENDED" && (
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => updateStatus(r.id, "SUSPENDED")}
                        >
                          <XCircle className="size-4" /> Suspend
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No restaurants match your filters.
          </div>
        )}
      </Card>
    </div>
  );
}
