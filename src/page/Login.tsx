/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import FormStep from "../components/vectors/FormStep";
import CircleSvg from "../components/vectors/Circle";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import { z } from "Zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../components/ui/Logo";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
type ValidationSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen">
      <div className="relative bg-[#287BCB] hidden md:block md:max-w-lg w-full">
        <div className="w-[80%] mx-auto mt-10">
          <Logo />
          <div className="flex relative z-50 max-w-[320px] h-full mt-32">
            <div>
              <FormStep className="w-[126px] h-[332px]" />
            </div>
            <div className="relative flex flex-col justify-between grow">
              <button
                className={classNames({
                  "flex gap-2 flex-col -ml-20": true,
                })}
              >
                <h4 className="font-semibold text-xl text-white">
                  Member verification
                </h4>
                <p className="text-white text-start">
                  Check if you are already member of nae system
                </p>
              </button>
              <button
                className={classNames({
                  "flex gap-2 flex-col -ml-8 opacity-50": true,
                })}
              >
                <h4 className="font-semibold text-xl text-white">Register</h4>
                <p className="text-white text-start">
                  Register your email and phone
                </p>
              </button>
              <button
                className={classNames({
                  "flex gap-2 flex-col ml-2 relative top-7 opacity-50": true,
                })}
              >
                <h4 className="font-semibold text-xl text-white">
                  Create password
                </h4>
                <p className="text-white text-start">
                  Register your email and phone
                </p>
              </button>
            </div>
          </div>
        </div>
        <CircleSvg className="absolute bottom-0 left-0 hidden md:block" />
      </div>
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="max-w-md w-full px-4">
          <h3 className="text-4xl font-bold text-[#287BCB] mb-1">Welcome!</h3>
          <span className="text-[#575757] font-light">
            Log in to to pack system
          </span>
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
              label="Password"
              placeholder="Enter your password"
              type="password"
              name="password"
              defaultValue=""
              errors={errors}
              register={register}
            />
            <div className="flex items-end flex-col">
              <Link
                to={"#"}
                className="text-right text-[#287BCB] hover:underline"
              >
                Forgot password?
              </Link>

              <button className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3">
                Log in
              </button>
            </div>
          </form>
        </div>
        <p className="absolute bottom-12">
          If yo don’t have account?{" "}
          <Link
            to={"#"}
            className="text-[#287BCB] inline-block ml-1 hover:underline text-center mx-auto
            "
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
