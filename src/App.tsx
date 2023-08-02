import classNames from "classnames";
import { useState } from "react";
import FAQ from "./data/fqa.json";
import Arrow from "./components/vectors/Arrow";
import ArrowLine from "./components/vectors/ArrowLine";

function App() {
  const [active, setActive] = useState(1);
  return (
    <main>
      <section className="bg-[#287BCB] h-[850px] relative">
        <img
          src="/bg.png"
          alt="bg"
          className="absolute left-0 right-0 mx-auto bottom-0"
        />
        <div className="max-w-7xl mx-auto py-8 flex justify-between items-center px-3">
          <button>
            <img src="/logo.png" alt="logo" width={218.25} height={53} />
          </button>
          <div className="flex gap-12">
            {["Packouse", "How it works", "Log in", "Sign up"].map(
              (val, index) => {
                return (
                  <button
                    className="text-white font-bold text-base hover:underline"
                    key={index}
                  >
                    {val}
                  </button>
                );
              }
            )}
          </div>
        </div>
        <div className="flex justify-center items-center flex-col md:w-[40%] mx-auto mt-14 gap-6">
          <p className="text-[23px] font-bold text-white">
            Growing Agricultural Exports
          </p>
          <h1 className="text-4xl leading-[50px] font-bold text-white text-center">
            "Ensure Food{" "}
            <mark className="bg-transparent text-[#00BFD3]">Quality</mark> and
            Gain Trust - Schedule Your Food Check Online Today!"
          </h1>
          <button className="py-3 bg-[#00BFD3] px-9 rounded-2xl text-white">
            Get started
          </button>
        </div>
      </section>
      <section className="max-w-6xl mx-auto mt-24 px-3">
        <h2 className="text-3xl font-extrabold text-center max-w-xs mx-auto">
          How online{" "}
          <mark className="bg-transparent text-[#287BCB]">Pack house </mark>{" "}
          work
        </h2>
        <div className="grid grid-cols-2 gap-[200px] mt-20">
          <div className="grid gap-16">
            <div className="flex flex-col gap-4">
              <img
                src="/card-1.png"
                alt="packhouse"
                width={520}
                height={296}
                className="w"
              />
              <h4 className="text-xl font-bold">NAEB Member application</h4>
              <p>
                to work with our online packouse services you have to be member
                of Naeb if you are not alread apply here{" "}
              </p>
              <button className="py-3 bg-[#287BCB] px-9 w-fit rounded-2xl text-white">
                Apply now
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <img
                src="/card-2.png"
                alt="packhouse"
                width={520}
                height={296}
                className="w"
              />
              <h4 className="text-xl font-bold"> Online Scheduling</h4>
              <p>
                start scheduling your deliveries by using our scheduling
                calendar layout by clicking on date you fill an easy form
              </p>
              <button className="py-3 bg-[#287BCB] px-9 w-fit rounded-2xl text-white">
                Start now
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 m-auto">
            <img
              src="/card-3.png"
              alt="packhouse"
              width={520}
              height={296}
              className="w"
            />
            <h4 className="text-xl font-bold">Online Packhouse registration</h4>
            <p>
              Use your Naeb application CODE to have account online pachkhouse
            </p>
            <button className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-fit">
              Register now
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#F6FBFF] py-12 mt-20">
        <div className="max-w-6xl mx-auto px-3">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="md:w-3/4">
              <h2 className="text-2xl font-extrabold">FAQ</h2>
            </div>
            <div className="flex flex-col gap-4">
              {FAQ.map((item) => {
                return (
                  <div
                    className={classNames({
                      "px-4 pt-4 pb-2 rounded-lg transition-all duration-100 ease-in-out bg-white":
                        true,
                    })}
                    key={item.id}
                  >
                    <div
                      className="flex gap-2 items-start cursor-pointer"
                      role="button"
                      onClick={() => {
                        if (item.id === active) {
                          setActive(0);
                        } else {
                          setActive(item.id);
                        }
                      }}
                    >
                      <button>
                        <Arrow
                          className={classNames({
                            "rotate-90": active === item.id,
                            "-rotate-90": active !== item.id,
                            "transition-all duration-100 ease-in-out w-7 stroke-black":
                              true,
                          })}
                        />
                      </button>
                      <div className="mt-1">
                        <h4 className="font-semibold">{item.question}</h4>
                        <p
                          className={classNames({
                            "h-0": active !== item.id,
                            "h-[200px] md:h-[120px]": active === item.id,
                            "transition-all duration-300 ease-in-out mt-3 overflow-hidden":
                              true,
                          })}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#287BCB] pt-12">
        <div className="max-w-6xl mx-auto px-3">
          <div className="flex justify-between">
            <div>
              <button>
                <img src="/logo.png" alt="logo" width={218.25} height={53} />
              </button>
            </div>
            <div className="flex gap-2 w-fit justify-end">
              <div className="flex flex-col gap-2 w-1/2">
                <p className="w-[70%] text-white">
                  Reach out to us to know how our service can help you to reach
                  to your goals
                </p>
                <p className="text-[#00BFD3]">Onlinepackhouse@gmail.com</p>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-[#00BFD3] font-semibold">Useful links</h4>
                <div className="flex gap-4">
                  {["Home", "How it works", "Application", "Faq"].map(
                    (item, index) => {
                      return (
                        <button key={index} className="flex gap-2 items-center">
                          <span className="text-white w-fit">{item}</span>
                          <ArrowLine className="w-5 stroke-white" />
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-[#509AE0] mt-8" />
        <div className="max-w-6xl mx-auto px-3 flex items-center justify-between text-white py-4">
          <p>@2023 online packhouse</p>
          <p>Terms and conditions</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
