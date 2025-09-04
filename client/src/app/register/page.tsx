"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import styles from './register.module.css';
import Link from "next/link";
import { publicRoutes } from "@/app/api/client.routes";
import { useRegister } from "@/hooks/useRegister";

const schema = z.object({
  email: z.email('Email required'),
  password: z.string().min(6, 'To short'),
  firstName: z.string().min(2, 'To Short'),
  lastName: z.string().min(2, 'To Short'),
  phone: z.string().nullable(),
});
type Values = z.infer<typeof schema>;

export default function Register() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useRegister()

  const onSubmit = (values: Values) => mutation.mutate(values);

  return (
    <div className={styles.wrapper}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.title}>Register</h1>

          <FormField name="email" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input placeholder="you@mail.com" {...field} /></FormControl>
              <div className={styles.error}>
                <FormMessage />
              </div>
            </FormItem>
          )} />

          <FormField name="password" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
              <div className={styles.error}>
                <FormMessage />
              </div>
            </FormItem>
          )} />

          <FormField name="firstName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl><Input type="text" placeholder="FirstName" {...field} /></FormControl>
              <div className={styles.error}>
                <FormMessage />
              </div>
            </FormItem>
          )} />          
          <FormField name="lastName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl><Input type="text" placeholder="lastName" {...field} /></FormControl>
              <div className={styles.error}>
                <FormMessage />
              </div>
            </FormItem>
          )} />  
          <Button type="submit" disabled={mutation.isPending} className={styles.btn}>
            {mutation.isPending ? "Входимо..." : "Увійти"}
          </Button>

          <div className="mt-4 text-sm flex justify-between">
            <Link href={publicRoutes._LOGIN} className={styles.link_text}>
              Login
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
