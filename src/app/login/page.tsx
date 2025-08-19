"use client";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import {
  Button,
  Card,
  Heading,
  Text,
  TextField,
  Table,
  Flex,
  Box,
  Separator,
  Container,
} from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError({});

    try {
      const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
        userCred,
        password,
      });

      if (data.loginUser) {
        // window.location.href = "/";
        router.push("/");
      } else {
        setError({ message: "Login failed. Please check your credentials." });
      }
    } catch {
      setError({ message: "An error occurred while logging in." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Container
        size="4"
        className="h-screen flex items-center justify-center p-4"
      >
        <Flex
          direction={{ initial: "column", lg: "row" }}
          gap={{ initial: "4", md: "6" }}
          align="center"
          justify="center"
          wrap="wrap"
        >
          <Card className="p-6 w-full max-w-sm">
            <Flex direction="column" align="center" gap="4">
              <Box className="relative h-16 w-16 rounded-full">
                <Image
                  fill
                  src={
                    "https://cdn-icons-png.freepik.com/256/15178/15178194.png?semt=ais_white_label"
                  }
                  alt="Store Management Logo"
                />
              </Box>

              <Heading size="4" align="center">
                Login to Store Management
              </Heading>

              <TextField.Root
                value={userCred}
                onChange={(e) => setUserCred(e.target.value)}
                className="w-full"
                placeholder="Username or email"
                size="3"
              />
              <TextField.Root
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="Password"
                type="password"
                size="3"
              />
              {error.message && (
                <Text color="red" size="2" align="center">
                  {error.message}
                </Text>
              )}
              <Button
                disabled={loading}
                onClick={handleLogin}
                className="w-full"
                size="3"
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </Flex>
          </Card>

          <Card className="p-6 w-full max-w-sm">
            <Flex direction="column" gap="3">
              <Heading size="4" align="center">
                Demo Credentials
              </Heading>
              <Text size="2" color="gray" align="center">
                Use these credentials to test different roles:
              </Text>

              <Box>
                <Table.Root size="1">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Password</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.RowHeaderCell>Admin</Table.RowHeaderCell>
                      <Table.Cell>admin01</Table.Cell>
                      <Table.Cell>123</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>Manager</Table.RowHeaderCell>
                      <Table.Cell>manager01</Table.Cell>
                      <Table.Cell>123</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.RowHeaderCell>Staff</Table.RowHeaderCell>
                      <Table.Cell>staff01</Table.Cell>
                      <Table.Cell>123</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Box>

              <Separator size="2" />

              <Text size="1" color="gray" align="center">
                You can use either email or username to login
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </main>
  );
}
