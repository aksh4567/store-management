import { getUserFromCookies } from "@/lib/helper";

import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";
import { generateToken } from "@/lib/services/jwt";

export async function loginUser(
  _: unknown,
  args: {
    userCred: string;
    password: string;
  }
) {
  try {
    const cookieStore = await cookies();
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            username: args.userCred,
          },
          {
            email: args.userCred,
          },
        ],
      },
    });

    if (!user) return false;
    if (user.password == args.password) {
      //set token
      const token = generateToken({ id: user.id });
      cookieStore.set("token", token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return false;
  }
}

export async function createUser(
  _: unknown,
  args: {
    name: string;
    email: string;
    username: string;
    password: string;
    role: RoleType;
  }
) {
  try {
    const user = await getUserFromCookies();

    if (!user) return null;
    if (user.role != "admin") return null;

    const Createduser = await prismaClient.user.create({
      data: args,
    });
    return Createduser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function updateUserRole(
  _: unknown,
  args: {
    userId: string;
    role: RoleType;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (user?.role !== "admin") {
      return false;
    }
    await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: {
        role: args.role,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function updateUserProfile(
  _: unknown,
  args: {
    name: string;
    username: string;
    email: string;
    avatar: string;
    userId: string;
  }
) {
  try {
    const user = await getUserFromCookies();

    const dataToSave = {
      name: args.name,
      username: args.username,
      email: args.email,
      avatar: args.avatar,
    };
    if (user?.role != "admin" && user?.id != args.userId) return false;
    await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: dataToSave,
    });
    return true;
  } catch {
    return false;
  }
}

export async function getAllUsers() {
  try {
    const users = await prismaClient.user.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
    });
    return users;
  } catch {
    return null;
  }
}
