import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeUser } from "redux/slices/authSlice";
import LoadingActionScreen from "components/LoadingScreens/LoadingActionScreen";
import Error from "../components/Error";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const codeGrant = queryParams.get("code");
  const dispatch = useDispatch()

  useEffect(() => {
    (async function () {
      if (codeGrant) {
        fetch(process.env.REACT_APP_API_URL + "/users", {
          credentials: "include",
          method: "post",
          body: JSON.stringify({ codeGrant }),
          headers: { "content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              return setError(true);
            }
            dispatch(storeUser(data.user))
            navigate("/dashboard");
          })
          .catch(err => {
            setError(true);
          });
      } else window.location.replace(process.env.REACT_APP_OAuth2_URL);
    })();
  }, [codeGrant, dispatch, navigate]);

  if (!error) {
    return (
      <LoadingActionScreen
        title={codeGrant ? "Logging in" : "Redirecting" + "..."}
      >
        <p className="w-1/3 text-center text-white-200">
          This may take a few seconds, please don't close this page.
        </p>
      </LoadingActionScreen>
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
