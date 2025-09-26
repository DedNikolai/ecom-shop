"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  initialQuery?: string;
  initialCategoryId?: string | null;
  categories: { id: string; title: string }[] | undefined;
  onChange: (v: { query: string; categoryId: string | null }) => void;
};

export function ProductsFilters({ initialQuery = "", initialCategoryId = null, categories, onChange }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId);

  useEffect(() => {
    const t = setTimeout(() => onChange({ query, categoryId }), 400);
    return () => clearTimeout(t);
  }, [query, categoryId, onChange]);

  const cats = categories ?? [];

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Input
        placeholder="Search by name…"
        className="sm:w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Select
        value={categoryId ?? "all"}
        onValueChange={(v) => setCategoryId(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-56">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {cats.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
