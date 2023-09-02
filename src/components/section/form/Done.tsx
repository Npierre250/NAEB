import { useNavigate } from "react-router-dom";

export default function Done() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md w-full px-4 text-center items-center flex flex-col">
      <span className="text-[#287BCB] font-light">Packhouse</span>
      <h3 className="text-4xl font-bold text-[#287BCB] mb-1">Application</h3>
      <p>
        Thank you for apply for Naeb packhouse service please wait for an email
        or message ony you contacts
      </p>
      <button
        onClick={() => navigate("/")}
        className="py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3"
      >
        Back to home
      </button>
    </div>
  );
}
