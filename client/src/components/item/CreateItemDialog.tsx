// src/components/item/CreateItemDialog.tsx
"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateItem } from "@/hooks/items/useCreateItem";
import { Loader2 } from "lucide-react";
import styles from './itemdialog.module.css';

const schema = z.object({
  title: z.string('Title is required').trim().min(3, "At least 3 symbols"),
  // коерсія рядка з інпута в число
  price: z.number().positive("Price should be > 0"),
});
type Values = z.infer<typeof schema>;

export function CreateItemDialog() {
  const [open, setOpen] = useState(false);
  const create = useCreateItem();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", price: 0 },
    mode: "onChange",
  });

  const {formState: {errors}} = form;

  const onSubmit = (v: Values) => {
    create.mutate(v, {
      onSuccess: () => {
        form.reset({ title: "", price: 0 });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(o) => {
        if (!create.isPending) setOpen(o);
      }}
    >
      <DialogTrigger asChild>
        <Button className={styles.btn}>Create Item</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new item</DialogTitle>
          <DialogDescription>
            Insert Data and press Create
          </DialogDescription>
        </DialogHeader>
        {create.isPending ? (
          // ======= LOADING STATE =======
          <div className="flex items-center justify-center gap-3 py-10">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Creating item…</span>
          </div>
        ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="h-3">{errors.title ? <FormMessage /> : `Title`}</FormLabel>
                  <FormControl>
                    <Input placeholder="Item title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{errors.price ? <FormMessage /> : `Price $`}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={field.value ?? 0}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : e.target.valueAsNumber
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={create.isPending}>
                Cancel
              </Button>
              <Button className={styles.btn} type="submit" disabled={!form.formState.isValid || create.isPending}>
                {create.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
