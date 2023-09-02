import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/userManager";

const verificatioNesaSchema = z
  .object({
    email: z.string().email(),
    phoneNumber: z
      .string()
      .regex(/^\+?(25)?0(\s)?-?7(\d){2}(\s|-)?(\d){3}(\s|-)?(\d){3}$/g, {
        message:
          "Please enter a valid phone number in the format +250 7XX XXX XXX.",
      }),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type ValidationSchema = z.infer<typeof verificatioNesaSchema>;

export default function CreateAccount({ isNaseMember, nesaCode }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const { signup }: any = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(verificatioNesaSchema),
  });
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await signup({
        email: data.email,
        password: data.password,
        isNaseMember,
        nesaCode,
        phoneNumber: data.phoneNumber,
      });
      navigate("/dashboard");
    } catch (error: any) {
      setError("email", {
        type: "custom",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="mt-8 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        name="email"
        defaultValue=""
        errors={errors}
        register={register}
      />
      <Input
        label="Phone number"
        placeholder="Enter your phone number"
        type="number"
        name="phoneNumber"
        defaultValue=""
        errors={errors}
        register={register}
      />
      <Input
        label="Password"
        placeholder="Create password"
        type="password"
        name="password"
        defaultValue=""
        errors={errors}
        register={register}
      />
      <Input
        label="Confirm Password "
        placeholder="Confirm password"
        type="password"
        name="confirmPassword"
        defaultValue=""
        errors={errors}
        register={register}
      />
      <button
        type="submit"
        className={classNames({
          "py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3transition-all duration-300":
            true,
          "opacity-100 ": !isLoading,
          "opacity-20 cursor-wait": isLoading,
        })}
      >
        Sign up
      </button>
    </form>
  );
}
