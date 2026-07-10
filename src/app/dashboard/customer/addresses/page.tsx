"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Home, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/common/EmptyState";
import { toast } from "sonner";

interface Address {
  id: string;
  label: "Home" | "Office" | "Other";
  street: string;
  area: string;
  city: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "a1",
    label: "Home",
    street: "House 25, Road 11",
    area: "Banani",
    city: "Dhaka",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Office",
    street: "Level 4, Navana Tower, Road 3",
    area: "Gulshan",
    city: "Dhaka",
    isDefault: false,
  },
];

const LABEL_ICONS: Record<string, React.ElementType> = {
  Home: Home,
  Office: Briefcase,
  Other: MapPin,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState({ label: "Home", street: "", area: "", city: "Dhaka" });

  function openAdd() {
    setEditing(null);
    setForm({ label: "Home", street: "", area: "", city: "Dhaka" });
    setDialogOpen(true);
  }

  function openEdit(addr: Address) {
    setEditing(addr);
    setForm({ label: addr.label, street: addr.street, area: addr.area, city: addr.city });
    setDialogOpen(true);
  }

  function handleSave() {
    if (!form.street.trim() || !form.area.trim()) {
      toast.error("Street and area are required");
      return;
    }
    if (editing) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editing.id ? { ...a, ...form, label: form.label as Address["label"] } : a,
        ),
      );
      toast.success("Address updated");
    } else {
      setAddresses((prev) => [
        ...prev,
        {
          id: `a${Date.now()}`,
          label: form.label as Address["label"],
          street: form.street,
          area: form.area,
          city: form.city,
          isDefault: prev.length === 0,
        },
      ]);
      toast.success("Address added");
    }
    setDialogOpen(false);
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Addresses</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your delivery locations
          </p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="size-4" /> Add address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No addresses saved"
          description="Add a delivery address to speed up checkout."
          action={
            <Button size="sm" onClick={openAdd}>
              <Plus className="size-4" /> Add address
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => {
            const Icon = LABEL_ICONS[addr.label] ?? MapPin;
            return (
              <Card
                key={addr.id}
                className={addr.isDefault ? "border-primary/40 bg-primary/5" : ""}
              >
                <CardContent className="flex items-start gap-4 py-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{addr.label}</p>
                      {addr.isDefault && (
                        <Badge variant="default" className="text-[10px] px-2 py-0">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {addr.street}, {addr.area}, {addr.city}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {!addr.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleSetDefault(addr.id)}
                        >
                          Set as default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => openEdit(addr)}
                      >
                        <Pencil className="size-3" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive hover:text-destructive"
                        onClick={() => handleDelete(addr.id)}
                      >
                        <Trash2 className="size-3" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit address" : "Add new address"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Label selector */}
            <div className="space-y-1.5">
              <Label>Label</Label>
              <div className="flex gap-2">
                {["Home", "Office", "Other"].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, label: l }))}
                    className={`flex-1 rounded-xl border-2 py-2 text-sm font-medium transition-colors ${
                      form.label === l
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="addr-street">Street / House / Road</Label>
              <Input
                id="addr-street"
                placeholder="House 25, Road 11"
                value={form.street}
                onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="addr-area">Area / Thana</Label>
                <Input
                  id="addr-area"
                  placeholder="Banani"
                  value={form.area}
                  onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="addr-city">City</Label>
                <Input
                  id="addr-city"
                  placeholder="Dhaka"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editing ? "Save changes" : "Add address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
