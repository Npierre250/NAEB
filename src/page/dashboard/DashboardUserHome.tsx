import classNames from "classnames";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ui/ProductCard";
import { supabase } from "../../supabase/client";
import { useAuth } from "../../context/userManager";

export default function DashboardUserHome() {
  const [loading, setLoading] = useState(false);
  const [whichOne, setWhichOne] = useState(0);
  const [backup, setBackup] = useState<any>([]);
  const [delivery, setDelivery] = useState<any>([]);
  const [product_name, setProduct_name] = useState<any>("");
  const [quantity, setQuantity] = useState<any>("");
  const [delivery_date, setDelivery_date] = useState<any>("");
  const { user }: any = useAuth();
  useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("delivery").select("*");
      if (error) {
        console.log(error);
      }
      setDelivery(data);
      setBackup(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    setDelivery(() => {
      if (whichOne === 0) {
        return backup;
      }
      if (whichOne === 1) {
        return backup.filter((value: any) => value.status === "pending");
      }
      if (whichOne === 2) {
        return backup.filter((value: any) => value.status === "approve");
      }
      return backup;
    });
  }, [whichOne]);

  async function sumbitDelivery() {
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
      const dates = new Date(delivery_date);
      const { data: resp }: any = await supabase
        .from("delivery")
        .insert([
          {
            product_name,
            quantity,
            delivery_date: `${
              dates.getMonth() + 1
            }/${dates.getDate()}/${dates.getFullYear()}`,
            user_name: user.email.split("@")[0],
          },
        ])
        .select();
      delivery.push(...resp);
    } catch (error) {
      alert("Error updating delivery");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex gap-4">
        <div className="w-[400px] bg-white rounded-lg px-8 py-6 flex gap-5 flex-col">
          <span>Total deliveries</span>
          <span className="font-semibold text-[30px]">
            {backup.reduce(
              (a: { quantity: any }, b: { quantity: any }) => a + b.quantity,
              0
            )}{" "}
            kg
          </span>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <span className="w-0.5 h-full bg-[#00A0DE]" />
              <div className="flex flex-col">
                <span className="text-[#615E69] text-sm capitalize">
                  Pending
                </span>
                <span className="font-semibold text-sm capitalize inline-flex items-center gap-2">
                  {backup
                    .filter((value: any) => value.status === "pending")
                    .reduce(
                      (a: number, b: { quantity: number }) => a + b.quantity,
                      0
                    )}{" "}
                  kg{" "}
                  <span className="text-[9px] text-[#00A0DE] py-[1px] px-[4px] rounded-full bg-[#CDE8FD]">
                    {(
                      (backup.filter((value: any) => value.status === "pending")
                        .length *
                        100) /
                      backup.length
                    ).toFixed(0)}{" "}
                    %
                  </span>
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-0.5 h-full bg-[#00A0DE]" />
              <div className="flex flex-col">
                <span className="text-[#615E69] text-sm capitalize">
                  Delivered
                </span>
                <span className="font-semibold text-sm capitalize inline-flex items-center gap-2">
                  {backup
                    .filter((value: any) => value.status === "approve")
                    .reduce(
                      (a: { quantity: any }, b: { quantity: any }) =>
                        a + b.quantity,
                      0
                    )}{" "}
                  kg{" "}
                  <span className="text-[9px] text-[#00A0DE] py-[1px] px-[4px] rounded-full bg-[#CDE8FD]">
                    {(
                      (backup.filter((value: any) => value.status === "approve")
                        .length *
                        100) /
                      backup.length
                    ).toFixed(0)}{" "}
                    %
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-8 py-6 flex gap-5 flex-col w-full">
          <h4 className="font-semibold text-[20px]">New delivery</h4>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col gap-2">
              <span className="font-light">Product name</span>
              <input
                placeholder="Product name"
                required
                onChange={(e) => setProduct_name(e.target.value)}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-light">Quantity</span>
              <input
                placeholder="Quantity"
                required
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-light">Delivery Date</span>
              <input
                placeholder="Delivery Date"
                required
                type="date"
                onChange={(e) => setDelivery_date(e.target.value)}
                className="w-full py-3 px-3 outline-none border-none bg-[#F0F8FF] placeholder:text-[#CACACA] font-light"
              />
            </div>
          </div>
          <button
            disabled={loading}
            onClick={sumbitDelivery}
            className={classNames({
              "px-10 py-3 text-sm transition-all duration-300 text-white w-fit ml-auto bg-[#287BCB]":
                true,
              "cursor-wait opacity-60": loading,
            })}
          >
            Add delivery
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg px-8 py-6 flex gap-5 flex-col w-full overflow-auto">
        {delivery && (
          <div className="flex items-center border border-[#287BCB] w-fit m-0 p-0">
            <button
              onClick={() => setWhichOne(0)}
              className={classNames({
                "px-10 py-3 text-sm transition-all duration-300 text-[#287BCB] w-fit":
                  true,
                " bg-[#287BCB] text-white": whichOne === 0,
              })}
            >
              All
            </button>
            <button
              onClick={() => setWhichOne(1)}
              className={classNames({
                "px-10 py-3 text-sm transition-all duration-300 border-x w-fit text-[#287BCB]":
                  true,
                "bg-[#287BCB] text-white border-transparent": whichOne === 1,
                " border-[#287BCB]": whichOne !== 1,
              })}
            >
              Pending
            </button>
            <button
              onClick={() => setWhichOne(2)}
              className={classNames({
                "px-10 py-3 text-sm transition-all duration-300  w-fit text-[#287BCB]":
                  true,
                "bg-[#287BCB] text-white": whichOne === 2,
              })}
            >
              Delivered
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-10 overflow-auto h-[40vh]">
          {delivery.length === 0 ? (
            <div className="flex flex-col">
              <p>It is Empty</p>
            </div>
          ) : (
            delivery.map((value: any, index: any) => {
              return (
                <ProductCard
                  setDelivery={setDelivery}
                  key={index}
                  data={value}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
