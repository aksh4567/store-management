import prismaClient from "@/lib/services/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

export async function addProduct(
  _: unknown,
  args: {
    title: string;
    description: string;
    category: ProductCategory;
    price: number;
    stock: number;
    imageUrl: string;
  }
) {
  try {
    const createdProduct = await prismaClient.product.create({
      data: args,
    });
    return createdProduct;
  } catch (error) {
    console.log(error);

    return null;
  }
}
export async function getAllProducts() {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProduct(
  _: unknown,
  args: {
    id: string;
  }
) {
  const id = args.id;
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
      include: {
        sales: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (product) return product;
    return null;
  } catch (error) {
    console.log("Error fetching product:", error);
    return null;
  }
}

export async function createSale(
  _: unknown,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity,
      },
    });
    if (sale) {
      await prismaClient.product.update({
        where: {
          id: args.id,
        },
        data: {
          stock: {
            decrement: args.quantity, // maybe only valid for integers : increment , decrement
          },
        },
      });
    }
    return true;
  } catch (error) {
    console.log("Error creating sale:", error);
    return false;
  }
}
