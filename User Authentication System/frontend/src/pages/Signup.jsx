import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../utils/vars";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const avatars = [
  {
    name: "Kerala",
    url: "https://images.wanderon.in/new-homepage-data/Explore%20India/kerala",
  },
  {
    name: "Himachal",
    url: "https://images.wanderon.in/new-homepage-data/Explore%20India/himachal",
  },
  {
    name: "Sikkim",
    url: "https://images.wanderon.in/new-homepage-data/Explore%20India/sikkim",
  },
  {
    name: "Uttarakhand",
    url: "https://images.wanderon.in/new-homepage-data/Explore%20India/uttarakhand",
  },
  {
    name: "Spiti",
    url: "https://images.wanderon.in/new-homepage-data/Explore%20India/spiti",
  },
];

const initialFormData = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formStateData, setFormStateData] = useState(initialFormData);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSignup = (data) => {
    const { username, email, password } = data;

    setFormStateData({ ...formStateData, isLoading: true, isError: false });

    const userDetails = {
      username,
      email,
      password,
    };

    axios
      .post(`${BASE_URL}/users/register`, userDetails)
      .then((response) => {
        // console.log(response.data);

        setFormStateData({
          ...formStateData,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });

        toast({
          title: "SignUp Successful",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

        navigate("/login");
      })
      .catch((error) => {
        // console.log(error.response.data);
        setFormStateData({ ...formStateData, isLoading: false, isError: true });
        toast({
          title: error.response.data?.message,
          // description: "We've created your account for you.",
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      });
  };

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Dreaming of your next Adventure?{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              Hit us up!
            </Text>{" "}
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
          <Flex>
            <Text>
              Already have an account?{" "}
              <Link to={"/login"} style={{ color: "red" }}>
                Login
              </Link>
            </Text>
          </Flex>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign up for unforgettable travel memories
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text mt={3} color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Your dream are one sign-up away
            </Text>
          </Stack>
          <Box as={"form"} mt={5} onSubmit={handleSubmit(handleSignup)}>
            <Stack spacing={4}>
              <Input
                placeholder="name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                {...register("username", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Invalid name format",
                  },
                })}
                aria-invalid={errors.username ? "true" : "false"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              {errors.username?.type === "required" && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  Name is required
                </Text>
              )}

              {errors.username && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  {errors.username.message}
                </Text>
              )}
              <Input
                placeholder="name@email.com"
                type="email"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^[\w]+(([.]{1}[\w]+)?)*@[\w]+[.]{1}[a-z]+([.]{1}[a-z]+)?$/i,
                    message: "invalid email address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              {errors.email?.type === "required" && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  Email is required
                </Text>
              )}

              {errors.email && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  {errors.email.message}
                </Text>
              )}

              <Input
                placeholder="password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                type="password"
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^[\w\W\s]{8,15}$/i,
                    message: "invalid password length",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
                _placeholder={{
                  color: "gray.500",
                }}
              />

              {errors.password?.type === "required" && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  Password is required
                </Text>
              )}

              {errors.password && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  {errors.password.message}
                </Text>
              )}

              <Input
                placeholder="confirm password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                })}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              {errors.confirmPassword?.type === "required" && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  Confirm password is required
                </Text>
              )}
              {errors.confirmPassword && (
                <Text
                  as={"span"}
                  role="alert"
                  color={"red.300"}
                  fontSize={"sm"}
                  ml={1}
                  mt={"-10px"}
                >
                  {errors.confirmPassword.message}
                </Text>
              )}
            </Stack>

            <Button
              type="submit"
              fontFamily={"heading"}
              isLoading={formStateData.isLoading}
              loadingText="Signing Up"
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Signup
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  );
};

export { Signup };
