import classNames from "classnames";
import Logo from "../components/ui/Logo";
import FormStep from "../components/vectors/FormStep";
import CircleSvg from "../components/vectors/Circle";
import { Link } from "react-router-dom";
import { useState } from "react";
import MemberVerificationSelect from "../components/section/form/signup/MemberVerificationSelect";
import MemberVerificationInput from "../components/section/form/signup/MemberVerificationInput";
import CreateAccount from "../components/section/form/signup/CreateAccount";
const INITIAL_DATA = {
  isNaseMember: false,
  nesaCode: null,
};
export default function Signup() {
  const [data, setData] = useState(INITIAL_DATA);
  const [step, setStep] = useState(2);
  function updateFields(fields: Partial<any>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
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
                  "flex gap-2 flex-col -ml-8": true,
                  "opacity-50": step !== 2,
                })}
              >
                <h4 className="font-semibold text-xl text-white">
                  {step === 2 ? "Profile verification" : "Register"}
                </h4>
                <p className="text-white text-start">
                  {step === 2
                    ? "Verify if it’s you?"
                    : "Register your email and phone"}
                </p>
              </button>
              <button
                className={classNames({
                  "flex gap-2 flex-col ml-2 relative top-7": true,
                  "opacity-50": step !== 2,
                })}
              >
                <h4 className="font-semibold text-xl text-white">
                  {step === 2 ? "Create account" : "Create password"}
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
      <div className="w-full h-full flex items-center flex-col sm:flex-row justify-center relative">
        <div className="max-w-md w-full px-4">
          <h3 className="text-4xl font-bold text-[#287BCB] mb-1">
            {step === 2 ? "Create account" : "Member verification"}
          </h3>
          <span className="text-[#575757] font-light">
            {step === 2 ? "Fill in your credentials" : "Are you A NESA member"}
          </span>
          {step === 0 && (
            <MemberVerificationSelect
              updateFields={updateFields}
              goTo={setStep}
            />
          )}
          {step === 1 && (
            <MemberVerificationInput
              updateFields={updateFields}
              goTo={setStep}
            />
          )}
          {step === 2 && <CreateAccount {...data} />}
        </div>
        <p className="sm:absolute bottom-3 mt-2 sm:mt-0">
          If you have account?{" "}
          <Link
            to={"/login"}
            className="text-[#287BCB] inline-block ml-1 hover:underline text-center mx-auto
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
