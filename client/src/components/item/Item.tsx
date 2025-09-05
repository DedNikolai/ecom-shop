"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, XIcon, CheckIcon } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useUpdateItem } from "@/hooks/useUpdateItem";
import type { ItemsType } from "@/types/items";

// shadcn Card не має CardAction за замовчуванням — зробимо свою праворуч у заголовку
function CardAction({ children }: { children: React.ReactNode }) {
  return <div className="ml-auto flex items-center gap-2">{children}</div>;
}

const schema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  price: z.number().positive("Price shoul be > 0"),
});
type FormValues = z.infer<typeof schema>;

export function Item({ item }: { item: ItemsType }) {
  const [editing, setEditing] = useState(false);
  const update = useUpdateItem(item.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: item.title, price: item.price },
    mode: "onChange",
  });

  const onSubmit = (values: FormValues) => {
    update.mutate(values, {
      onSuccess: () => setEditing(false),
    });
  };

  const onCancel = () => {
    form.reset({ title: item.title, price: +item.price });
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center">
        {!editing ? (
          <>
            <CardTitle className="truncate">{item.title}</CardTitle>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit"
                onClick={() => setEditing(true)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </CardAction>
          </>
        ) : (
          <>
            <CardTitle className="truncate">Edit</CardTitle>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Скасувати"
                onClick={onCancel}
                disabled={update.isPending}
              >
                <XIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Зберегти"
                onClick={form.handleSubmit(onSubmit)}
                disabled={!form.formState.isValid || update.isPending}
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
            </CardAction>
          </>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {!editing ? (
          <div className="text-2xl font-semibold">{item.price} $</div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                     <Input
                        type="number"
                        step="0.01"
                        min="0"
                        // важливо: віддавати у RHF число
                        value={field.value ?? 0}
                        onChange={(e) =>
                            field.onChange(
                            e.target.value === "" ? "" : e.target.valueAsNumber
                            )
                        }
                     />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={!form.formState.isValid || update.isPending}>
                  {update.isPending ? "Saving..." : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} disabled={update.isPending}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
