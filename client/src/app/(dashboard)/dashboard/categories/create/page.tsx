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
import { Box } from "lucide-react";

const schema = z.object({
  title: z.string().trim().min(2, "Min 2 characters"),
  metaTitle: z.string().trim(),
  description: z.string().trim().min(10, "Min 10 characters"),
  metaDescription: z.string().trim(),
  photo: z.string(),
  sortOrder: z.number().int().nonnegative(),
  url: z
    .string()
    .trim()
    .min(3, "URL is atleast 3 symbols")
    .regex(
      /^[a-z0-9-]+$/,
      "URL can only contain lowercase letters, numbers, and hyphens (no spaces or special characters)"
    )
  .optional(),
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
      url: ''
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
              
              {/* PHOTO */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field, fieldState }) => {
                  const value = field.value ?? "";

                  return (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>

                      {/* приховане поле, яке піде на сервер */}
                      <input type="hidden" name={field.name} value={value} onChange={field.onChange} />

                      {/* прев’ю */}
                      <div className="flex items-start gap-4">
                        <div className="relative h-32 w-32 overflow-hidden rounded-md border">
                          {value ?
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${value}`}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            /> 
                            :
                            <div className="w-full h-full flex justify-center items-center">
                              <Box size={100} strokeWidth={1}/>
                            </div>                   
                          }

                        </div>

                        <div className="flex flex-col gap-2">
                          <ImagePickerDialog
                            scope="category"
                            value={value}
                            onSelect={(path) => field.onChange(path)}
                            trigger={<Button type="button" variant="outline">Set photo</Button>}
                          />
                          {value && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => field.onChange("")}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>

                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  );
                }}
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
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta url</FormLabel>
                    <FormControl><Input placeholder="" {...field} /></FormControl>
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
