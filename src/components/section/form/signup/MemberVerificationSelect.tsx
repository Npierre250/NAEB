import classNames from "classnames";
import { useState } from "react";

export default function MemberVerificationSelect({ updateFields, goTo }: any) {
  const [choose, setChoose] = useState("member");

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setChoose("member")}
          className={classNames({
            "border border-[#287BCB] transition-all duration-100 ease-in-out rounded-2xl py-5 flex items-center justify-center":
              true,
            "border-[#287BCB] text-[#287BCB]": choose === "member",
            "border-[#BBBABF] text-[#BBBABF]": choose !== "member",
          })}
        >
          <span className="text-xl font-semibold">Member</span>
        </button>
        <button
          onClick={() => setChoose("not-member")}
          className={classNames({
            "border border-[#287BCB] transition-all duration-100 ease-in-out rounded-2xl py-5 flex items-center justify-center":
              true,
            "border-[#287BCB] text-[#287BCB]": choose === "not-member",
            "border-[#BBBABF] text-[#BBBABF]": choose !== "not-member",
          })}
        >
          <span className="text-xl font-semibold text-center">
            Not <br /> member
          </span>
        </button>
      </div>
      <button
        onClick={() => {
          updateFields({ isNaseMember: choose === "member" ? true : false });
          if (choose === "member") {
            goTo(1);
          } else {
            goTo(2);
          }
        }}
        className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3"
      >
        Continue
      </button>
    </div>
  );
}
