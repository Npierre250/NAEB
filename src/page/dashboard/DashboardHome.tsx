import { useState } from "react";
import CalendarButton from "../../components/ui/CalendarButton";
import Plus from "../../components/vectors/Plus";
import classNames from "classnames";

export default function DashboardHome() {
  const [upcoming, setUpcoming] = useState("Confirmed");
  return (
    <div className="flex gap-5 p-5">
      <div className="flex-1 flex flex-col gap-5">
        <div className="w-full bg-white rounded-lg px-6 py-6 flex gap-8">
          <h3 className="text-xl font-semibold text-[#707070]">
            September 2023
          </h3>
          <p className="font-light">8:30 AM</p>
          <span className="text-[#63BCFF] font-semibold">2 Upcoming</span>
        </div>
        <div className="w-full bg-white rounded-lg">
          <div className="grid grid-cols-7 grid-rows-6 w-full">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((value, index) => {
              return (
                <div
                  className="px-5 h-[80px] flex items-center text-[#707070] text-lg font-normal"
                  key={index}
                >
                  {value}
                </div>
              );
            })}
            {Array(35)
              .fill(22)
              .map((value, index) => {
                return <CalendarButton key={index} date={value} />;
              })}
          </div>
        </div>
      </div>
      <div className="min-w-[322px]">
        <div className="w-full bg-white h-full rounded-lg px-6 py-5">
          <div className="flex items-center justify-between">
            <span>Upcoming deliveries</span>
            <Plus />
          </div>
          <div className="flex items-center mt-3">
            {["Confirmed", "Pending"].map((value, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setUpcoming(value)}
                  className={classNames({
                    "p-4 relative transition-all duration-300": true,
                    "text-[#42ADE2]": upcoming === value,
                    "text-[#8E8C94]": upcoming !== value,
                  })}
                >
                  {value}

                  <span
                    className={classNames({
                      "absolute bottom-0 left-0 transition-all duration-300":
                        true,
                      "bg-[#42ADE2] h-0.5 w-full": upcoming === value,
                      "bg-transparent h-0 w-0": upcoming !== value,
                    })}
                  />
                </button>
              );
            })}
          </div>
          {upcoming === "Confirmed" ? (
            <div className="flex gap-5 flex-col mt-10">
              {Array(3)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex flex-col gap-0 bg-[#E9FDF8] rounded-lg px-4 py-2 items-center">
                        <span className="font-semibold">12</span>
                        <span className="text-[#A5A3A9]">July</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">Beans & coffee</span>
                        <span className="text-[#707070] font-semibold">
                          40 kg
                        </span>
                        <span className="text-sm text-[#707070] font-light">
                          8:00 PM
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="mt-10 text-center">Pending !!!</p>
          )}
        </div>
      </div>
    </div>
  );
}
