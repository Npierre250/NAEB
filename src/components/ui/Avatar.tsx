export default function Avatar({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <div className="flex gap-1.5 items-center">
      <div className="flex items-center justify-center bg-[#D7EBFE] w-12 h-12 rounded-full">
        <span className="uppercase font-bold text-3xl text-[#82C1FE]">
          {title[0]}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-base capitalize">{title}</span>
        <span className="text-[#615E69] text-sm capitalize">{subTitle}</span>
      </div>
    </div>
  );
}
