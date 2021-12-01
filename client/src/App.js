import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Mypage from "./components/Mypage";
import axios from "axios";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [kakaoUserData, setKakaoUserData] = useState(null);
  const [kindOfLogin, setKindOfLOgin] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    const kakaoCode = url.searchParams.get("code");

    if (hash.includes("google")) {
      const token = hash.split("=")[1].split("&")[0];
      setKindOfLOgin("google");
      setIsLogin(true);
      setAccessToken(token);
    } else if (kakaoCode) {
      setKindOfLOgin("kakao");
      getKakaoToken(kakaoCode);
    }
  }, []);
  console.log(isLogin);
  console.log(kakaoUserData);

  const getKakaoToken = async (code) => {
    await axios
      .post("http://localhost:3002/kakaoCallback", { code })
      .then((res) => {
        /* 설명 들어감
        setIsLogin이 먼저 상태변화를 이룰 시, mypage컴포넌트로 들어가버림
        이때 이게 들어가면 res를 받는 것 보다 페이지 전환이 먼저 일어나버려서
        이하 상태 변화가 실행이 안됨 (왜냐면 바뀐 페이지인 mypage엔 kakaoUserData라는 상태가 없기 때문)
        결국 페이지를 바꾸는 상태 변화를 맨 밑에 써줘야, 이 app.js의 상태가 전부 변한 다음
        그게 props로 적용되므로 꼭꼭 페이지 전환 상태 변경은 맨 밑에 쓰자
        아니, 그냥 리덕스 쓰자.
        */
        setKakaoUserData(res.data.data);
        setIsLogin(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <>
        {isLogin ? (
          <Mypage
            accessToken={accessToken}
            kindOfLogin={kindOfLogin}
            kakaoUserData={kakaoUserData}
          />
        ) : (
          <LoginPage setKindOfLOgin={setKindOfLOgin} />
        )}
      </>
    </Router>
  );
}
