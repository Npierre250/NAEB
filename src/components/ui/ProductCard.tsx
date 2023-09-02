import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Close from "../vectors/Close";
import { supabase } from "../../supabase/client";
import classNames from "classnames";

export default function ProductCard({ data, setDelivery }: any) {
  const [loading, setLoading] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [product_name, setProduct_name] = useState(data.product_name);
  const [quantity, setQuantity] = useState(data.quantity);
  const [delivery_date, setDelivery_date] = useState(data.delivery_date);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setAddMenu(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  async function deleteFunc() {
    alert("Are you sure you want to delete this delivery ??");
    try {
      setLoading(true);
      await supabase.from("delivery").delete().eq("id", data.id).select();
      setDelivery((prev: any) => {
        return prev.filter((value: any) => value.id !== data.id);
      });
    } catch (error) {
      alert("Error deleting delivery");
    } finally {
      setLoading(false);
    }
  }

  async function updateDelivery() {
    if (
      product_name === "" ||
      quantity === "" ||
      delivery_date === "" ||
      !product_name ||
      !quantity ||
      !delivery_date
    ) {
      return;
    }
    try {
      setLoading(true);
      // const dates = new Date(delivery_date);
      await supabase
        .from("delivery")
        .update({
          product_name,
          quantity,
          delivery_date,
        })
        .eq("id", data.id)
        .select();
      setDelivery((prev: any) => {
        return prev.map((value: any) => {
          if (value.id === data.id) {
            return {
              ...value,
              product_name,
              quantity,
              delivery_date,
            };
          }
          return value;
        });
      });
      setAddMenu(false);
    } catch (error) {
      alert("Error updating delivery");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="border border-[#F3F3F3] rounded-md px-4 py-3 h-fit">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[#615E69] text-sm capitalize">Products</span>
          <span className="font-normal text-sm capitalize inline-flex items-center gap-2">
            {data.product_name}
          </span>
        </div>
        <span className="text-[#00A0DE] text-sm font-semibold capitalize">
          {data.status}
        </span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-[#615E69] text-sm capitalize">Quantity</span>
          <span className="font-normal text-sm capitalize inline-flex items-center gap-2">
            {data.quantity}Kg
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[#615E69] text-sm capitalize">
              Delivery date
            </span>
            <span className="font-normal text-sm capitalize inline-flex items-center gap-2">
              {data.delivery_date}
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
                    <Close />
                  </button>
                </div>
                <input
                  onChange={(e) => setProduct_name(e.target.value)}
                  defaultValue={data.product_name}
                  className="border px-2 py-1.5 rounded-lg placeholder:text-black/70 outline-none"
                  placeholder="Add product title"
                />
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  defaultValue={data.quantity}
                  className="border px-2 py-1.5 rounded-lg placeholder:text-black/70 outline-none"
                  placeholder="Products weight"
                />
                <input
                  onChange={(e) => setDelivery_date(e.target.value)}
                  placeholder={data.delivery_date}
                  value={delivery_date}
                  className="border px-2 py-1.5 rounded-lg placeholder:text-black/70 outline-none"
                  // type="date"
                  // placeholder="Products weight"
                />

                <div className="flex gap-2 items-center mx-auto mt-3">
                  <button
                    onClick={() => setAddMenu(false)}
                    className="px-6 py-2  rounded-full text-sm transition-all duration-300 text-[#A7A7A7] bg-[#FCFBFB]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateDelivery}
                    className={classNames({
                      "px-6 py-2  rounded-full text-sm transition-all duration-300 text-white bg-[#287BCB] ":
                        true,
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
}
