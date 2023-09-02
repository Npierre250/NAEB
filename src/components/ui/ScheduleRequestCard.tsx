import classNames from "classnames";
import { useState } from "react";
import { supabase } from "../../supabase/client";

export default function ScheduleRequestCard({ data }: any) {
  const [status, setStatus] = useState(data.status);
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-white rounded-lg px-6 py-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-[#D7EBFE] w-[42px] h-[42px] rounded-full">
              <span className="uppercase font-bold text-2xl text-[#82C1FE]">
                {data.user_name[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <h4 className="font-semibold">{data.user_name}</h4>
              <span className="text-sm text-[#737373]">kanombe,kicukiro</span>
            </div>
          </div>
          {status === "pending" ? (
            <div className="flex gap-2 items-center">
              <button
                className={classNames({
                  "px-6 py-2  rounded-full text-sm transition-all duration-300 bg-slate-200 text-white hover:bg-[#287BCB]":
                    true,
                  "cursor-wait opacity-60": loading,
                })}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await supabase
                      .from("delivery")
                      .update({ status: "decline" })
                      .eq("id", data.id)
                      .select();
                    setStatus("decline");
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                Decline
              </button>
              <button
                className={classNames({
                  "px-6 py-2  rounded-full text-sm transition-all duration-300 bg-slate-200 text-white hover:bg-[#287BCB]":
                    true,
                  "cursor-wait opacity-60": loading,
                })}
                onClick={async () => {
                  setLoading(true);
                  try {
                    await supabase
                      .from("delivery")
                      .update({ status: "approve" })
                      .eq("id", data.id)
                      .select();
                    setStatus("approve");
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
              >
                Approve
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Status:</span>
              <span className="capitalize">{status}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Products
              </span>
              <h4 className="">{data.product_name}</h4>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Quantity
              </span>
              <h4 className="">{data.quantity}kg</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Schedule date
              </span>
              <h4 className="">{data.delivery_date}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
