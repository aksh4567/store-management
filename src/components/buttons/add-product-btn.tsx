"use client";
import { ADD_PRODUCT } from "@/lib/gql/mutation";
import gqlClient from "@/lib/services/gql";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { Product } from "../../../generated/prisma";

export default function AddProductButton() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(99.99);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  async function handleAddProduct() {
    try {
      const data: {
        addProduct: Product;
      } = await gqlClient.request(ADD_PRODUCT, {
        title,
        description,
        category,
        price,
        stock,
        imageUrl,
      });
      console.log(data, data.addProduct);

      if (data.addProduct) {
        alert("Product Added succesfully");
      } else {
        alert("product creation failed");
      }
    } catch {
      alert("something went wrong");
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add Product</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Product</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add your Product
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Root
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Price
            </Text>
            <TextField.Root
              value={price}
              onChange={(e) =>
                setPrice(Number.parseFloat(e.target.value || "0"))
              }
              placeholder="Enter Price"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              ImageUrl
            </Text>
            <TextField.Root
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Image"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Stock
            </Text>
            <TextField.Root
              value={stock}
              onChange={(e) => setStock(Number.parseInt(e.target.value || "0"))}
              placeholder="Enter Stock"
            />
          </label>

          <Select.Root value={category} onValueChange={setCategory}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>category</Select.Label>
                <Select.Item value="electronics">Electronics</Select.Item>
                <Select.Item value="beauty">Beauty</Select.Item>
                <Select.Item value="food">Food</Select.Item>
                <Select.Item value="accessories">Accessories</Select.Item>
                <Select.Item value="clothing">Clothing</Select.Item>
                <Select.Item value="furniture">Furniture</Select.Item>
                <Select.Item value="decor">Decor</Select.Item>
                <Select.Item value="others">Others</Select.Item>
              </Select.Group>
              <Select.Separator />
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleAddProduct}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
