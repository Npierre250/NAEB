import { useEffect, useState } from "react";
import ChartView from "../../components/ui/Chart";
import ScheduleRequestCard from "../../components/ui/ScheduleRequestCard";
import Chevn from "../../components/vectors/Chevn";
import { supabase } from "../../supabase/client";

export default function DashboardHome() {
  const [delivery, setDelivery] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("delivery").select("*");
      if (error) {
        console.log(error);
      }
      setDelivery(data);
    };
    fetch();
  }, []);

  return (
    <div className="flex gap-5 p-5 h-full">
      <div className="flex-1 h-full flex flex-col gap-4">
        <div className="w-full bg-white rounded-lg px-6 py-3 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-[17px]">Stock</h4>
            <p className="text-[#42ADE2]">View list</p>
          </div>
          <div className="flex gap-14">
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Received
              </span>
              <h4 className="font-semibold">120 kg</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                In stock
              </span>
              <h4 className="font-semibold">120 kg</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Received
              </span>
              <h4 className="font-semibold">120 kg</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Received
              </span>
              <h4 className="font-semibold">120 kg</h4>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg px-8 py-6 flex flex-col gap-4 overflow-auto">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-[17px]">Production reports</h4>
            <button className="text-[#42ADE2] px-6 py-2 bg-[#F0F0F5] rounded-full flex justify-between items-center gap-3">
              <span>Monthly</span>
              <Chevn />
            </button>
          </div>
          <div className="w-full">
            <ChartView />
          </div>
        </div>
        <div className="w-full bg-white rounded-lg px-8 py-6 flex flex-col gap-4 overflow-auto">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-[17px]">Popular products</h4>
          </div>
          <div className="grid-cols-3 grid gap-10 items-center">
            {["Received", "Beans", "Sugar"].map((v, k) => {
              return (
                <div className="flex items-start flex-col gap-2 w-full" key={k}>
                  <span className="text-[17px] font-light">{v}</span>
                  <div className="flex items-center w-full bg-[#F5F5F5] rounded-r-full">
                    <span
                      className="bg-[#93CFFC] rounded-full h-2.5"
                      style={{ width: "40%" }}
                    />
                    <span className="w-full bg-[#F5F5F5] rounded-r-full h-2.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="min-w-[482px] h-full">
        <div className="w-full h-full rounded-lg px-6 py-3 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Schedule requests</h3>
            <button className="text-[#42ADE2] px-6 py-2 bg-[#F0F0F5] rounded-full">
              View list
            </button>
          </div>
          <div className="flex flex-col gap-3 overflow-auto h-full pb-32">
            {delivery.length === 0 ? (
              <div className="flex items-center flex-col">
                <p>It is Empty</p>
              </div>
            ) : (
              delivery.map((value: any, index: any) => {
                return <ScheduleRequestCard key={index} data={value} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
