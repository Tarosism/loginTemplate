import React from "react";

export default function LoginPage() {
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=https://www.googleapis.com/auth/userinfo.email`;

  const googleLoginHandler = () => {
    window.location.assign(googleUrl);
  };
  const kakaoLoginHandler = () => {
    window.location.assign("");
  };
  const gitLoginHandler = () => {
    window.location.assign(googleUrl);
  };

  return (
    <div>
      <ul>
        <li>
          <button onClick={googleLoginHandler}>구글로 로그인 하기</button>
        </li>
        <li>
          <button onClick={kakaoLoginHandler}>카카오로 로그인 하기</button>
        </li>
        <li>
          <button onClick={gitLoginHandler}>깃허브로 로그인 하기</button>
        </li>
      </ul>
    </div>
  );
}
