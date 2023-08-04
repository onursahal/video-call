import { FC } from "react";
import "../../index.css";
import { useState, useEffect } from "react";
import { AuthChangeEvent, Session, createClient } from "@supabase/supabase-js";
import Login from "./Login";
import { SUPABASE } from "../../secrets";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atoms";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IAuthorization {}

const supabase = createClient(SUPABASE.url, SUPABASE.apiKey);

// eslint-disable-next-line no-empty-pattern
const Authorization: FC<IAuthorization> = ({}) => {
  const [pageState, setPageState] = useState<string>("Login");
  const [currentUser] = useRecoilState(currentUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/rooms");
    }
  }, [currentUser]);

  return (
    <div className="authorization-container">
      <div className="logo">
        <h1 className="logo-header">video-call-app</h1>
      </div>

      {pageState === "Login" && (
        <>
          <Login />
          <button
            className="page-anchor"
            onClick={() => setPageState("SignUp")}
          >
            Don't have an account yet, sign up here
          </button>
        </>
      )}
      {pageState === "SignUp" && (
        <>
          <SignUp supabaseClient={supabase} />{" "}
          <button className="page-anchor" onClick={() => setPageState("Login")}>
            If you already have an account, just login
          </button>
        </>
      )}
      <div className="flex gap-2 justify-center"></div>
    </div>
  );
};

export default Authorization;
