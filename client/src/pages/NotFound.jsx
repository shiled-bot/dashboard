import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="px-3 absolute text-center top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex justify-center items-center flex-col">
      <h1 className="font-bold text-3xl text-white-100 mb-2 md:text-4xl">Page Not Found</h1>
      <p className="text-white-200 text-sm md:text-base">We can’t seem to find the page you are looking for</p>
      <Link to="/" className="p-2 px-3 bg-blue text-white-100 mt-4 rounded md:mt-5 md:px-6 md:rounded-xl transition-transform hover:scale-105">Home</Link>
    </div>
  );
};

export default NotFound