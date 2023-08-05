import classNames from "classnames";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Input({
  label,
  defaultValue,
  name,
  errors,
  register,
  ...rest
}: any) {
  return (
    <div>
      <label htmlFor={label} className="block capitalize text-[17px]">
        {label}
      </label>
      <div className="mt-1">
        <input
          name={name}
          defaultValue={defaultValue}
          {...register(name)}
          {...rest}
          className={classNames({
            "bg-[#E8E8EA] w-full py-4 px-6 rounded-2xl border focus:border-black focus:outline-none transition-all placeholder:font-light placeholder:text-[17px] placeholder:text-[#BBBABF] ":
              true,
            "border-red-500": errors[name],
            "border-transparent": !errors[name],
          })}
        />
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm">*{errors[name].message}</span>
      )}
    </div>
  );
}

export function DisableIInput({ ...rest }: any) {
  return (
    <div>
      <div className="mt-1">
        <input
          {...rest}
          className="bg-[#E8E8EA] w-full py-4 px-6 rounded-2xl border border-transparent focus:border-black focus:outline-none transition-all placeholder:font-light placeholder:text-[17px] placeholder:text-[#BBBABF] "
        />
      </div>
    </div>
  );
}
