import { Link, NavLink, Outlet } from "react-router-dom";
import Avatar from "../../../ui/Avatar";
import ArrowCircle from "../../../vectors/ArrowCircle";
import Notificatioin from "../../../vectors/Notificatioin";
import Home, { Calling, Delival, Profile } from "../../../vectors/Home";
import classNames from "classnames";
import Schedule from "../../../vectors/Schedule";

const MENUP_ONE = [
  {
    title: "Home",
    icon: <Home />,
    path: "/dashboard",
    counter: 1,
  },
  {
    title: "Deliveries",
    icon: <Delival />,
    path: "/dashboard/deliveries",
    counter: 0,
  },
  {
    title: "Schedule",
    icon: <Schedule />,
    path: "/dashboard/schedule",
    counter: 3,
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
    title: "Calling",
    icon: <Calling />,
    path: "/dashboard/calling",
    counter: 0,
  },
];

export default function DashboardLayout() {
  return (
    <main className="bg-[#F6FAFF] w-full h-screen overflow-hidden">
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between py-4">
          <div className="flex items-center gap-32">
            <Link to={"/"}>
              <img src="/logo-2.png" alt="logo" width={163} height={42} />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-[#707070] font-semibold">Schedule</span>
              <button className="text-[#63BCFF] font-semibold">4 new</button>
            </div>
          </div>
          <div className="flex items-center gap-12">
            <Notificatioin className="w-6 h-6" />
            <div className="flex items-center gap-4">
              <Avatar title="Mwizera aime" subTitle="Kicukiro" />
              <ArrowCircle />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full">
        <div className="bg-white w-[300px] pt-10">
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
                          "absolute top-0 left-0 w-1 h-full bg-[#63BCFF]": true,
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
          <div className="flex flex-col items-center gap-1 mt-20">
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
                          "absolute top-0 left-0 w-1 h-full bg-[#63BCFF]": true,
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
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
