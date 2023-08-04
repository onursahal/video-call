import { SupabaseClient } from "@supabase/supabase-js";
import { ChangeEvent, FC, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ILoginProps {}

interface IUserLogin {
  email: string;
  password: string;
}

// eslint-disable-next-line no-empty-pattern
const Login: FC<ILoginProps> = () => {
  const { signIn } = useAuth();
  const [loginState, setLoginState] = useState<IUserLogin>();

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "email" | "password"
  ) => {
    setLoginState((prev: any) => ({
      ...prev,
      [type]: event.target.value,
    }));
  };

  const onSubmit = () => {
    if (!loginState?.email || !loginState?.password) {
      return;
    }
    return signIn(loginState?.email, loginState?.password);
  };

  return (
    <div className="login-container">
      <div className="login-input-container">
        <span className="login-input-title ">email:</span>
        <input
          className="input-primary"
          onChange={(event) => {
            onInputChange(event, "email");
          }}
        />
      </div>
      <div className="login-input-container">
        <span className="login-input-title">password:</span>
        <input
          className="input-primary"
          type="password"
          onChange={(event) => {
            onInputChange(event, "password");
          }}
        />
      </div>

      <button
        className="button-primary rounded-none"
        onClick={() => onSubmit()}
      >
        submit
      </button>
    </div>
  );
};

export default Login;
