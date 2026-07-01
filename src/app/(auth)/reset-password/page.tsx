"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    confirmNewPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ResetForm = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetForm>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    toast.success("Password reset! Please log in.");
    setTimeout(() => router.push("/login"), 2000);
  }

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-accent/10 mx-auto flex size-14 items-center justify-center rounded-full">
          <CheckCircle className="text-accent size-7" />
        </div>
        <h1 className="font-display text-2xl font-bold">Password reset!</h1>
        <p className="text-muted-foreground text-sm">
          Your password has been changed. Redirecting to login…
        </p>
        <Link
          href="/login"
          className="text-primary block text-sm font-medium hover:underline"
        >
          Go to login now
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl font-bold">Set new password</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Choose a strong password you haven&apos;t used before.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="rp-new">New password</Label>
          <div className="relative">
            <Input
              id="rp-new"
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 chars, uppercase, number, special"
              autoComplete="new-password"
              {...register("newPassword")}
              aria-invalid={!!errors.newPassword}
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-destructive text-xs">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rp-confirm">Confirm new password</Label>
          <Input
            id="rp-confirm"
            type="password"
            placeholder="Repeat new password"
            autoComplete="new-password"
            {...register("confirmNewPassword")}
            aria-invalid={!!errors.confirmNewPassword}
          />
          {errors.confirmNewPassword && (
            <p className="text-destructive text-xs">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </>
  );
}
