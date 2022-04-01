import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../components/Error";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const codeGrant = queryParams.get("code");

  useEffect(() => {
    (async function () {      
      if (codeGrant) {
        fetch(process.env.REACT_APP_API_URL + "/login", {
          method: "post",
          body: JSON.stringify({ codeGrant }),
          headers: { "content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) return setError(true);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          })
          .catch(err => {
            setError(true);
          });
      } else window.location.replace(process.env.REACT_APP_OAuth2_URL);
    })();
  }, []);

  if (!error) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-[#000] opacity-75 flex flex-col items-center justify-center">
        <svg
          role="status"
          className="mr-2 h-20 w-20 text-gray-200 animate-spin text-white-300"
          viewBox="0 0 100 101"
          fill="#00abec"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          ></path>
        </svg>
        <h2 className="text-center text-white-100 text-md font-semibold my-1 mt-3">
          {codeGrant ? "Logging in" : "Redirecting"}...
        </h2>
        <p className="w-1/3 text-center text-white-200">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    );
  } else {
    return (
      <Error message="There is an error in logging you into this application. please try again later">
        <div className="flex gap-3 mt-4 flex-wrap">
          <button onClick={() => window.location.assign("/login")} className="px-5 py-2 capitalize text-white-100 bg-blue rounded-md duration-300 hover:opacity-75 active:shadow-lg">
            login
          </button>
          <Link to="/" className="px-5 py-2 capitalize border border-white-400 text-white-200 rounded-md duration-300 hover:border-white-200 hover:text-white-100 active:shadow-lg">
            back home
          </Link>
        </div>
      </Error>
    );
  }
};

export default Login;
