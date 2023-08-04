import { AuthResponse, SupabaseClient } from "@supabase/supabase-js";
import { FC, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISignUp {
  supabaseClient: SupabaseClient;
}

interface IUser {
  email: string;
  name: string;
  surname: string;
}

interface IUserSignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

// eslint-disable-next-line no-empty-pattern
const SignUp: FC<ISignUp> = ({ supabaseClient }) => {
  const [newUserState, setNewUserState] = useState<IUserSignUp>();

  const signUpOnSubmit = async () => {
    if (!newUserState?.email || !newUserState?.password) {
      return console.log("missing fields.");
    }
    const signUpResponse: AuthResponse = await supabaseClient.auth.signUp({
      email: newUserState?.email,
      password: newUserState?.password,
    });
    console.log({ signUpResponse });
    if (signUpResponse.error) {
      return console.log({ signUpError: signUpResponse.error });
    }
    const { data, error } = await supabaseClient
      .from("users")
      .insert({
        userId: signUpResponse.data.user?.id,
        email: signUpResponse.data.user?.email,
      })
      .select();

    console.log({ data, error });
  };

  const onChangeNewUserState = (
    value: string,
    type: "email" | "password" | "confirmPassword"
  ) => {
    setNewUserState((prev: any) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-input-container content-stretch">
        <span className="login-input-title">email:</span>
        <input
          className="input-primary"
          onChange={(e) =>
            onChangeNewUserState(e?.currentTarget?.value, "email")
          }
          autoCorrect="off"
        />
      </div>
      <div className="login-input-container">
        <span className="login-input-title ">password:</span>
        <input
          className="input-primary"
          type="password"
          onChange={(e) =>
            onChangeNewUserState(e?.currentTarget?.value, "password")
          }
          autoCorrect="off"
        />
      </div>
      <div className="login-input-container items-stretch">
        <span className="login-input-title">password-confirm:</span>
        <input
          className="input-primary"
          type="password"
          onChange={(e) =>
            onChangeNewUserState(e?.currentTarget?.value, "confirmPassword")
          }
          autoCorrect="off"
        />
      </div>
      <button className="button-primary rounded-none" onClick={signUpOnSubmit}>
        submit
      </button>
    </div>
  );
};

export default SignUp;
