import classNames from "classnames";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CalendarButton({ date }: any) {
  const [isClick, setIsClick] = useState(false);
  return (
    <button
      onClick={() => setIsClick(!isClick)}
      className={classNames({
        "px-3 py-3 h-[80px] flex items-end text-[#707070] text-sm font-light justify-end border border-[#E8E8EA] transition-all duration-300 relative":
          true,
        "bg-transparent": !isClick,
        "bg-[#D2FBF0]": isClick,
      })}
    >
      {date}
      {isClick && (
        <div className="absolute top-1/2 left-1/2 bg-[#287BCB] min-w-[130px] rounded-lg py-2 px-4 flex flex-col items-start gap-1 text-white z-50">
          <span>Beans & coffee</span>
          <span>40 kg</span>
          <span>16 july 2023</span>
        </div>
      )}
    </button>
  );
}
