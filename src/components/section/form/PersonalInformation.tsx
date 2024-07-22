import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { ApplicatioinContext } from "../../../context/Application";
const personSchema = z.object({
  idNumber: z.string().min(16).max(16),
  name: z.string().min(3).max(50),
  email:z.string(),
  phoneNumber: z
    .string()
    .regex(/^\+?(25)?0(\s)?-?7(\d){2}(\s|-)?(\d){3}(\s|-)?(\d){3}$/g),
});
type ValidationSchema = z.infer<typeof personSchema>;

export default function PersonalInformation({
  updateFields,
  idNumber,
  name,
  email,
  phoneNumber,
}: any) {
  const { next } = useContext(ApplicatioinContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(personSchema),
  });
  const onSubmit = (data: any) => {
    updateFields({
      name: data.name,
      idNumber: data.idNumber,
      email:data.email,
      phoneNumber: data.phoneNumber,
    });
    next();
  };
  return (
    <form
      className="mt-8 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-6">
      <Input
        label="Names"
        name="name"
        placeholder="Enter your full names"
        type="name"
        errors={errors}
        defaultValue={name}
        register={register}
      />
      <Input
        label="email"
        name="email"
        placeholder="Enter your email"
        type="email"
        errors={errors}
        defaultValue={email}
        register={register}
      />
      <Input
        label="Id number"
        name="idNumber"
        placeholder="Enter  your  id number"
        type="number"
        defaultValue={idNumber}
        errors={errors}
        register={register}
      />
      <Input
        label="Phone number"
        name="phoneNumber"
        placeholder="Enter your phone number"
        type="number"
        defaultValue={phoneNumber}
        errors={errors}
        register={register}
      />
      </div>
      <button
        type="submit"
        className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3"
      >
        Continue
      </button>
    </form>
  );
}
