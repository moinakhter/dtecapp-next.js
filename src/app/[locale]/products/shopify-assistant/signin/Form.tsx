"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import { Link, useRouter } from "@/i18n/navigation";
import TextGradientWhite from "@/components/common/text-gradient-white";
import React, { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(7, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

const SigninForm = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/validate", {
        credentials: "include",
      });
      const result = await response.json();

      if (result.authenticated) {
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // React Query Mutation
  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
        localStorage.setItem("accessToken", data.raw_token); 
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      alert(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="relative z-10 flex flex-col w-full mx-auto max-w-[416px] md:w-1/2">
      <TextGradientWhite
        text="Login"
        className="lg:text-[32px] font-bold mb-8"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-secondary hover:bg-blue-600 text-white"
          disabled={loginMutation.status === "pending"}
        >
          {loginMutation.status === "pending" ? "Logging in..." : "Login"}
        </Button>
      </form>

      {loginMutation.status === "error" && (
        <p className="text-red-500 text-center mt-4">
          {(loginMutation.error as Error)?.message}
        </p>
      )}

      <Link
        href="/products/shopify-assistant/create"
        className={buttonVariants({
          variant: "outline",
          className: "w-full mt-4 text-center bg-transparent border-secondary",
        })}
      >
        Don&apos;t have an account?
      </Link>
    </div>
  );
};

export default SigninForm;
