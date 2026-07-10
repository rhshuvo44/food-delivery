"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^\+?01[3-9]\d{8}$/, "Enter a valid BD mobile number")
    .optional()
    .or(z.literal("")),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Rafiq Ahmed",
      email: "customer@forkly.com",
      phone: "01700000002",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  async function onProfileSubmit(data: ProfileForm) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("profile update", data);
    toast.success("Profile updated successfully");
  }

  async function onPasswordSubmit(data: PasswordForm) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("password change", data);
    passwordForm.reset();
    toast.success("Password changed successfully");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      {/* Avatar */}
      <Card>
        <CardContent className="flex items-center gap-5 py-5">
          <div className="relative">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                RA
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              aria-label="Change avatar"
            >
              <Camera className="size-3.5" />
            </button>
          </div>
          <div>
            <p className="font-display text-lg font-bold">Rafiq Ahmed</p>
            <p className="text-sm text-muted-foreground">Customer since June 2026</p>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <User className="size-3" /> 5 orders placed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personal info form */}
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Update your name, email, and phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="pf-name">Full name</Label>
                <Input
                  id="pf-name"
                  {...profileForm.register("name")}
                  aria-invalid={!!profileForm.formState.errors.name}
                />
                {profileForm.formState.errors.name && (
                  <p className="text-xs text-destructive">
                    {profileForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pf-phone">Phone number</Label>
                <Input
                  id="pf-phone"
                  type="tel"
                  {...profileForm.register("phone")}
                  aria-invalid={!!profileForm.formState.errors.phone}
                />
                {profileForm.formState.errors.phone && (
                  <p className="text-xs text-destructive">
                    {profileForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="pf-email">Email address</Label>
                <Input
                  id="pf-email"
                  type="email"
                  {...profileForm.register("email")}
                  aria-invalid={!!profileForm.formState.errors.email}
                />
                {profileForm.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {profileForm.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={profileForm.formState.isSubmitting}
              >
                {profileForm.formState.isSubmitting
                  ? "Saving…"
                  : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>
            Choose a strong password you haven&apos;t used before
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="pw-current">Current password</Label>
              <Input
                id="pw-current"
                type="password"
                autoComplete="current-password"
                {...passwordForm.register("currentPassword")}
                aria-invalid={!!passwordForm.formState.errors.currentPassword}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-xs text-destructive">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="pw-new">New password</Label>
                <Input
                  id="pw-new"
                  type="password"
                  autoComplete="new-password"
                  {...passwordForm.register("newPassword")}
                  aria-invalid={!!passwordForm.formState.errors.newPassword}
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-xs text-destructive">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw-confirm">Confirm new password</Label>
                <Input
                  id="pw-confirm"
                  type="password"
                  autoComplete="new-password"
                  {...passwordForm.register("confirmPassword")}
                  aria-invalid={!!passwordForm.formState.errors.confirmPassword}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outline"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting
                  ? "Changing…"
                  : "Change password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
