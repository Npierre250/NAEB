import classNames from "classnames";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ScheduleRequestCard({ data }: any) {
  const { _id, status } = data;
  const [scheduleStatus, setStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const updateDeliveryStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/schedules/${_id}/admin`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update schedule");
      }

      const data = await response.json();
      console.log(data);
      setStatus(newStatus);
      toast.success(`Request ${newStatus}`);
      window.location.reload()
    } catch (error) {
      console.error(error);
      toast.error("Failed to update request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg px-6 py-5 max-w-[450px]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-[#D7EBFE] w-[42px] h-[42px] rounded-full">
              <span className="uppercase font-bold text-2xl text-[#82C1FE]">
                {data.username[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <h4 className="font-semibold">{data.username}</h4>
              <span className="text-sm text-[#737373]">kicukiro</span>
            </div>
          </div>
          {status === "pending" ? (
            <div className="flex gap-2 items-center">
              <button
                className={classNames({
                  "px-6 py-2 rounded-full text-sm transition-all duration-300 bg-red-100 text-red-500 hover:bg-red-200":
                    true,
                  "cursor-wait opacity-60": loading,
                })}
                onClick={() => updateDeliveryStatus("rejected")}
                disabled={loading}
              >
                Decline
              </button>
              <button
                className={classNames({
                  "px-6 py-2 rounded-full text-sm transition-all duration-300 bg-[#287BCB] text-white hover:bg-[#287BCB]":
                    true,
                  "cursor-wait opacity-60": loading,
                })}
                onClick={() => updateDeliveryStatus("approved")}
                disabled={loading}
              >
                Approve
              </button>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Status:</span>
              <span className="capitalize">{scheduleStatus}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Products
              </span>
              <h4 className="">{data.productTitle}</h4>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Quantity
              </span>
              <h4 className="">{data.productWeight}kg</h4>
            </div>
            <div className="flex flex-col">
              <span className="text-[#737373] font-light text-[15px]">
                Schedule date
              </span>
              <h4 className="">{formatDate(data.deliveryTime)}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
