import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
    method: 'DELETE',
    credentials: 'include'
  };

  fetch(`${API_URL}/auth/logout`, options)
  .then(() => {
    dispatch(logOut());
    navigate("/");
  });

  return () => {
      dispatch(logOut());
    };
  }, [dispatch, navigate]);

  return(
    <></>
  );
};

export default Logout;