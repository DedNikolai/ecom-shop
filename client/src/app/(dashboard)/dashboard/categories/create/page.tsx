"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // якщо нема: npx shadcn@latest add textarea
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImagePickerDialog } from "@/components/images/ImagePickerDialog";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().trim().min(2, "Min 2 characters"),
  metaTitle: z.string().trim(),
  description: z.string().trim().min(5, "Min 5 characters"),
  metaDescription: z.string().trim(),
  photo: z.string().url().or(z.string().startsWith("/uploads/")), // дозволяємо абсолютний URL або шлях
  sortOrder: z.number().int().nonnegative(),
});
type Values = z.infer<typeof schema>;

export default function NewCategoryPage() {
  const create = useCreateCategory();
  const router = useRouter();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      metaTitle: "",
      description: "",
      metaDescription: "",
      photo: "",
      sortOrder: 0,
    },
    mode: "onChange",
  });

  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((v) =>
                create.mutate(v, {
                  onSuccess: () => router.push("/dashboard/categories"),
                })
              )}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="Category title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta title</FormLabel>
                    <FormControl><Input placeholder="(optional)" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea rows={4} placeholder="Short description…" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta description</FormLabel>
                    <FormControl><Textarea rows={3} placeholder="(optional)" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PHOTO */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <div className="flex gap-2">
                      <Input readOnly value={field.value ?? ""} placeholder="Choose or upload…" />
                      <ImagePickerDialog
                        scope="category"
                        value={field.value ?? ""}
                        onSelect={(url) => field.onChange(url)}
                        trigger={<Button type="button" variant="outline">Set photo</Button>}
                      />
                    </div>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={field.value ?? 0}
                        onChange={(e) =>
                          field.onChange(e.target.value === "" ? 0 : e.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="ml-auto flex gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={create.isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!form.formState.isValid || create.isPending}>
                  {create.isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
