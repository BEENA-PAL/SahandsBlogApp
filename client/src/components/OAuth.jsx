import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInSuccess } from "../redux/user/userSlice.js";

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ propt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const res = await fetch("./api/auth/google", {
        method: "POST",
        header: { "Content-Type": "appliction/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      gradientDuoTone="purpleToPink"
      type="button"
      outline
      className="font-bold"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Contine with Google
    </Button>
  );
}

export default OAuth;
