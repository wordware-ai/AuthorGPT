"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { z } from "zod";

const EmailSchema = z.string().email();

export const CollectEmailAndPayment: React.FC<{
  genre: string;
  prompt: string;
  style: string;
  title: string;
  outline: string;
  chapters: string;
}> = ({ genre, prompt, style, title, outline, chapters }) => {
  const [bookId, setBookId] = useState(undefined);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function saveOutline() {
    // Save the book outline with
    setLoading(true);
    setError("");
    // Validate email
    try {
      EmailSchema.parse(email.trim());
    } catch (e) {
      console.log("Error validating email", email, e);
      setError("Please provide a valid email");
      setLoading(false);
      return;
    }
    try {
      const r = await axios.post("/api/save", {
        bookData: {
          genre,
          prompt,
          style,
          title,
          outline,
          chapters,
        },
        email: email.trim(),
      });

      console.log("Got response", r.data);
      setBookId(r.data.id);
    } catch (e) {
      console.error("Error saving", e);
      setError("Something went wrong, try again");
    }

    setLoading(false);
  }

  // @ts-ignore
  return (
    <div className="mt-10">
      {!bookId ? (
        <>
          <div className="space-y-2">
            <p className="text-2xl font-bold">Last step</p>
            <p>Your story is wonderful!</p>
            <p>Enter your email address below and we&apos;ll email you when it&apos;s ready</p>
          </div>
          <div className="my-4">
            <Input
              type="email"
              className="max-w-md"
              placeholder="ernest@hemingway.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          <Button disabled={loading} onClick={saveOutline}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Make my book"
            )}
          </Button>
        </>
      ) : (
        <div>
          <script async src="https://js.stripe.com/v3/buy-button.js"></script>

          {/* @ts-ignore */}
          <stripe-buy-button
            buy-button-id="buy_btn_1O26SvAEou4Hi9XdVDAstiLp"
            customer-email={email}
            client-reference-id={bookId}
            publishable-key="pk_live_51JhXqhAEou4Hi9XdKKChziYTtMXf9eF00LwVWmN3lFexMMwdFUH6UtvOWmE4Dw5WbDkFnj1lawp4oDJAEx70Od5K00BV17ya5I"
          />
        </div>
      )}
    </div>
  );
};
