import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingActionScreen from "components/LoadingScreens/LoadingActionScreen";

import { logoutUser } from "redux/slices/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    navigate("/");
  });

  return (
    <LoadingActionScreen
      color="#ff1818"
      title="Logging out..."
    ></LoadingActionScreen>
  );
};

export default Logout;
