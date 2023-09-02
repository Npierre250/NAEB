import { Calling as IconCalling } from "../../components/vectors/Home";
export default function Calling() {
  return (
    <section className="w-full h-full">
      <div className="flex items-center h-[80%] px-6 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 ">
            <IconCalling />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            Call Us
          </h1>
          <p className="mt-4 text-gray-500 ">
            You can call use using this number and we will be there to help you{" "}
            <a className="underline text-blue-500" href="tel:+250789034272">
              +250 789 034 272
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
