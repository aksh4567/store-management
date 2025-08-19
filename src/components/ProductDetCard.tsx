"use client";
import {
  Card,
  Flex,
  Text,
  Box,
  Badge,
  Button,
  Separator,
} from "@radix-ui/themes";
import Image from "next/image";
import { ProductCategory } from "../../generated/prisma";

type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  price: number;
  stock: number;
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductDetCard({ product }: ProductCardProps) {
  return (
    <Card
      className="w-full max-w-xs shadow-md transition hover:shadow-lg cursor-pointer"
      variant="surface"
    >
      <Box className="relative w-full h-48 rounded-md overflow-hidden mb-3">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 600px) 100vw, 300px"
          priority={false}
        />
      </Box>
      <Flex direction="column" gap="2">
        <Flex align="center" justify="between">
          <Text as="div" size="4" weight="bold">
            {product.title}
          </Text>
          <Badge color="indigo" variant="soft" radius="full">
            {product.category}
          </Badge>
        </Flex>
        <Text as="p" size="2" color="gray" className="truncate">
          {product.description}
        </Text>
        <Separator my="2" size="2" />
        <Flex align="center" justify="between">
          <Text size="4" weight="bold">
            ₹{product.price.toLocaleString()}
          </Text>
          <Text size="2" color={product.stock > 0 ? "green" : "red"}>
            {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
          </Text>
        </Flex>
        <Button mt="3" color="indigo" variant="solid" disabled>
          Buy
        </Button>
      </Flex>
    </Card>
  );
}
