"use client";

import { Inbox, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground mt-1">
          Internal reference — every reusable primitive in one place.
        </p>
      </div>

      <Section title="Breadcrumb">
        <Breadcrumb
          items={[
            { label: "Restaurants", href: "/restaurants" },
            { label: "Spice Garden" },
          ]}
        />
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Cart">
            <ShoppingCart />
          </Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">In Stock</Badge>
          <Badge variant="warning">20% OFF</Badge>
          <Badge variant="destructive">Out of Stock</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-sm gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="ds-email">Email</Label>
            <Input id="ds-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-disabled">Disabled</Label>
            <Input id="ds-disabled" disabled placeholder="Can't touch this" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ds-error">With error</Label>
            <Input id="ds-error" aria-invalid placeholder="Invalid value" />
            <p className="text-destructive text-xs">This field is required.</p>
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Chicken Biryani</CardTitle>
              <CardDescription>Spice Garden · ৳250</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Fragrant basmati rice cooked with tender chicken and spices.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                Add to cart
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order #ORD-2026-0142</CardTitle>
              <CardDescription>Delivered · Jun 28, 2026</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">3 items</span>
              <Badge variant="success">Delivered</Badge>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Avatar">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section title="Table">
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#ORD-0142</TableCell>
                <TableCell>Rafiq Ahmed</TableCell>
                <TableCell>
                  <Badge variant="success">Delivered</Badge>
                </TableCell>
                <TableCell className="text-right">৳295</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#ORD-0143</TableCell>
                <TableCell>Karim Hossain</TableCell>
                <TableCell>
                  <Badge variant="warning">Preparing</Badge>
                </TableCell>
                <TableCell className="text-right">৳540</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Section>

      <Section title="Dialog & Drawer">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel this order?</DialogTitle>
                <DialogDescription>
                  This action can&apos;t be undone. The restaurant will be notified
                  immediately.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Keep order</Button>
                <Button variant="destructive">Cancel order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter restaurants</DrawerTitle>
                <DrawerDescription>
                  Narrow down by cuisine, rating, and delivery time.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Apply filters</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </Section>

      <Section title="Loading Skeleton">
        <div className="grid max-w-sm gap-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Section>

      <Section title="Empty State">
        <EmptyState
          icon={Inbox}
          title="Your wishlist is empty"
          description="Save your favorite dishes here to order them again easily."
          action={<Button size="sm">Browse restaurants</Button>}
        />
      </Section>

      <Section title="Error State">
        <ErrorState onRetry={() => alert("retry clicked")} />
      </Section>

      <Separator />

      <p className="text-muted-foreground pb-10 text-center text-xs">
        End of design system reference.
      </p>
    </div>
  );
}
