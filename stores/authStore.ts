import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthStore {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  token: Cookies.get("token") || null,
  username: Cookies.get("username") || null,
  login: (token, username) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    Cookies.set("username", username, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    set({ token, username });
  },
  logout: () => {
    Cookies.remove("token");
    Cookies.remove("username");
    set({ token: null, username: null });
  },
}));
