import classNames from "classnames";
import { useState } from "react";

export default function ScheduleRequestCard() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="bg-white rounded-lg px-6 py-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-[#D7EBFE] w-[42px] h-[42px] rounded-full">
              <span className="uppercase font-bold text-2xl text-[#82C1FE]">
                I
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <h4 className="font-semibold">Ingabire aime</h4>
              <span className="text-sm text-[#737373]">kanombe,kicukiro</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className={classNames({
                "px-6 py-2  rounded-full text-sm transition-all duration-300":
                  true,
                "text-[#A7A7A7] bg-[#FCFBFB]": isActive,
                "text-white bg-[#287BCB] cursor-not-allowed": !isActive,
              })}
              onClick={() => setIsActive((prev) => !prev)}
              disabled={!isActive}
            >
              Decline
            </button>
            <button
              className={classNames({
                "px-6 py-2  rounded-full text-sm transition-all duration-300":
                  true,
                "text-[#A7A7A7] bg-[#FCFBFB]": !isActive,
                "text-white bg-[#287BCB] cursor-not-allowed": isActive,
              })}
              onClick={() => setIsActive((prev) => !prev)}
              disabled={isActive}
            >
              Approve
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Products
              </span>
              <h4 className="">Coffee and beans</h4>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Quantity
              </span>
              <h4 className="">30kg</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Schedule date
              </span>
              <h4 className="">04/05/2023</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
