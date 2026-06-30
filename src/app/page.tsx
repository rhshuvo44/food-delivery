import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Food Delivery — Project Setup Complete
        </h1>
        <p className="text-muted-foreground">
          Phase 1 scaffold is live: Next.js 15, TypeScript, Tailwind v4, Redux Toolkit +
          RTK Query, Axios, shadcn primitives.
        </p>
      </div>
      <div className="flex gap-3">
        <Button>Primary Action</Button>
        <Button variant="outline">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </main>
  );
}
