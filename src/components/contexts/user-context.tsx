"use client";

import { createContext, ReactNode } from "react";
import { RoleType } from "../../../generated/prisma";

type UserWithoutPassword = {
  name: string;
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  role: RoleType;
};

export const UserContext = createContext<{ user?: UserWithoutPassword }>({
  user: undefined,
});

export default function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserWithoutPassword;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
