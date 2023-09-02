import { useEffect, useState } from "react";
import ChartView from "../../components/ui/Chart";
import ScheduleRequestCard from "../../components/ui/ScheduleRequestCard";
import { supabase } from "../../supabase/client";
import Loader from "../../components/Loader";

export default function DashboardHome() {
  const [delivery, setDelivery] = useState<any>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setloading(true);
      let { data, error } = await supabase
        .from("delivery")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        console.log(error);
      }
      setDelivery(data);
      setloading(false);
    };
    fetch();
  }, []);

  return (
    <div className="flex gap-5 p-5 h-full">
      <div className="flex-1 h-full flex flex-col gap-4">
        <div className="w-full bg-white rounded-lg px-6 py-3 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-[17px]">Stock</h4>
            {/* <p className="text-[#42ADE2]">View list</p> */}
          </div>
          <div className="flex gap-14">
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">All</span>
              <h4 className="font-semibold">
                {delivery?.reduce(
                  (a: { quantity: any }, b: { quantity: any }) =>
                    a + b.quantity,
                  0
                )}
                kg
              </h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Approved
              </span>
              <h4 className="font-semibold">
                {delivery
                  .filter((value: any) => value.status === "approved")
                  .reduce(
                    (a: number, b: { quantity: number }) => a + b.quantity,
                    0
                  )}{" "}
                kg
              </h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Declined
              </span>
              <h4 className="font-semibold">
                {delivery
                  .filter((value: any) => value.status === "declined")
                  ?.reduce(
                    (a: number, b: { quantity: number }) => a + b.quantity,
                    0
                  )}{" "}
                kg
              </h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Pending
              </span>
              <h4 className="font-semibold">
                {delivery
                  ?.filter((value: any) => value.status === "pending")
                  ?.reduce(
                    (a: number, b: { quantity: number }) => a + b.quantity,
                    0
                  )}{" "}
                kg
              </h4>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg px-8 py-6 flex flex-col gap-4 overflow-auto">
          <div className="flex justify-between mb-8 items-center">
            <h4 className="font-semibold text-[17px]">Production reports</h4>
            {/* <button className="text-[#42ADE2] px-6 py-2 bg-[#F0F0F5] rounded-full flex justify-between items-center gap-3">
              <span>Monthly</span>
              <Chevn />
            </button> */}
          </div>
          <div className="w-full ">
            {loading ? (
              <div className=" h-[200px] flex flex-col justify-center items-center">
                <Loader />
              </div>
            ) : (
              <ChartView />
            )}
          </div>
        </div>
        {/* <div className="w-full bg-white rounded-lg px-8 py-6 flex flex-col gap-4 overflow-auto">
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
        </div> */}
      </div>
      <div className="min-w-[482px] h-full">
        <div className="w-full h-full rounded-lg px-6 py-3 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Schedule requests</h3>
            {/* <button className="text-[#42ADE2] px-6 py-2 bg-[#F0F0F5] rounded-full">
              View list
            </button> */}
          </div>
          {loading && (
            <div className="flex w-full justify-center h-[300px]  items-center flex-col">
              <Loader />
            </div>
          )}
          {delivery?.length === 0 && !loading && (
            <div className="flex w-full justify-center h-[300px]  items-center flex-col">
              <p>You have no requests.</p>
            </div>
          )}
          {delivery.length !== 0 && !loading && (
            <div className="flex flex-col gap-3 overflow-auto h-full pb-32">
              {delivery.map((value: any, index: any) => {
                return <ScheduleRequestCard key={index} data={value} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
