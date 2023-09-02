/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Input, { DisableIInput } from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { ApplicatioinContext } from "../../../context/Application";

const farmInfoSchema = z.object({
  farmLocation: z.string().min(1).max(50),
  farmLength: z.string().min(1, {
    message: "unvalid length",
  }),
  productionSeason: z.string().min(1, {
    message: "unvalid season",
  }),
  desiredProducts: z.string().min(1).max(50),
});
type ValidationSchema = z.infer<typeof farmInfoSchema>;
export default function FarmInformations({
  farmLocation,
  farmLength,
  productionSeason,
  desiredProducts,
  updateFields,
}: any) {
  const { next } = useContext(ApplicatioinContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(farmInfoSchema),
  });

  const onSubmit = (data: any) => {
    updateFields({
      farmLocation: data.farmLocation,
      farmLength: data.farmLength,
      productionSeason: data.productionSeason,
      desiredProducts: data.desiredProducts,
    });
    next();
  };
  return (
    <form
      className="mt-8 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Farm location"
        placeholder="Enter your full names"
        type="name"
        name="farmLocation"
        defaultValue={farmLocation}
        errors={errors}
        register={register}
      />
      <div className="flex gap-5">
        <div>
          <label htmlFor="farm-size" className="block capitalize text-[17px]">
            Farm length
          </label>
          <div className="flex">
            <div className="hover:z-50 z-10  transition-all">
              <Input
                placeholder="OO"
                type="number"
                name="farmLength"
                defaultValue={farmLength}
                errors={errors}
                register={register}
              />
            </div>
            <div className="-ml-10 z-40">
              <DisableIInput placeholder="M2" value="M2" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="farm-size" className="block capitalize text-[17px]">
            Production /season
          </label>
          <div className="flex">
            <div className="hover:z-50 z-10  transition-all">
              <Input
                placeholder="OO"
                maxLength={2}
                type="number"
                name="productionSeason"
                defaultValue={productionSeason}
                register={register}
                errors={errors}
              />
            </div>
            <div className="-ml-10 z-40">
              <DisableIInput placeholder="KG" value={"KG"} />
            </div>
          </div>
        </div>
      </div>
      <Input
        label="Desired products"
        placeholder="Enter products"
        name="desiredProducts"
        defaultValue={desiredProducts}
        register={register}
        errors={errors}
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
