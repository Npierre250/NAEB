import { useState } from "react";
import BusinessInfos from "../components/section/form/BusinessInfos";
import CircleSvg from "../components/vectors/Circle";
import FormStep from "../components/vectors/FormStep";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { Application } from "../types/application";
import PersonalInformation from "../components/section/form/PersonalInformation";
import FarmInformations from "../components/section/form/FarmInformations";
import classNames from "classnames";
import { ApplicatioinContext } from "../context/Application";
import Done from "../components/section/form/Done";
import Logo from "../components/ui/Logo";
const INITIAL_DATA: Application = {
  name: "",
  idNumber: "",
  email:"",
  phoneNumber: "",
  farmLocation: "",
  farmLength: "",
  productionSeason: "",
  desiredProducts: "",
  tinNumber: "",
  licenceCopy: "",
};

export default function ApplicationPage() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<Application>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, goTo, next } = useMultistepForm([
    <PersonalInformation {...data} updateFields={updateFields} />,
    <FarmInformations {...data} updateFields={updateFields} />,
    <BusinessInfos {...data} updateFields={updateFields} />,
    <Done />,
  ]);
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
                  "opacity-50": currentStepIndex < 0,
                })}
                onClick={() => goTo(0)}
              >
                <h4 className="font-semibold text-xl text-white">
                  Personal information
                </h4>
                <p className="text-white text-start">
                  Check if you are already member of nae system
                </p>
              </button>
              <button
                className={classNames({
                  "flex gap-2 flex-col -ml-8": true,
                  "opacity-50": currentStepIndex < 1,
                })}
                onClick={() => goTo(1)}
              >
                <h4 className="font-semibold text-xl text-white">
                  Farm informations
                </h4>
                <p className="text-white text-start">Verify if it’s you?</p>
              </button>
              <button
                className={classNames({
                  "flex gap-2 flex-col ml-2 relative top-7": true,
                  "opacity-50": currentStepIndex < 2,
                })}
                onClick={() => goTo(2)}
              >
                <h4 className="font-semibold text-xl text-white">
                  Business infos
                </h4>
                <p className="text-white text-start">
                  Register your email and phone
                </p>
              </button>
            </div>
          </div>
        </div>
        {/* <CircleSvg className="absolute bottom-0 left-0 hidden md:block" /> */}
      </div>
      <div className="w-full h-full flex justify-center">
        {steps.length - 1 === currentStepIndex ? (
          <Done />
        ) : (
          <div className="px-24 w-full flex justify-center flex-col">
            <span className="text-[#287BCB] font-light">Packhouse</span>
            <h3 className="text-4xl font-bold text-[#287BCB] mb-1">
              Application
            </h3>
            <span className="text-[#575757] font-light">
              Personal information
            </span>
            <ApplicatioinContext.Provider value={{ next: next }}>
              {steps[currentStepIndex]}
            </ApplicatioinContext.Provider>
          </div>
        )}
      </div>
    </div>
  );
}
