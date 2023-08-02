/* eslint-disable @typescript-eslint/no-explicit-any */

function ArrowLine(props: any) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.852 5.825l8.563.599-.599 8.563m-12.231 2.59L18.287 6.535"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowLine;
