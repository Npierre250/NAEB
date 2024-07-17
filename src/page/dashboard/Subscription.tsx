import { CheckCircleIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import { closePaymentModal, FlutterWaveButton, useFlutterwave } from "flutterwave-react-v3";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Close from "../../components/vectors/Close";
import { toast } from "react-hot-toast";
import getUserInfo from "../../utils/getUserInfo";
import axios from "axios";

export default function Subscription() {
  const user:any=getUserInfo()
  const includedFeatures = [
    "Private forum access",
    "Member resources",
    "Entry to annual conference",
    "Official member t-shirt",
  ];

  const [showPop, setShowPop] = useState(false);
  const [payNumber, setPayNumber] = useState("");

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowPop(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const [loading, setLoading] = useState(false);
  const config = {
    public_key: 'FLWPUBK_TEST-cd7e40ef021af3b02cdb4391b5c08f37-X',
    tx_ref: Date.now().toString(),
    amount: 300,
    currency: 'RWF',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.data.email,
      phone_number: payNumber,
      name: user.data.name,
    },
    customizations: {
      title: 'Neab',
      description: 'Neab Payment',
      logo: 'https://neab.vercel.app/logo.png',
    },
  };
  const token=localStorage.getItem("token")
  console.log("token===",token)
  const fwConfig = {
    ...config,
    text: 'Pay Now',
    callback: async (response: any) => {
      console.log(response);

      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/subscription`, {
          userId: user.data._id,
          //  '6655dd888ea19671cd4a9d7e', // Replace with actual user ID
          amount: 300,
          currency: 'RWF',
          beneficiaryName: 'kairosmartial', 
          sender: 'Flutterwave Developers',
          senderCountry: 'RWF',
          mobileNumber: '23457558595'
        },{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });

        closePaymentModal();
      } catch (error) {
        console.error('Subscription creation failed:', error);
      }
    },
    onClose: () => {},
  };

  return (
    <>
      <section className="w-full h-full">
        <div className="bg-gray-100">
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                  Simple no-tricks pricing
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                  If you're not satisfied, contact us within the first 14 days
                  and we'll send you a full refund.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-gray-100" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                  <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                    <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      Lifetime Membership
                    </h3>
                    <p className="mt-6 text-base text-gray-500">
                      Lorem ipsum dolor sit amet consect etur adipisicing elit.
                      Itaque amet indis perferendis blanditiis repellendus etur
                      quidem assumenda.
                    </p>
                    <div className="mt-8">
                      <div className="flex items-center">
                        <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                          What's included
                        </h4>
                        <div className="flex-1 border-t-2 border-gray-200" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                      >
                        {includedFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start lg:col-span-1"
                          >
                            <div className="flex-shrink-0">
                              <CheckCircleIcon
                                className="h-5 w-5 text-green-400"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-sm text-gray-700">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    <p className="text-lg leading-6 font-medium text-gray-900">
                      Pay once, use it forever
                    </p>
                    <div className="mt-4 flex items-center justify-center text-3xl font-extrabold text-gray-900">
                      <span>3,00,000 </span>
                      <span className="ml-3 text-xl font-medium text-gray-500">
                        FRW
                      </span>
                    </div>
                    <p className="mt-4 text-sm">
                      <a
                        href="#"
                        className="font-medium text-gray-500 underline"
                      >
                        Learn about our membership policy
                      </a>
                    </p>
                    <div className="mt-6">
                      <div className="rounded-md shadow">
                        <a
                          onClick={() => setShowPop(true)}
                          className="flex items-center cursor-pointer justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                        >
                          Get Access
                        </a>
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <a href="#" className="font-medium text-gray-900">
                        Get a free sample{" "}
                        <span className="font-normal text-gray-500">
                          (20MB)
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPop && (
        <div className="fixed w-full h-full bg-black/50 left-0 top-0 z-[100] flex items-center justify-center">
          <div
            ref={ref}
            className="max-w-lg  bg-white rounded-md overflow-hidden w-full"
          >
            <div className="py-8 px-8 bg-[#EDEEF2] text-white">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-[20px] font-medium text-[#63bcff]">
                    Fill the form to pay
                  </p>
                  <p className="text-[#9c9c9c] leading-none">
                    Lorem Ipsum is simply dummy text of the printing{" "}
                  </p>
                </div>
                <button onClick={handleClickOutside}>
                  <Close />
                </button>
              </div>
            </div>
            <div className="px-8 mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span>Phone Number:</span>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setPayNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className={classNames({
                    "bg-[#E8E8EA] w-full py-4 px-6 rounded-2xl border focus:border-black focus:outline-none transition-all placeholder:font-light placeholder:text-[17px] placeholder:text-[#BBBABF] ":
                      true,
                  })}
                />
                  <FlutterWaveButton {...fwConfig} />
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
