"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-accent/10 mx-auto flex size-14 items-center justify-center rounded-full">
          <Mail className="text-accent size-7" />
        </div>
        <h1 className="font-display text-2xl font-bold">Check your inbox</h1>
        <p className="text-muted-foreground text-sm">
          We&apos;ve sent a password reset link to <strong>{getValues("email")}</strong>.
          It expires in 15 minutes.
        </p>
        <p className="text-muted-foreground text-xs">
          Didn&apos;t get it? Check spam or{" "}
          <button onClick={() => setSent(false)} className="text-primary hover:underline">
            try again
          </button>
          .
        </p>
        <Link
          href="/login"
          className="text-primary block text-sm font-medium hover:underline"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl font-bold">Forgot password?</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="fp-email">Email</Label>
          <Input
            id="fp-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Back to login
        </Link>
      </p>
    </>
  );
}
