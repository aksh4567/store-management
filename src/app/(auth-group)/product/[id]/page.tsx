"use client";

export const dynamic = "force-dynamic";
import { useContext, useEffect, useState } from "react";
import { Product, Sale } from "../../../../../generated/prisma";
import gqlClient from "@/lib/services/gql";
import { GET_PRODUCT } from "@/lib/gql/queries";
import { useParams } from "next/navigation";
import AddSaleButton from "@/components/buttons/add-sale-btn";
import ProductSaleChart from "@/components/product-sale-chart";
import { UserContext } from "@/components/contexts/user-context";
import {
  Card,
  Flex,
  Text,
  Box,
  Badge,
  Separator,
  Grid,
  Container,
} from "@radix-ui/themes";
import Image from "next/image";

type ProductWithSales = Product & {
  sales: Sale[];
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<ProductWithSales | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getProductDetails() {
      setLoading(true);
      const data: { getProduct: ProductWithSales } = await gqlClient.request(
        GET_PRODUCT,
        {
          getProductId: id,
        }
      );
      if (data?.getProduct) {
        setProduct(data.getProduct);
      }
      setLoading(false);
    }
    getProductDetails();
  }, [id]);

  const chartData = product?.sales?.map((sale) => {
    const date = new Date(Number(sale.createdAt));
    const format =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const quantity = sale.quantity;
    const obj = {
      date: format,
      quantity,
    };
    return obj;
  });

  return (
    <Container size="4" className="py-6">
      {loading ? (
        <Flex align="center" justify="center" className="h-96">
          <Text size="4" color="gray">
            Loading...
          </Text>
        </Flex>
      ) : (
        <>
          <Grid columns={{ initial: "1", md: "2" }} gap="6" width="auto">
            <Card className="p-4" variant="surface">
              <Box className="relative w-full h-80 rounded-md overflow-hidden">
                {product?.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.title || "Product"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                )}
              </Box>
            </Card>

            <Flex direction="column" gap="4">
              <Card className="p-4" variant="surface">
                <Flex direction="column" gap="3">
                  <Flex align="center" justify="between" wrap="wrap" gap="2">
                    <Text as="div" size="6" weight="bold">
                      {product?.title}
                    </Text>
                    {product?.category && (
                      <Badge
                        color="indigo"
                        variant="soft"
                        radius="full"
                        size="2"
                      >
                        {product.category}
                      </Badge>
                    )}
                  </Flex>

                  <Text as="p" size="3" color="gray">
                    {product?.description}
                  </Text>

                  <Separator size="2" />

                  <Flex direction="column" gap="2">
                    <Flex align="center" justify="between">
                      <Text size="2" color="gray">
                        Price:
                      </Text>
                      <Text size="5" weight="bold">
                        ₹{product?.price?.toLocaleString()}
                      </Text>
                    </Flex>

                    <Flex align="center" justify="between">
                      <Text size="2" color="gray">
                        Stock:
                      </Text>
                      <Text
                        size="3"
                        weight="medium"
                        color={
                          product?.stock && product.stock > 0 ? "green" : "red"
                        }
                      >
                        {product?.stock && product.stock > 0
                          ? `${product.stock} units`
                          : "Out of stock"}
                      </Text>
                    </Flex>

                    <Flex align="center" justify="between">
                      <Text size="2" color="gray">
                        Product ID:
                      </Text>
                      <Text size="2" color="gray" className="font-mono">
                        {product?.id}
                      </Text>
                    </Flex>

                    <Flex align="center" justify="between">
                      <Text size="2" color="gray">
                        Total Sales:
                      </Text>
                      <Text size="3" weight="medium">
                        {product?.sales?.length || 0} transactions
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>

              {user?.role === "admin" && (
                <Card className="p-4" variant="surface">
                  <Flex direction="column" gap="3">
                    <Text size="3" weight="medium">
                      Add New Sale
                    </Text>
                    <Box>{product && <AddSaleButton product={product} />}</Box>
                  </Flex>
                </Card>
              )}
            </Flex>
          </Grid>

          {(user?.role == "admin" || user?.role == "manager") && (
            <Card className="mt-6 p-4" variant="surface">
              <Flex direction="column" gap="4">
                <Text as="div" size="5" weight="bold">
                  Sales Analytics
                </Text>
                <Separator size="2" />
                <Box className="h-96 w-full">
                  {chartData && chartData.length > 0 ? (
                    <ProductSaleChart data={chartData} />
                  ) : (
                    <Flex align="center" justify="center" className="h-full">
                      <Text color="gray" size="3">
                        No sales data available yet.
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Card>
          )}
        </>
      )}
    </Container>
  );
}
