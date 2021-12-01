import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Mypage({ accessToken, kindOfLogin, kakaoUserData }) {
  const [userImage, setUserImage] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (kindOfLogin === "google") googleUserInfo();
    else if (kindOfLogin === "kakao") kakaoUserInfo();
  });

  const googleUserInfo = async () => {
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      )
      .then((res) => {
        setUserId(res.data.email);
        setUserImage(res.data.picture);
      })
      .catch((err) => console.log(err));
  };

  const kakaoUserInfo = () => {
    setUserId(kakaoUserData.nickName);
    setUserImage(kakaoUserData.profileImageURL);
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <div>당신의 아이디는 {userId}입니다</div>
      <div>내 얼굴</div>
      <img src={userImage} />
    </div>
  );
}
