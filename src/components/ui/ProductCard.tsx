import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import toast from 'react-hot-toast';

type Status = 'pending' | 'approved' | 'rejected';

interface Delivery {
  _id: string;
  username: string;
  userEmail: string;
  productTitle: string;
  productWeight: number;
  deliveryTime: string;
  reminder: string;
  status: Status;
}

const ProductCard: React.FC<{ delivery: Delivery }> = ({ delivery }) => {
  const { _id, productTitle, productWeight, deliveryTime, reminder, status } = delivery;
  const [addMenu, setAddMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product_name, setProduct_name] = useState(productTitle);
  const [quantity, setQuantity] = useState(productWeight.toString());
  const [delivery_date, setDelivery_date] = useState(deliveryTime.split('T')[0]); // Format date as YYYY-MM-DD
  const ref = useRef(null);

  const statusColors: Record<Status, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const updateDelivery = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productTitle: product_name,
          productWeight: quantity,
          deliveryTime: delivery_date,
          reminder,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update schedule');
      }


      const data = await response.json();
      console.log(data);
      toast.success("product updated successfully!!")
      window.location.reload()
      setAddMenu(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFunc = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/schedules/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete schedule');
      }
      toast.success('Schedule deleted successfully');
      window.location.reload(); // Reload the page after successful deletion
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-[#F3F3F3] rounded-md px-4 py-3 h-fit bg-white shadow-md w-fit">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[#615E69] text-sm capitalize">Product</span>
          <span className="font-normal text-sm capitalize inline-flex items-center gap-2">
            {productTitle}
          </span>
        </div>
        <span className={`text-sm font-semibold capitalize ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-[#615E69] text-sm capitalize">Quantity</span>
          <span className="font-normal text-sm capitalize inline-flex items-center gap-2">
            {productWeight} kg
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[#615E69] text-sm capitalize">Delivery date</span>
            <span className="font-normal text-sm capitalize inline-flex items-center gap-2">
              {new Date(deliveryTime).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              className="px-4 py-2 rounded-full bg-[#EDF6FF] text-sm text-[#00A0DE]"
              onClick={() => setAddMenu(true)}
            >
              Edit
            </button>
            {addMenu && (
              <div
                ref={ref}
                className="absolute top-10 z-50 -right-0 w-[300px] flex flex-col gap-2 bg-white rounded-2xl shadow-2xl px-4 py-4 overflow-auto"
              >
                <div className="flex justify-between mb-3">
                  <span>Update deliveries</span>
                  <button onClick={() => setAddMenu(false)}>
                    <span>&times;</span> {/* Replace with an icon or SVG */}
                  </button>
                </div>
                <input
                  onChange={(e) => setProduct_name(e.target.value)}
                  value={product_name}
                  className="border px-2 py-1.5 rounded-lg placeholder:text-black/70 outline-none"
                  placeholder="Add product name"
                />
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  type="number"
                  className="border px-2 py-1.5 rounded-lg placeholder:text-black/70 outline-none"
                  placeholder="Product quantity"
                />
                <input
                  onChange={(e) => setDelivery_date(e.target.value)}
                  placeholder="Delivery date"
                  value={delivery_date}
                  className="border px-2 py-1.5 rounded-lg placeholder:text-black/70 outline-none"
                  type="date"
                />

                <div className="flex gap-2 items-center mx-auto mt-3">
                  <button
                    onClick={() => setAddMenu(false)}
                    className="px-6 py-2 rounded-full text-sm transition-all duration-300 text-[#A7A7A7] bg-[#FCFBFB]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateDelivery}
                    className={classNames({
                      "px-6 py-2 rounded-full text-sm transition-all duration-300 text-white bg-[#287BCB]": true,
                      "cursor-wait opacity-60": loading,
                    })}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={deleteFunc}
              className="px-4 py-2 rounded-full bg-[#ffeded] text-sm text-[#de3400bc]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
