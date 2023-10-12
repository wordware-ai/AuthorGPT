"use client";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryParams<T>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";
    // replace since we don't want to build a history
    router.replace(`${pathname}${query}`, { scroll: false });
  }

  return { queryParams: searchParams, setQueryParams };
}

export const useQueryState = (queryKey: string): [string | null, (value: string) => void] => {
  const { queryParams, setQueryParams } = useQueryParams();
  let queryValue = queryParams.get(queryKey);
  const [localState, setLocalState] = useState(queryValue);

  const setValue = useCallback(
    (value: string) => {
      setLocalState(value);
      setQueryParams({ [queryKey]: value });
    },
    [queryKey, setQueryParams],
  );

  return [localState, setValue];
};
