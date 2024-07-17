import classNames from "classnames";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ApplicationCard({ data }: any) {
  const { _id, status } = data;
  const [applicationStatus, setStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(status); // Update application status whenever the data prop changes
  }, [status]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // "en-GB" will format as day/month/year
  };

  const updateApplicationStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/applications/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update application');
      }

      setStatus(newStatus);
      toast.success(`Application ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${newStatus} application`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg px-6 py-5 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-[#D7EBFE] w-[42px] h-[42px] rounded-full">
              <span className="uppercase font-bold text-2xl text-[#82C1FE]">
                {data.name[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0">
              <h4 className="font-semibold">{data.name}</h4>
              <span className="text-sm text-[#737373]">{data.farmLocation}</span>
            </div>
          </div>
          {applicationStatus === "pending" && (
            <div className="flex gap-2 items-center">
              <button
                className={classNames(
                  "px-6 py-2 rounded-full text-sm transition-all duration-300 bg-red-100 text-red-500 hover:bg-red-200",
                  { "cursor-wait opacity-60": loading }
                )}
                onClick={() => updateApplicationStatus('rejected')}
                disabled={loading}
              >
                Reject
              </button>
              <button
                className={classNames(
                  "px-6 py-2 rounded-full text-sm transition-all duration-300 bg-[#287BCB] text-white hover:bg-[#287BCB]",
                  { "cursor-wait opacity-60": loading }
                )}
                onClick={() => updateApplicationStatus('approved')}
                disabled={loading}
              >
                Approve
              </button>
            </div>
          )}
        </div>
        {applicationStatus === "approved" && (
          <>
           <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Name</span>
                <h4>{data.name}</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Email</span>
                <h4>{data.email}</h4>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Phone Number</span>
                <h4>{data.phoneNumber}</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">ID Number</span>
                <h4>{data.idNumber}</h4>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">License Copy</span>
                <a href={data.licenceCopy} className="text-blue-500 underline">View</a>
              </div>
            </div>
          </>
        )}
        {applicationStatus !== "approved" && (
          <>
           <div className="flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">Name</span>
               <h4>{data.name}</h4>
             </div>
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">Email</span>
               <h4>{data.email}</h4>
             </div>
           </div>
           <div className="flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">Phone Number</span>
               <h4>{data.phoneNumber}</h4>
             </div>
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">ID Number</span>
               <h4>{data.idNumber}</h4>
             </div>
           </div>
           <div className="flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">Status</span>
               <h4 className="capitalize">{applicationStatus}</h4>
             </div>
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">Location</span>
               <h4>{data.farmLocation}</h4>
             </div>
           </div>
           <div className="flex items-center justify-between">
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">TIN Number</span>
               <h4>{data.tinNumber}</h4>
             </div>
             <div className="flex flex-col">
               <span className="text-[#737373] font-light text-[15px]">License Copy</span>
               <a href={data.licenceCopy} className="text-blue-500 underline">View</a>
             </div>
           </div> 
          </>
        )}
      </div>
    </div>
  );
}
