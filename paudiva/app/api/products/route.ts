import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        ...(category ? { category } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } }
              ]
            }
          : {})
      },
      include: {
        images: true,
        seller: {
          select: {
            storeName: true,
            city: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch products" },
      { status: 500 }
    );
  }
}