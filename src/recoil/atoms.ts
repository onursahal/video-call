import { atom } from "recoil";

interface ICurrentUserAtom {
  name: string;
  familyName: string;
  email: string;
}

export const currentUserAtom = atom<ICurrentUserAtom>({
  key: "currentUser",
  default: {
    name: "",
    familyName: "",
    email: "",
  },
});
