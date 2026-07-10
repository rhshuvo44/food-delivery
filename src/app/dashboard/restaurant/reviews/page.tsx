"use client";

import { useState } from "react";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { toast } from "sonner";

const MOCK_REVIEWS = [
  { id: "rev1", customerName: "Rafiq Ahmed", rating: 5, comment: "Absolutely amazing biryani! Rich flavours and generous portions. Will definitely order again.", foodName: "Chicken Biryani", date: "2026-06-28", helpful: 12, replied: false },
  { id: "rev2", customerName: "Karim H.",    rating: 4, comment: "Really good food, arrived hot. Slightly late but worth the wait.", foodName: null,          date: "2026-06-25", helpful: 7,  replied: true,  reply: "Thank you Karim! We're working on improving delivery times." },
  { id: "rev3", customerName: "Sumaiya T.",  rating: 5, comment: "The kacchi is absolutely on another level. This is my go-to place now.", foodName: "Mutton Kacchi", date: "2026-06-20", helpful: 21, replied: false },
  { id: "rev4", customerName: "Arif M.",     rating: 3, comment: "Food was good but packaging could be better — the rice was a bit soggy.", foodName: null,          date: "2026-06-18", helpful: 3,  replied: false },
];

const avgRating = (MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1);

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} className={`size-4 ${s <= rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

export default function RestaurantReviewsPage() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  function handleReply() {
    if (!replyText.trim()) { toast.error("Reply cannot be empty"); return; }
    setReplyingTo(null);
    setReplyText("");
    toast.success("Reply posted");
  }

  const ratingDistribution = [5,4,3,2,1].map((r) => ({
    rating: r,
    count: MOCK_REVIEWS.filter((rev) => rev.rating === r).length,
    pct: Math.round((MOCK_REVIEWS.filter((rev) => rev.rating === r).length / MOCK_REVIEWS.length) * 100),
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold tracking-tight">Reviews</h1>

      {/* Rating summary */}
      <Card>
        <CardContent className="flex flex-col sm:flex-row items-start gap-6 py-5">
          <div className="text-center sm:border-r sm:border-border sm:pr-6 sm:min-w-[120px]">
            <p className="font-display text-5xl font-black text-primary">{avgRating}</p>
            <StarRow rating={Math.round(parseFloat(avgRating))} />
            <p className="text-xs text-muted-foreground mt-1">{MOCK_REVIEWS.length} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-1.5">
            {ratingDistribution.map(({ rating, count, pct }) => (
              <div key={rating} className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-0.5 w-8 shrink-0">
                  {rating}<Star className="size-3 fill-warning text-warning" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-warning" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-right text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review list */}
      <div className="space-y-4">
        {MOCK_REVIEWS.map((review) => (
          <Card key={review.id}>
            <CardContent className="py-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs font-semibold bg-secondary">
                      {review.customerName.split(" ").map((n) => n[0]).join("").slice(0,2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{review.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRow rating={review.rating} />
                  {review.foodName && <Badge variant="outline" className="text-xs">{review.foodName}</Badge>}
                </div>
              </div>

              <p className="text-sm text-foreground">{review.comment}</p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="size-3" /> {review.helpful} helpful
                </span>
                {review.replied && (
                  <Badge variant="success" className="text-[10px]">Replied</Badge>
                )}
              </div>

              {/* Existing reply */}
              {review.replied && (review as typeof review & { reply?: string }).reply && (
                <div className="rounded-xl bg-secondary/50 px-4 py-3 text-sm border-l-2 border-primary">
                  <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                    <MessageSquare className="size-3" /> Your reply
                  </p>
                  <p className="text-muted-foreground">{(review as typeof review & { reply?: string }).reply}</p>
                </div>
              )}

              {/* Reply input */}
              {!review.replied && (
                <>
                  {replyingTo === review.id ? (
                    <div className="space-y-2">
                      <textarea
                        className="w-full rounded-xl border-2 border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none resize-none"
                        rows={3}
                        placeholder="Write a professional, friendly reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                        <Button size="sm" onClick={() => handleReply()}>Post reply</Button>
                      </div>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setReplyingTo(review.id)}>
                      <MessageSquare className="size-3.5" /> Reply to review
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
