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
   
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password is required"),
 
  })
  

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
        >
          Login
        </Button>
      </form>

      <Link
        href="/products/shopify-assistant/create"
        className={buttonVariants({
          variant: "outline",
          className: "w-full  mt-4 text-center  bg-transparent  border-secondary ",
        })}
      >
        {" "}
      Don&lsquo;t have an account?
      </Link>
    </div>
  );
};

export default SigninForm;
