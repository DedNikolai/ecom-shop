"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// якщо вже маєш свої шад-сн компоненти — заміни на них
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { api } from "@/lib/axios";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";

  const qc = useQueryClient();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: Values) => {
      // бекенд ставить HttpOnly cookies
      await api.post("/auth/login", values);
    },
    onSuccess: async () => {
      // оновити стан сесії
      await qc.invalidateQueries({ queryKey: ["me"] });
      router.replace(next); // повертаємось туди, куди не пустило, або "/" 
    },
    // (опційно) onError: (e) => toast/error UI
  });

  const onSubmit = (values: Values) => loginMutation.mutate(values);

  return (
    <div className="grid place-items-center min-h-[60dvh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm w-full mx-auto p-6 border rounded-2xl shadow grid gap-4 bg-white">
          <h1 className="text-xl font-semibold">Вхід</h1>

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

          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Входимо..." : "Увійти"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
