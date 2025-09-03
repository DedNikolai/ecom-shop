"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import styles from './auth.module.css';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useAuth()

  const onSubmit = (values: Values) => mutation.mutate(values);

  return (
    <div className={styles.wrapper}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.title}>Вхід</h1>

          <FormField name="email" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="you@mail.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="password" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Входимо..." : "Увійти"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
