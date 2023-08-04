import { FC, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useResetRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atoms";

const AuthContext = createContext<IAuth>({
  user: {},
  signIn: () => null,
  signOut: () => null,
});

export const useAuth = () => useContext(AuthContext);

const signIn = async (email: string, password: string) => {
  const signInResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log({ signInResponse });

  if (signInResponse.data.user?.id) {
    return getCurrentUser(signInResponse.data.user.id);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return console.log({ error });
  }

  resetRecoilSession();
  navigate("/auth");
};

const getCurrentUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("userId", userId);
  console.log({ getUserResponse: data?.[0] });

  if (error) {
    return console.log({ getUserError: error });
  }

  return data[0];
};

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuth {
  user: any;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [auth, setAuth] = useState(false);
  const resetRecoilSession = useResetRecoilState(currentUserAtom);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user);
        setAuth(true);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
