"use client";
import React, { useEffect, useState } from "react";

import gqlClient from "@/lib/services/gql";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import { Product } from "../../generated/prisma";

import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      const data: { getAllProducts: Product[] } = await gqlClient.request(
        GET_ALL_PRODUCTS
      );
      const products = data?.getAllProducts || [];
      setProducts(products);
    }
    getAllProducts();
  }, []);

  return (
    <div className="flex justify-between">
      {/* <div>
        <AddProductButton />
      </div> */}
      <div>
        {products.map((product) => {
          return (
            <div key={product.id} className="mb-4">
              <Link href={"/product/" + product.id}>
                <ProductCard key={product.id} product={product} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
