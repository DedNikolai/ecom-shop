"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import styles from './auth.module.css';
import { publicRoutes } from "../api/client.routes";
import Link from "next/link";

const schema = z.object({
  email: z.email('Email required'),
  password: z.string('Password required').min(6, 'To short'),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const {formState: {errors}} = form;

  const mutation = useAuth()

  const onSubmit = (values: Values) => mutation.mutate(values);

  return (
    <div className={styles.wrapper}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.title}>Login</h1>

          <FormField name="email" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.label}>{errors.password ? <FormMessage /> : 'Email'}</FormLabel>
              <FormControl><Input placeholder="you@mail.com" {...field} /></FormControl>
            </FormItem>
          )} />

          <FormField name="password" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.label}>{errors.password ? <FormMessage /> : 'Password'}</FormLabel>
              <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
            </FormItem>
          )} />

          <Button type="submit" disabled={mutation.isPending} className={styles.btn}>
            {mutation.isPending ? "Loading..." : "Submit"}
          </Button>

          <div className="mt-4 text-sm flex justify-between">
            <Link href={publicRoutes._REGISTER} className={styles.link_text}>
              Registration
            </Link>
            <Link href={publicRoutes._HOME} className={styles.link_text}>
              Home
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
