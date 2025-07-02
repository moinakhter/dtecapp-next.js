"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";
import TextGradientWhite from "@/components/common/text-gradient-white";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    storeUrl: z.string().url("Store URL must be valid"),
    companyName: z.string().min(1, "Company Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

import React from "react";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className=" relative z-10 flex flex-col  w-full  mx-auto max-w-[416px] md:w-1/2">
      <TextGradientWhite
        text="Register"
        className="lg:text-[32px] font-bold mb-8"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
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
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Store URL */}
        <div>
          <Input
            id="storeUrl"
            {...register("storeUrl")}
            placeholder="Store URL"
          />
          {errors.storeUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storeUrl.message}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <Input
            id="companyName"
            {...register("companyName")}
            placeholder="Company Name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companyName.message}
            </p>
          )}
        </div>

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

        {/* Confirm Password */}
        <div>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mt-4 bg-secondary hover:bg-blue-600 text-white"
        >
          Register
        </Button>
      </form>

      <Link
        href="/products/shopify-assistant/signin"
        className={buttonVariants({
          variant: "outline",
          className: "w-full  mt-4 text-center bg-transparent   border-secondary ",
        })}
      >
        {" "}
        Do you have an account?{" "}
      </Link>
    </div>
  );
};

export default SigninForm;
