import React, {useState, useEffect} from "react";
import Nav from "./components/Nav";
import About from "./pages/About";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Properties from "./pages/Rentals/Properties";
import NewRental from "./pages/NewRental/images.js";
import Base from "./pages/NewRental/base.js";
import previewPhotos from "./pages/NewRental/preview.js";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import UserContext from "./contexts/UserContext";
import HomePage from "./pages/Home";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3001/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3001/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </UserContext.Provider>
      <div>
        <Nav />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/Properties/name/:location" component={Properties} />
        <Route exact path="/about" component={About} />
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route exact path="/logout" component={Logout} /> */}
        <Route exact path={"/images/name/:location"} component={NewRental} />
        <Route exact path={"/preview/:id"} component={previewPhotos} />
        <Route exact path="/new" component={Base} />
      </div>
    </BrowserRouter>
  );
}

export default App;
