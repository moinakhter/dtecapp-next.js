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
import { toast } from "sonner"
import { useTranslations } from "next-intl";




const SigninForm = () => {
  const t= useTranslations("Forms");
  const formSchema = z
  .object({
    firstName: z.string().min(1, t("fnreq")),
    lastName: z.string().min(1, t("lnreq")),
    storeUrl: z.string().url(t("invalidUrl")),
    companyName: z.string().min(1, t("cnreq")),
    email: z.string().email(t("invalidEmail")),
    password: z
      .string()
      .min(8, t("passwordMinLength"))
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        t("passwordComplexity")
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("passwordsDontMatch"),
    path: ["confirmPassword"],
  });
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

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
  const registerMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || t("regfaild"));
      }
     
      return response.json();
    },
    onSuccess: async () => {
      toast(t("registrationSuccessMessage")
        ,{
          className: "bg-green-500 text-white",
        }
    );

    },
  });

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="relative z-10 flex flex-col w-full mx-auto max-w-[416px] md:w-1/2">
      <TextGradientWhite
        text={t("register")}
        className="lg:text-[32px] font-bold mb-8"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder={t("firstName_placeholder")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Input
              id="lastName"
              {...register("lastName")}
              placeholder={t("lastName_placeholder")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Input
            id="storeUrl"
            {...register("storeUrl")}
            placeholder={t("storeUrl_placeholder")}
          />
          {errors.storeUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storeUrl.message}
            </p>
          )}
        </div>

        <div>
          <Input
            id="companyName"
            {...register("companyName")}
            placeholder={t("companyName_placeholder")}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder={t("email_placeholder")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder={t("password_placeholder")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder={t("confirmPassword_placeholder")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-secondary hover:bg-blue-600 text-white"
          disabled={registerMutation.status === "pending"}
        >
          {registerMutation.status === "pending"
            ? t("loggingIn")
            : t("register")}
        </Button>
      </form>

      {registerMutation.isError && (
        <p className="text-red-500 text-center mt-4">
          {(registerMutation.error as Error)?.message}
        </p>
      )}

      {registerMutation.isSuccess && (
        <p className="text-green-500 text-center mt-4">
          {t("registrationSuccessMessage")}
        </p>
      )}

      <Link
        href="/products/shopify-assistant/signin"
        className={buttonVariants({
          variant: "outline",
          className: "w-full mt-4 text-center bg-transparent border-secondary",
        })}
      >
        {t("signin")}
      </Link>
    </div>
  );
};

export default SigninForm;
