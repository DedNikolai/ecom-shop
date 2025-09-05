"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import styles from './register.module.css';
import Link from "next/link";
import { publicRoutes } from "@/app/api/client.routes";
import { useRegister } from "@/hooks/useRegister";

const schema = z.object({
  email: z.email('Email required'),
  password: z.string('Password is required').min(6, 'Password To short'),
  firstName: z.string('FirstName is required').min(2, 'FirstName To Short'),
  lastName: z.string('LastName is required').min(2, 'LastName To Short'),
  phone: z.string('Phone is required'),
});
type Values = z.infer<typeof schema>;

export default function Register() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", phone: '', firstName: '', lastName: '' },
  });

  const {formState: {errors}} = form;
  const mutation = useRegister()

  const onSubmit = (values: Values) => mutation.mutate(values);

  return (
    <div className={styles.wrapper}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.title}>Register</h1>

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

          <FormField name="firstName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.label}>{errors.password ? <FormMessage /> : 'FirstName'}</FormLabel>
              <FormControl><Input type="text" placeholder="FirstName" {...field} /></FormControl>
            </FormItem>
          )} />          
          <FormField name="lastName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.label}>{errors.password ? <FormMessage /> : 'LastName'}</FormLabel>
              <FormControl><Input type="text" placeholder="lastName" {...field} /></FormControl>
            </FormItem>
          )} />  
          <FormField name="phone" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel className={styles.label}>{errors.phone ? <FormMessage /> : 'Phone'}</FormLabel>
              <FormControl><Input type="text" placeholder="phone" {...field} /></FormControl>
            </FormItem>
          )} />  
          <Button type="submit" disabled={mutation.isPending} className={styles.btn}>
            {mutation.isPending ? "Loading..." : "Submit"}
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
