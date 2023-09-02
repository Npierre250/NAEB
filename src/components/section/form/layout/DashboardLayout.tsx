import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../../../ui/Avatar";
import ArrowCircle from "../../../vectors/ArrowCircle";
import Home, { Calling, Profile } from "../../../vectors/Home";
import classNames from "classnames";
import { useAuth } from "../../../../context/userManager";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { supabase } from "../../../../supabase/client";

const MENUP_ONE = [
  {
    title: "Home",
    icon: <Home />,
    path: "/dashboard",
    counter: 1,
  },
  // {
  //   title: "Deliveries",
  //   icon: <Delival />,
  //   path: "/dashboard/deliveries",
  //   counter: 0,
  // },
  // {
  //   title: "Schedule",
  //   icon: <Schedule />,
  //   path: "/dashboard/schedule",
  //   counter: 3,
  // },
];
const MENUP_TWO = [
  {
    title: "Profile",
    icon: <Profile />,
    path: "/dashboard/profile",
    counter: 0,
  },
  {
    title: "Calling",
    icon: <Calling />,
    path: "/dashboard/calling",
    counter: 0,
  },
];

export default function DashboardLayout() {
  const { user, setUser }: any = useAuth();
  const [addMenu, setAddMenu] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = () => {
    setAddMenu(false);
  };
  useOnClickOutside(ref, handleClickOutside);
  const navigate = useNavigate();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  async function logoutFunc() {
    if (confirm("Are sure you want logout ??")) {
      // await supabase.auth.signOut();
      navigate("/");
      setUser(null);
    }
  }

  useEffect(() => {
    if (user === null) navigate("/");
  }, [user]);
  if (user === false) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#F6FAFF]">
        <img src="/loading.gif" alt="" width={100} height={100} />
      </div>
    );
  }
  if (user) {
    return (
      <main className="bg-[#F6FAFF] w-full">
        <div className="bg-white z-50 fixed w-full">
          <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between py-4">
            <div className="flex items-center gap-32">
              <Link to={"/"}>
                <img src="/logo-2.png" alt="logo" width={163} height={42} />
              </Link>
              <div className="flex items-center gap-4">
                <div className="flex space-y-2 flex-col">
                  <span className="font-semibold text-base capitalize">
                    Hi, {user.email.split("@")[0]}
                  </span>
                  <span className="text-[#615E69] text-sm capitalize">
                    Today is {daysOfWeek[new Date().getDay()] || "Sunday"}{" "}
                    {new Date().getDate()} September 2023
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-12 relative">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setAddMenu(true)}
              >
                <Avatar title={user.email.split("@")[0]} subTitle="Kicukiro" />
                <ArrowCircle />
              </div>
              {addMenu && (
                <div
                  ref={ref}
                  className="absolute z-[100] flex flex-col items-start gap-2 w-full p-2 px-4 -bottom-[75px] rounded-md bg-white shadow-2xl"
                >
                  <button className="w-full text-left">
                    <Link
                      onClick={() => {
                        setAddMenu(false);
                      }}
                      to={"profile"}
                    >
                      Profile
                    </Link>
                  </button>
                  <button onClick={logoutFunc} className="w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-full">
          <div className="bg-white pt-24 fixed w-[300px] h-full">
            <div className="flex flex-col items-center gap-1">
              {MENUP_ONE.map((item, index) => {
                return (
                  <NavLink
                    to={item.path}
                    style={{ width: "100%" }}
                    key={index}
                    end
                  >
                    {({ isActive }) => (
                      <div className="flex relative items-center justify-between py-4 w-full px-8 ">
                        <div className="gap-2 items-center flex">
                          {item.icon}
                          <span className="text-[#4A4754]">{item.title}</span>
                        </div>

                        {item.counter > 0 && (
                          <div className="w-5 h-5 bg-[#63BCFF] rounded-full text-sm text-white items-center justify-center flex">
                            {item.counter}
                          </div>
                        )}
                        <span
                          className={classNames({
                            "absolute top-0 left-0 w-1 h-full bg-[#63BCFF]":
                              true,
                            "opacity-0": !isActive,
                            "opacity-100": isActive,
                          })}
                        />
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
            <div className="flex flex-col items-center gap-1 mt-10">
              {MENUP_TWO.map((item, index) => {
                return (
                  <NavLink to={item.path} style={{ width: "100%" }} key={index}>
                    {({ isActive }) => (
                      <div className="flex relative items-center justify-between py-4 w-full px-8 ">
                        <div className="gap-2 items-center flex">
                          {item.icon}
                          <span className="text-[#4A4754]">{item.title}</span>
                        </div>

                        {item.counter > 0 && (
                          <div className="w-5 h-5 bg-[#63BCFF] rounded-full text-sm text-white items-center justify-center flex">
                            {item.counter}
                          </div>
                        )}
                        <span
                          className={classNames({
                            "absolute top-0 left-0 w-1 h-full bg-[#63BCFF]":
                              true,
                            "opacity-0": !isActive,
                            "opacity-100": isActive,
                          })}
                        />
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="flex-1 pl-[300px] pt-24">
            <Outlet />
          </div>
        </div>
      </main>
    );
  }
}
