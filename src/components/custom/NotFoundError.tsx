"use client";
import Error from "next/error";

export function NotFoundError() {
  return <Error statusCode={404} />;
}
