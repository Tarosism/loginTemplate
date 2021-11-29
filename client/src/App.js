import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Mypage from "./components/Mypage";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [kindOfLogin, setKindOfLOgin] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash.includes("google")) {
      const token = hash.split("=")[1].split("&")[0];
      setKindOfLOgin("google");
      setIsLogin(true);
      setAccessToken(token);
    }
  }, []);
  // const getTheToken = async (hash) => {
  //   await axios
  //     .post("http://localhost:4000/callback", { hash })
  //     .then((res) => {
  //       setIsLogin(true);
  //       setAccessToken(res.data.accessToken);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <Router>
      <>
        {isLogin ? (
          <Mypage accessToken={accessToken} kindOfLogin={kindOfLogin} />
        ) : (
          <LoginPage setKindOfLOgin={setKindOfLOgin} />
        )}
      </>
    </Router>
  );
}
