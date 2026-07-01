"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .regex(/^\+?01[3-9]\d{8}$/, "Enter a valid BD mobile number")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
    role: z.enum(["CUSTOMER", "RESTAURANT"]),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"CUSTOMER" | "RESTAURANT">("CUSTOMER");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CUSTOMER" },
  });

  async function onSubmit(data: RegisterForm) {
    await new Promise((r) => setTimeout(r, 900));
    console.log("register", data);
    toast.success(
      data.role === "RESTAURANT"
        ? "Account created! Your restaurant is pending approval."
        : "Account created! Please log in.",
    );
    router.push("/login");
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Join Forkly and start ordering
        </p>
      </div>

      {/* Role selector */}
      <div className="border-border mb-5 grid grid-cols-2 gap-2 rounded-xl border p-1">
        {(["CUSTOMER", "RESTAURANT"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`rounded-lg py-2 text-sm font-medium transition-colors ${
              role === r
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {r === "CUSTOMER" ? "Customer" : "Restaurant Owner"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" value={role} {...register("role")} />

        <div className="space-y-1.5">
          <Label htmlFor="reg-name">Full name</Label>
          <Input
            id="reg-name"
            placeholder="Rafiq Ahmed"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
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

        <div className="space-y-1.5">
          <Label htmlFor="reg-phone">
            Phone number{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Input
            id="reg-phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-destructive text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-password">Password</Label>
          <div className="relative">
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 chars, uppercase + number"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={!!errors.password}
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reg-confirm">Confirm password</Label>
          <Input
            id="reg-confirm"
            type="password"
            placeholder="Repeat password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-xs">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}
