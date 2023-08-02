/* eslint-disable @typescript-eslint/no-explicit-any */

function CircleSvg(props: any) {
  return (
    <svg
      width={594}
      height={549}
      viewBox="0 0 594 549"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={111.5}
        cy={482.5}
        r={482.5}
        fill="url(#paint0_radial_38_209)"
        fillOpacity={0.74}
      />
      <defs>
        <radialGradient
          id="paint0_radial_38_209"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 -185.5 297) scale(482.5)"
        >
          <stop stopColor="#00A0DE" />
          <stop offset={1} stopColor="#00A0DE" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function CircleSvgRight(props: any) {
  return (
    <svg
      width={680}
      height={575}
      viewBox="0 0 680 575"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={482.5}
        cy={482.5}
        r={482.5}
        fill="url(#paint0_radial_38_210)"
        fillOpacity={0.74}
      />
      <defs>
        <radialGradient
          id="paint0_radial_38_210"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 0 482.5) scale(482.5)"
        >
          <stop stopColor="#00A0DE" />
          <stop offset={1} stopColor="#00A0DE" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}
export default CircleSvg;
