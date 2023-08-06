/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";

const verificatioNesaSchema = z
  .object({
    email: z.string().email(),
    phoneNumber: z
      .string()
      .regex(/^\+?(25)?0(\s)?-?7(\d){2}(\s|-)?(\d){3}(\s|-)?(\d){3}$/g, {
        message:
          "Please enter a valid phone number in the format +250 7XX XXX XXX.",
      }),
    password: z.string().min(1).max(50),
    confirmPassword: z.string().min(1).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type ValidationSchema = z.infer<typeof verificatioNesaSchema>;

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(verificatioNesaSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
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
        className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3"
      >
        Sign up
      </button>
    </form>
  );
}
