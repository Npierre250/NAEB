import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ui/ProductCard';
import Loader from '../../components/Loader';
import { toast } from 'react-hot-toast';
import getUserInfo from '../../utils/getUserInfo';
import classNames from "classnames";

const DashboardUserHome = () => {
  const [loading, setLoading] = useState(false);
  const [whichOne, setWhichOne] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [productTitle, setProductTitle] = useState<string>('');
  const [productWeight, setProductWeight] = useState<number | ''>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [reminder, setReminder] = useState<string>('before 1h');
  const user: any = getUserInfo(); // Assuming this function retrieves user info

  const [loadingDeliveries, setLoadingDeliveries] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingDeliveries(true);
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch deliveries');
        }
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error('Fetch data error:', error);
        toast.error('Failed to fetch deliveries');
      } finally {
        setLoadingDeliveries(false);
      }
    };

    fetchData();
  }, []);

  const filterDeliveries = () => {
    switch (whichOne) {
      case 'pending':
        return deliveries.filter((del) => del.status === 'pending');
      case 'approved':
        return deliveries.filter((del) => del.status === 'approved');
      case 'declined':
        return deliveries.filter((del) => del.status === 'rejected');
      default:
        return deliveries;
    }
  };

  const submitDelivery = async () => {
    if (!productTitle || !productWeight || !deliveryTime) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productTitle,
          productWeight,
          deliveryTime,
          reminder,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create delivery');
      }

      // Fetch updated deliveries after successful submission
      const updatedResponse = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated deliveries');
      }

      const updatedData = await updatedResponse.json();
      setDeliveries(updatedData);

      // Clear form inputs and notify success
      setProductTitle('');
      setProductWeight('');
      setDeliveryTime('');
      setReminder('before 1h');
      toast.success('Delivery added successfully');
    } catch (error: any) {
      console.error('Submit delivery error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTotalWeight = (status: string) => {
    let totalWeight = 0;
    deliveries.forEach((del) => {
      if (del.status === status) {
        totalWeight += del.productWeight;
      }
    });
    return totalWeight;
  };

  return (
    <div className="p-5">
      <div className="flex gap-4">
        {/* Total Deliveries Card */}
        <div className="w-[400px] bg-white rounded-lg px-8 py-6 flex gap-5 flex-col">
          <span>Total deliveries</span>
          <span className="font-semibold text-[30px]">{deliveries.length}</span>
          <div className="flex gap-4">
            {/* Delivery Status Cards */}
            <div className="flex gap-2 items-center">
              <span className="w-0.5 h-full bg-[#00A0DE]" />
              <div className="flex flex-col">
                <span className="text-[#615E69] text-sm capitalize">Pending</span>
                <span className="font-semibold text-sm capitalize inline-flex items-center gap-2">
                  {getTotalWeight('pending')} kg
                  <span className="text-[9px] text-[#00A0DE] py-[1px] px-[4px] rounded-full bg-[#CDE8FD]">
                    %
                  </span>
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-0.5 h-full bg-[#00A0DE]" />
              <div className="flex flex-col">
                <span className="text-[#615E69] text-sm capitalize">Approved</span>
                <span className="font-semibold text-sm capitalize inline-flex items-center gap-2">
                  {getTotalWeight('approved')} kg
                  <span className="text-[9px] text-[#00A0DE] py-[1px] px-[4px] rounded-full bg-[#CDE8FD]">
                    %
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* New Delivery Form */}
        <div className="bg-white rounded-lg px-8 py-6 flex gap-5 flex-col w-full">
          <h4 className="font-semibold text-[20px]">New delivery</h4>
          <div className="grid grid-cols-3 gap-10">
            {/* Form Inputs */}
            <div className="flex flex-col gap-2">
              <span className="font-light">Product Title</span>
              <input
                placeholder="Product Title"
                required
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-light">Product Weight</span>
              <input
                placeholder="Product Weight"
                required
                type="number"
                value={productWeight}
                onChange={(e) => setProductWeight(Number(e.target.value))}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-light">Delivery Time</span>
              <input
                placeholder="Delivery Time"
                required
                type="date"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-light">Reminder</span>
              <select
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              >
                <option value="before 1h">Before 1 hour</option>
                <option value="before 2h">Before 2 hours</option>
                <option value="before 3h">Before 3 hours</option>
              </select>
            </div>
          </div>
          {/* Submit Button */}
          <button
            disabled={loading}
            onClick={submitDelivery}
            className={classNames({
              'px-10 py-3 text-sm transition-all duration-300 text-white w-fit ml-auto bg-[#287BCB]': true,
              'cursor-wait opacity-60': loading,
            })}
          >
            Add delivery
          </button>
        </div>
      </div>
      {/* Delivery Filter Buttons */}
      <div className="rounded-lg bg-white mt-4 px-8 py-6 w-full">
        <div className="flex gap-2 rounded-lg bg-[#E1F0FF] text-[#287BCB] w-fit mx-auto my-4">
          <button
            onClick={() => setWhichOne('all')}
            className={classNames({
              'px-10 py-3 text-sm transition-all duration-300 text-[#287BCB] w-fit': true,
              'bg-[#287BCB] text-white': whichOne === 'all',
            })}
          >
            All
          </button>
          <button
            onClick={() => setWhichOne('pending')}
            className={classNames({
              'px-10 py-3 text-sm transition-all duration-300 border-x w-fit text-[#287BCB]': true,
              'bg-[#287BCB] text-white': whichOne === 'pending',
            })}
          >
            Pending
          </button>
          <button
            onClick={() => setWhichOne('approved')}
            className={classNames({
              'px-10 py-3 text-sm transition-all duration-300 border-x w-fit text-[#287BCB]': true,
              'bg-[#287BCB] text-white': whichOne === 'approved',
            })}
          >
            Approved
          </button>
          <button
            onClick={() => setWhichOne('declined')}
            className={classNames({
              'px-10 py-3 text-sm transition-all duration-300 text-[#287BCB] w-fit': true,
              'bg-[#287BCB] text-white': whichOne === 'declined',
            })}
          >
            Declined
          </button>
        </div>
        {/* Displaying Deliveries */}
        <div className="grid grid-cols-3 gap-4">
          {filterDeliveries().map((delivery: any, index: number) => (
            <ProductCard key={index} delivery={delivery} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUserHome;
