export default function NotFound() {
  return (
    <section className="w-full h-full">
      <div className="flex items-center h-[80%] px-6 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 ">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>
        </div>
      </div>
    </section>
  );
}
