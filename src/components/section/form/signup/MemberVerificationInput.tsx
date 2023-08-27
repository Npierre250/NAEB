import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../ui/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";

const verificatioNesaSchema = z.object({
  nesaCode: z.string().min(1).max(50),
});
type ValidationSchema = z.infer<typeof verificatioNesaSchema>;

export default function MemberVerificationInput() {
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
        label="NESA Code"
        placeholder="Enter your code"
        type="nesaCode"
        name="nesaCode"
        defaultValue=""
        errors={errors}
        register={register}
      />
      <button
        type="submit"
        className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3"
      >
        Continue
      </button>
    </form>
  );
}
