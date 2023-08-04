import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "../../secrets";
import { useResetRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atoms";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRooms {}

const Rooms: FC<IRooms> = () => {
  const supabase = createClient(SUPABASE.url, SUPABASE.apiKey);
  const navigate = useNavigate();

  const signOut = async () => {};

  return (
    <div>
      <h1>Rooms:</h1>

      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default Rooms;
