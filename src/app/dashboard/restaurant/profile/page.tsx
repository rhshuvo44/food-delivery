"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Store, MapPin, Clock, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  name: z.string().min(2, "Restaurant name is required"),
  description: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Valid phone number required"),
  street: z.string().min(5, "Street address required"),
  area: z.string().min(2, "Area required"),
  city: z.string().min(2, "City required"),
  // Keep as strings in the form (HTML inputs always give strings);
  // convert to numbers in the submit handler.
  minOrderAmount: z.string().min(1),
  deliveryFee: z.string().min(1),
  avgPrepTimeMin: z.string().min(1),
});

type ProfileForm = z.infer<typeof schema>;

const CUISINE_OPTIONS = ["Bengali","Indian","Biryani","Chinese","Italian","Fast Food","Healthy","Desserts"];

export default function RestaurantProfilePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Spice Garden",
      description: "Authentic Bengali & Indian cuisine since 2015.",
      email: "contact@spicegarden.com",
      phone: "+8802000000001",
      street: "House 12, Road 5",
      area: "Gulshan",
      city: "Dhaka",
      minOrderAmount: "200",
      deliveryFee: "40",
      avgPrepTimeMin: "25",
    },
  });

  async function onSubmit(data: ProfileForm) {
    await new Promise((r) => setTimeout(r, 800));
    const payload = {
      ...data,
      minOrderAmount: Number(data.minOrderAmount),
      deliveryFee: Number(data.deliveryFee),
      avgPrepTimeMin: Number(data.avgPrepTimeMin),
    };
    console.log(payload);
    toast.success("Restaurant profile updated");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Restaurant Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This information is shown to customers on your restaurant page
        </p>
      </div>

      {/* Status card */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Store className="size-5 text-accent" />
            <div>
              <p className="font-semibold text-sm">Spice Garden</p>
              <p className="text-xs text-muted-foreground">Gulshan, Dhaka · Approved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">Open</Badge>
            <Badge variant="outline">4.6 ★</Badge>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic information</CardTitle>
            <CardDescription>Name, description, and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="rp-name">Restaurant name</Label>
              <Input id="rp-name" {...register("name")} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rp-desc">Description</Label>
              <textarea
                id="rp-desc"
                {...register("description")}
                rows={3}
                className="w-full rounded-xl border-2 border-input bg-card px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none resize-none"
                placeholder="Tell customers what makes your restaurant special..."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="rp-email"><Mail className="inline size-3.5 mr-1" />Email</Label>
                <Input id="rp-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rp-phone"><Phone className="inline size-3.5 mr-1" />Phone</Label>
                <Input id="rp-phone" {...register("phone")} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle><MapPin className="inline size-4 mr-1.5 mb-0.5" />Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="rp-street">Street address</Label>
              <Input id="rp-street" {...register("street")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="rp-area">Area</Label>
                <Input id="rp-area" {...register("area")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rp-city">City</Label>
                <Input id="rp-city" {...register("city")} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery settings */}
        <Card>
          <CardHeader>
            <CardTitle><Clock className="inline size-4 mr-1.5 mb-0.5" />Delivery settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="rp-min-order">Min order (৳)</Label>
              <Input id="rp-min-order" type="number" {...register("minOrderAmount")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rp-del-fee">Delivery fee (৳)</Label>
              <Input id="rp-del-fee" type="number" {...register("deliveryFee")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rp-prep">Avg prep time (min)</Label>
              <Input id="rp-prep" type="number" {...register("avgPrepTimeMin")} />
            </div>
          </CardContent>
        </Card>

        {/* Cuisine tags */}
        <Card>
          <CardHeader>
            <CardTitle>Cuisine tags</CardTitle>
            <CardDescription>Select all that apply to your menu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {CUISINE_OPTIONS.map((c) => {
                const active = ["Bengali","Indian","Biryani"].includes(c);
                return (
                  <button key={c} type="button"
                    className={`rounded-full border-2 px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      active ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"
                    }`}>
                    {c}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Separator />
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
