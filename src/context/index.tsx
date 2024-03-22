"use client";
import { BASE_URL } from "@/constants/api";
import { User } from "@/models/user";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";

interface ContextType {
  user: User | null;
  updateUser: React.Dispatch<React.SetStateAction<User | null>>;
  refetchUser: () => Promise<void>;
}
const AppContext = createContext<ContextType | null>(null);
export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [appUser, setAppUser] = useState<User | null>(null);
  const { status, data: session } = useSession();
  const getUser = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });
    if (res.ok) {
      const user = (await res.json()) as User;
      console.log(user);
      setAppUser(user);
    }
  }, [session]);
  useEffect(() => {
    if (status === "authenticated" && !appUser) {
      console.log("getUser");
      getUser();
    }
  }, [appUser, status, session, getUser]);

  return (
    <AppContext.Provider
      value={{
        user: appUser,
        updateUser: setAppUser,
        refetchUser: getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
