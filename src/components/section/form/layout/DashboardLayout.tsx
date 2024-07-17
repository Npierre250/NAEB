import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Avatar from "../../../ui/Avatar";
import ArrowCircle from "../../../vectors/ArrowCircle";
import Home, { Calling, Money, Profile } from "../../../vectors/Home";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import getUserInfo from "../../../../utils/getUserInfo";
import { TbReportSearch } from "react-icons/tb";

const MENUP_ONE = [
  {
    title: "Home",
    icon: <Home />,
    path: "/dashboard",
    counter: 1,
  },
];

const MENUP_TWO = [
  {
    title: "Profile",
    icon: <Profile />,
    path: "/dashboard/profile",
    counter: 0,
  },
  {
    title: "Subscription",
    icon: <Money />,
    path: "/dashboard/subscription",
    counter: 0,
  },
  {
    title: "Report",
    icon: <TbReportSearch size={30} />,
    path: "/dashboard/reports",
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
  const user = getUserInfo();
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

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getFormattedDate = () => {
    const date = new Date();
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    return `Today is ${dayName} ${day} ${month} ${year}`;
  };

  const [formattedDate, setFormattedDate] = useState(getFormattedDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDate(getFormattedDate());
    }, 1000 * 60); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

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

  // Remove the "Report" link if the user is not a super admin
  const filteredMenuPTwo = user?.data?.role==="superAdmin"
    ? MENUP_TWO
    : MENUP_TWO.filter((item) => item.title !== "Report");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (user) {
    return (
      <main className="bg-[#F6FAFF] w-full overflow-x-scroll">
        <div className="bg-white z-50 fixed w-full">
          <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between py-4">
            <div className="flex items-center gap-32">
              <Link to={"/"}>
                <img src="/logo-2.png" alt="logo" width={163} height={42} />
              </Link>
              <div className="flex items-center gap-4">
                <div className="flex space-y-2 flex-col">
                  <span className="font-semibold text-base capitalize">
                    Hi, {user.data.name}
                  </span>
                  <span className="text-[#615E69] text-sm capitalize">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-12 relative">
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setAddMenu(true)}
              >
                <Avatar title={user.data.name} subTitle="Kicukiro" />
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
                  <button
                    onClick={handleLogout}
                    className="w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-full">
          <div className="bg-white pt-24 fixed w-[300px] h-full z-50">
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
              {filteredMenuPTwo.map((item, index) => {
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
