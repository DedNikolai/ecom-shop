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
import { useRouter } from "next/navigation";
import { Box } from "lucide-react";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { useCategories } from "@/hooks/categories/useCategories";
import { MultiSelectCategories } from "@/components/category/MultiSelectCategories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { protectedRoutes } from "@/app/api/client.routes";

const schema = z.object({
  title: z.string().trim().min(2, "Min 2 characters"),
  metaTitle: z.string().trim(),
  description: z.string().trim().min(10, "Min 10 characters"),
  metaDescription: z.string().trim(),
  mainPhoto: z.string(),
  price: z.number().int().nonnegative(),
  inStock: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  photos: z.array(z.string()).optional(),
  categories: z.array(z.string())
});

const MAX = 10;

type Values = z.infer<typeof schema>;

export default function NewCategoryPage() {
  const create = useCreateProduct();
  const router = useRouter();
  const categories = useCategories();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      categories: [],
      metaTitle: "",
      description: "",
      metaDescription: "",
      sortOrder: 0,
      inStock: true
    },
    mode: "onChange",
  });

  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                // console.log(data)
                create.mutate(data, {
                  onSuccess: () => router.push(protectedRoutes._PRODUCTS),
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
                name="mainPhoto"
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
                            scope="products"
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

            {/* PHOTOS (multi) */}
            <FormField
              control={form.control}
              name="photos"
              render={({ field, fieldState }) => {
                const value = field.value ?? [];
                
                const addPhoto = (path: string) => {
                  // не дублюємо, якщо вже є
                  if (!value.includes(path)) {
                    if (value.length >= MAX) return
                    field.onChange([...value, path]);
                  }
                };

                const removeAt = (idx: number) => {
                  const next = value.slice();
                  next.splice(idx, 1);
                  field.onChange(next);
                };

                return (
                  <FormItem>
                    <FormLabel>Photos</FormLabel>

                    {/* Грід прев’ю */}
                    {value.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {value.map((src, i) => (
                          <div key={src} className="relative aspect-square overflow-hidden rounded-md border">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${src}`}
                              alt={`Photo ${i + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeAt(i)}
                              className="absolute right-1 top-1 rounded bg-black/60 px-2 py-1 text-xs text-white hover:bg-black/80"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-md border text-sm text-muted-foreground">
                        No photos yet
                      </div>
                    )}

                    {/* Кнопка додавання через діалог */}
                    <div className="mt-3">
                      <ImagePickerDialog
                        scope="products"
                        // value тут не обов’язковий для мульти; можна не підсвічувати
                        onSelect={addPhoto}
                        trigger={<Button type="button" variant="outline">Add photo</Button>}
                      />
                    </div>

                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />


            <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                    <MultiSelectCategories
                        value={field.value.length ? field.value : []}
                        onChange={field.onChange}
                        options={(categories.data ?? [])}
                        disabled={categories.isLoading}
                        placeholder="Choose categories"
                    />
                    </FormControl>
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
                    <FormControl><Input placeholder="" {...field} /></FormControl>
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
                    <FormControl><Textarea rows={3} placeholder="" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
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
                name="inStock"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <Select 
                            value={String(field.value)}             
                            onValueChange={(v) => field.onChange(v === "true")}
                            
                        >
                            <FormControl>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select Stock" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value={'true'}>In Stock</SelectItem>
                                <SelectItem value={'false'}>Out Of Stock</SelectItem>
                            </SelectContent>
                        </Select>
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
