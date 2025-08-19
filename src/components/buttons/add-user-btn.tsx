import { CREATE_USER } from "@/lib/gql/mutation";
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
import { User } from "../../../generated/prisma";

export default function AddUserButton() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [avatar, setAvatar] = useState("");

  async function handleAddUser() {
    try {
      const data: { createUser: User } = await gqlClient.request(CREATE_USER, {
        name,
        email,
        username,
        password,
        role,
        avatar,
      });
      if (data.createUser) {
        alert("User created successfully");
        setName("");
        setEmail("");
        setUsername("");
        setAvatar("");
        setPassword("");
        setRole("staff"); // Reset to default value instead of empty string
      } else {
        alert("Failed to create user");
      }
    } catch {
      alert(" Something Went Wrong");
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add Member</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Member</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Avatar Img
            </Text>
            <TextField.Root
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Enter your Avatar URL"
            />
          </label>
          <Select.Root value={role} onValueChange={setRole}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Roles</Select.Label>
                <Select.Item value="manager">Manager</Select.Item>
                <Select.Item value="staff">Staff</Select.Item>
              </Select.Group>
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
            <Button onClick={handleAddUser}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
