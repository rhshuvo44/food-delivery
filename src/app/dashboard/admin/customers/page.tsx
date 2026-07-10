"use client";

import { useState } from "react";
import { Search, MoreHorizontal, UserX, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

const MOCK_CUSTOMERS = [
  { id: "c1", name: "Rafiq Ahmed",   email: "rafiq@example.com",  phone: "01700000002", orders: 12, spent: "৳3,540", joined: "2026-01-15", active: true  },
  { id: "c2", name: "Sumaiya Tahsin",email: "sumaiya@example.com",phone: "01700000010", orders: 8,  spent: "৳2,180", joined: "2026-02-08", active: true  },
  { id: "c3", name: "Arif Mahmud",   email: "arif@example.com",   phone: "01700000011", orders: 3,  spent: "৳780",   joined: "2026-04-22", active: false },
  { id: "c4", name: "Nasrin Akter",  email: "nasrin@example.com", phone: "01700000012", orders: 21, spent: "৳6,250", joined: "2025-11-10", active: true  },
  { id: "c5", name: "Kamal Hossain", email: "kamal@example.com",  phone: "01700000013", orders: 0,  spent: "৳0",     joined: "2026-06-30", active: true  },
];

export default function AdminCustomersPage() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const debouncedQuery = useDebounce(query, 300);

  const filtered = customers.filter((c) =>
    !debouncedQuery ||
    c.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  function toggleActive(id: string) {
    setCustomers((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));
    const c = customers.find((c) => c.id === id);
    toast.success(`${c?.name} ${c?.active ? "suspended" : "reactivated"}`);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">{customers.length} registered customers</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total",       value: customers.length },
          { label: "Active",      value: customers.filter((c) => c.active).length },
          { label: "New (30d)",   value: 340 },
          { label: "Suspended",   value: customers.filter((c) => !c.active).length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search customers…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id} className={!c.active ? "opacity-60" : ""}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs bg-secondary font-semibold">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{c.phone}</TableCell>
                <TableCell>
                  <Badge variant={c.active ? "success" : "secondary"} className="text-xs">
                    {c.active ? "Active" : "Suspended"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm">{c.orders}</TableCell>
                <TableCell className="text-right text-sm font-semibold text-primary">{c.spent}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(c.joined).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "2-digit" })}
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
                        <Mail className="size-4" /> Send email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => toggleActive(c.id)}
                      >
                        <UserX className="size-4" />
                        {c.active ? "Suspend account" : "Reactivate account"}
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
