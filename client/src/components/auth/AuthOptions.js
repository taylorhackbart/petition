import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {RiLoginCircleFill} from "react-icons/ri"
import { AiOutlineUserAdd } from "react-icons/ai"
import {RiLogoutCircleRLine} from "react-icons/ri"
import { BsHouse } from "react-icons/bs";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const home = () => history.push("/home")
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/")
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <div className="align-me">
          <div className="row">
        <button className="employee-button" onClick={home}> PORTAL </button>
        </div>
        <div className="row">
        <button className="logout-button" onClick={logout}>LOGOUT</button>
        </div>
        </div>
      ) : (
        <>
        <div className="align-me">
          <button className="login-button" onClick={login}>LOGIN</button>
          <AiOutlineUserAdd className="register-button" 
          onClick={register}
          >Register</AiOutlineUserAdd>
          </div>
        </>
      )}
    </nav>
  );
}