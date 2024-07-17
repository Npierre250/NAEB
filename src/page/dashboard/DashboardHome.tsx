import { useEffect, useState } from "react";
import ApplicationCard from "../../components/ui/ApplicationsCard";
import ScheduleRequestCard from "../../components/ui/ScheduleRequestCard";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

export default function DashboardHome() {
  const [deliveries, setDeliveries] = useState<any>([]);
  const [applications, setApplications] = useState<any>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [totalWeights, setTotalWeights] = useState({ all: 0, approved: 0, rejected: 0, pending: 0 });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/applications`);
        const data = await response.json();
        data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplications();
  }, []);

  const getApplicationsByStatus = (status: string) => {
    return applications.filter((app: any) => app.Status === status).length;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingDeliveries(true);
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch deliveries');
        }
        const data = await response.json();
        data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setDeliveries(data);

        const totalWeight = { all: 0, approved: 0, rejected: 0, pending: 0 };
        data.forEach((delivery: any) => {
          totalWeight.all += delivery.productWeight;
          if (delivery.status === 'approved') {
            totalWeight.approved += delivery.productWeight;
          } else if (delivery.status === 'rejected') {
            totalWeight.rejected += delivery.productWeight;
          } else if (delivery.status === 'pending') {
            totalWeight.pending += delivery.productWeight;
          }
        });
        setTotalWeights(totalWeight);

      } catch (error) {
        console.error('Fetch data error:', error);
        toast.error('Failed to fetch deliveries');
      } finally {
        setLoadingDeliveries(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-5 p-5 h-full flex-col overflow-x-scroll">
      <div className="flex-1 h-full flex flex-col gap-4">
        <div className="flex gap-5">
          <div className="w-full bg-white rounded-lg px-6 py-3 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-[17px]">Stock</h4>
            </div>
            <div className="flex gap-14">
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">All</span>
                <h4 className="font-semibold">{totalWeights.all} kg</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Approved</span>
                <h4 className="font-semibold">{totalWeights.approved} kg</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Declined</span>
                <h4 className="font-semibold">{totalWeights.rejected} kg</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Pending</span>
                <h4 className="font-semibold">{totalWeights.pending} kg</h4>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg px-6 py-3 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-[17px]">Applications</h4>
            </div>
            <div className="flex gap-14">
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">All</span>
                <h4 className="font-semibold">{applications.length}</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Approved</span>
                <h4 className="font-semibold">{getApplicationsByStatus("approved")}</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Rejected</span>
                <h4 className="font-semibold">{getApplicationsByStatus("rejected")}</h4>
              </div>
              <div className="flex flex-col">
                <span className="text-[#737373] font-light text-[15px]">Pending</span>
                <h4 className="font-semibold">{getApplicationsByStatus("pending")}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-6">
          <div className="h-full sticky top-[80px] w-full">
            <div className="w-full h-full rounded-lg py-3 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Schedule requests</h3>
                <button className="text-[#42ADE2] px-6 py-2 bg-[#F0F0F5] rounded-full">
                  View list
                </button>
              </div>
              {loadingDeliveries && (
                <div className="flex w-full justify-center h-[300px] items-center flex-col">
                  <Loader />
                </div>
              )}
              {deliveries.length === 0 && !loadingDeliveries && (
                <div className="flex w-full justify-center h-[300px] items-center flex-col">
                  <p>You have no requests.</p>
                </div>
              )}
              {deliveries.length !== 0 && !loadingDeliveries && (
                <div className="flex flex-col gap-3 overflow-auto h-full pb-32">
                  {deliveries.map((value: any, index: any) => {
                    return <ScheduleRequestCard key={index} data={value} />;
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="w-full py-3 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Applications requests</h3>
              <button className="text-[#42ADE2] px-6 py-2 bg-[#F0F0F5] rounded-full">
                View list
              </button>
            </div>
            {loadingApplications && (
                <div className="flex w-full justify-center h-[300px] items-center flex-col">
                  <Loader />
                </div>
              )}
              {applications.length === 0 && !loadingApplications && (
                <div className="flex w-full justify-center h-[300px] items-center flex-col">
                  <p>You have no requests.</p>
                </div>
              )}
            <div className="flex flex-col gap-3 overflow-auto h-full pb-32">
              {applications.map((app: any) => (
                <ApplicationCard key={app._id} data={app} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
