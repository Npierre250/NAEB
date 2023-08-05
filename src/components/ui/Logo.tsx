import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <img src="/logo.png" alt="logo" width={218.25} height={53} />
    </Link>
  );
}
