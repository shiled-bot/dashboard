const Error = ({
  message = "Something went wrong while the process",
  children,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex flex-col items-center md:items-start justify-center px-4 md:pl-10">
      <h2 className="text-white-100 text-2xl md:text-4xl font-bold text-center md:text-left">
        Something went wrong
      </h2>
      <p className="text-white-200 mt-2 text-center text-sm md:text-base md:text-left">
        {message}
      </p>

    {/* Buttons */}
    {children}

    </div>
  );
};

export default Error;
