import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export type AppRole = "BUYER" | "SELLER" | "ADMIN" | "SUPPORT";

export async function requireUser() {
  const session = await getSession();

  if (!session) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Please login first" },
        { status: 401 }
      ),
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
    },
  });

  if (!user || user.status !== "ACTIVE") {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Account unavailable" },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}

export async function requireRole(allowedRoles: AppRole[]) {
  const result = await requireUser();

  if (!result.user) return result;

  if (!allowedRoles.includes(result.user.role as AppRole)) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      ),
    };
  }

  return result;
}

export async function requireSeller() {
  const result = await requireRole(["SELLER"]);

  if (!result.user) return result;

  const seller = await prisma.sellerProfile.findUnique({
    where: { userId: result.user.id },
    select: {
      id: true,
      approved: true,
    },
  });

  if (!seller || !seller.approved) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "Seller approval required" },
        { status: 403 }
      ),
    };
  }

  return {
    ...result,
    seller,
  };
}

export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}

export async function requireSupport() {
  return requireRole(["SUPPORT", "ADMIN"]);
}