import { CheckCircleIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Close from "../../components/vectors/Close";
import { FiX } from "react-icons/fi";

export default function Subscription() {
  const includedFeatures = [
    "Private forum access",
    "Member resources",
    "Entry to annual conference",
    "Official member t-shirt",
  ];

  const [showPop, setShowPop] = useState(false);

  const [paymentSym, setPaymentSym] = useState<string | undefined>();

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowPop(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPop(false);
      window.open(
        "https://payments.paypack.rw/link/plink_6wPa39husFXVEme7ZWOA",
        "_blank"
      );
    }, 3000);
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
            <div className="flex flex-col px-8 mt-6 gap-1">
              <span>Select the method:</span>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setPaymentSym("mtn")}
                  className={classNames({
                    "rounded-md gap-4 cursor-pointer w-full py-2.5 px-4 flex items-center justify-between transition-all duration-300":
                      true,
                    "bg-[#EDEEF2]": paymentSym !== "mtn",
                    "bg-[#63bcff]": paymentSym === "mtn",
                  })}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg"
                    alt=""
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full overflow-hidden object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <p
                      className={classNames({
                        "leading-none font-light text-[16px]": true,
                        "text-[#63bcff]": paymentSym !== "mtn",
                        "text-white": paymentSym === "mtn",
                      })}
                    >
                      Mobile Money
                    </p>
                    <p
                      className={classNames({
                        "leading-none font-light text-[13px]": true,
                        "text-[#9c9c9c]": paymentSym !== "mtn",
                        "text-white": paymentSym === "mtn",
                      })}
                    >
                      MTN
                    </p>
                  </div>
                  <FiX
                    onClick={(e) => {
                      if (paymentSym === "mtn") {
                        setPaymentSym(undefined);
                        e.stopPropagation();
                      }
                    }}
                    className={classNames({
                      "text-white": paymentSym === "mtn",
                      "text-transparent": paymentSym !== "mtn",
                    })}
                  />
                </div>
                <div
                  onClick={() => setPaymentSym("airtel")}
                  className={classNames({
                    "rounded-md gap-4 cursor-pointer w-full py-2.5 px-4 flex items-center justify-between transition-all duration-300":
                      true,
                    "bg-[#EDEEF2]": paymentSym !== "airtel",
                    "bg-[#63bcff]": paymentSym === "airtel",
                  })}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Airtel_logo-01.png"
                    alt=""
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full overflow-hidden object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <p
                      className={classNames({
                        "leading-none font-light text-[16px]": true,
                        "text-[#63bcff]": paymentSym !== "airtel",
                        "text-white": paymentSym === "airtel",
                      })}
                    >
                      Mobile Money
                    </p>
                    <p
                      className={classNames({
                        "leading-none font-light text-[13px]": true,
                        "text-[#9c9c9c]": paymentSym !== "airtel",
                        "text-white": paymentSym === "airtel",
                      })}
                    >
                      Airtel
                    </p>
                  </div>
                  <FiX
                    onClick={(e) => {
                      if (paymentSym === "airtel") {
                        setPaymentSym(undefined);
                        e.stopPropagation();
                      }
                    }}
                    className={classNames({
                      "text-white": paymentSym === "airtel",
                      "text-transparent": paymentSym !== "airtel",
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="px-8 mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span>Phone Number:</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your phone number"
                  className={classNames({
                    "bg-[#E8E8EA] w-full py-4 px-6 rounded-2xl border focus:border-black focus:outline-none transition-all placeholder:font-light placeholder:text-[17px] placeholder:text-[#BBBABF] ":
                      true,
                  })}
                />
                <button type="button" className="flex gap-2 items-center">
                  <div
                    className={classNames({
                      "w-4 h-4 bg-primary rounded-full transition-all duration-100 delay-100":
                        true,
                    })}
                  ></div>
                  <span className="text-sm">
                    You are paying <b>3,00,000 Frw</b>
                  </span>
                </button>
              </div>
              <button
                disabled={loading}
                onClick={handlePay}
                type="button"
                className="w-full py-4 mb-8 rounded-2xl text-white font-semibold text-lg transition-all duration-300 bg-[#63bcff]"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
