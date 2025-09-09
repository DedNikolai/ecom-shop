"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { useSession } from "@/hooks/useSession";
import { UpdateUserType } from "@/types/user";
import { useEffect } from "react";
import styles from './profile.module.css';

const schema = z.object({
  email: z.email('Email required'),  
  firstName: z.string().trim().min(1, "Required"),
  lastName: z.string().trim().min(1, "Required"),
  phone: z.string('Phone required')
});

export default function Profile() {
  const { data: profile, isLoading, isFetching } = useSession();
  const update = useUpdateProfile();

  const form = useForm<UpdateUserType>({
    resolver: zodResolver(schema),
    defaultValues: {
        firstName: profile?.firstName ?? "",
        lastName:  profile?.lastName  ?? "",
        phone:     profile?.phone     ?? "", 
        email: profile?.email || ''
      },
    mode: "onChange",
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        email:     profile.email ?? "",
        firstName: profile.firstName ?? "",
        lastName:  profile.lastName ?? "",
        phone:     profile.phone ?? "",
      });
    }
  }, [profile, form]);


  if (!profile && (isLoading || isFetching)) return <ProfileSkeleton />;

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((v) =>
                update.mutate(v, {
                  onSuccess: () => {
                    // опціонально — тост/повідомлення
                  },
                })
              )}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="FirstName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="LastName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+380..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button className={styles.btn} type="submit" disabled={!form.formState.isValid || update.isPending}>
                  {update.isPending ? "Saving..." : "Save changes"}
                </Button>
                <Button type="button" variant="outline" disabled={update.isPending} onClick={() => form.reset()}>
                  Reset
                </Button>
                {isFetching && <span className="text-sm text-muted-foreground ml-auto">Refreshing…</span>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
