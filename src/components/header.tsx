"use client";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme_context";

import { IconButton } from "@radix-ui/themes";
import { Avatar, Box, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { UserContext } from "./contexts/user-context";
import Image from "next/image";
import { MoonStarIcon, SunMedium } from "lucide-react";
import React from "react";

export default function Header() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  async function handleLogout() {
    await fetch("/api/logout");

    window.location.href = "/login";
  }

  const handleThemeToggle = () => {
    if (setIsDark) setIsDark(!isDark);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <header
      className="h-24 flex justify-between p-8 border-2 items-center w-full"
      style={{
        borderColor: isDark ? "#fff" : "#e4e4e7",
      }}
    >
      <div className="relative h-18 w-18 rounded-full my-5">
        <Image
          fill
          src={
            "https://cdn-icons-png.freepik.com/256/15178/15178194.png?semt=ais_white_label"
          }
          alt="Store Management Logo"
        />
      </div>

      <div className="flex gap-4">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginLeft: 16,
          }}
        >
          <IconButton
            variant="soft"
            color="gray"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
          >
            {isDark ? <SunMedium /> : <MoonStarIcon />}
          </IconButton>
        </div>
        <Box maxWidth="240px">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Card>
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src={user?.avatar || ""}
                    radius="full"
                    fallback={user?.name?.charAt(0) || "U"}
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {user?.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {user?.role}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                color="red"
                onSelect={() => {
                  handleLogout();
                }}
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
      </div>
    </header>
  );
}
