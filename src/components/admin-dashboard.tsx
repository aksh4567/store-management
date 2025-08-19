"use client";
import gqlClient from "@/lib/services/gql";
import AddUserButton from "./buttons/add-user-btn";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import { User } from "../../generated/prisma";
import { Avatar, Box, Card, Flex, Text, Tabs } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import AddProductButton from "./buttons/add-product-btn";
import ProductList from "./ProductList";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function getAllUsers() {
      const data: {
        getAllUsers: User[];
      } = await gqlClient.request(GET_ALL_USERS);
      setUsers(data?.getAllUsers || []);
    }
    getAllUsers();
  }, []);

  return (
    <div className="w-full px-2 md:px-8 py-4">
      <Tabs.Root defaultValue="products" className="w-full">
        <Tabs.List className="flex flex-row gap-2 mb-6 md:mb-8">
          <Tabs.Trigger value="products" className="flex-1 md:flex-none">
            Products
          </Tabs.Trigger>
          <Tabs.Trigger value="users" className="flex-1 md:flex-none">
            Users
          </Tabs.Trigger>
        </Tabs.List>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
          {/* Products Tab */}
          <Tabs.Content value="products" className="w-full md:w-1/2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Products</h2>
                <AddProductButton />
              </div>
              <div>
                <ProductList />
              </div>
            </div>
          </Tabs.Content>
          {/* Users Tab */}
          <Tabs.Content value="users" className="w-full md:w-1/2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Users</h2>
                <AddUserButton />
              </div>
              <div>
                <div className="flex flex-col gap-3">
                  {users.map((user) => (
                    <Card key={user.id} className="w-full">
                      <Flex gap="3" align="center">
                        <Avatar
                          size="3"
                          src={user?.avatar || ""}
                          radius="full"
                          fallback={user?.name?.charAt(0) || "U"}
                        />
                        <Box>
                          <Text as="div" size="2" weight="bold">
                            {user.name}
                          </Text>
                          <Text as="div" size="2" color="gray">
                            @{user.username}
                          </Text>
                          <Text as="div" size="2" color="gray">
                            {user.role}
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                  ))}
                  {users.length === 0 && (
                    <div className="text-gray-500 text-sm">No users found.</div>
                  )}
                </div>
              </div>
            </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
