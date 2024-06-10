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
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/vars";
import { AuthContext } from "../contexts/authContext";

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

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const [formStateData, setFormStateData] = useState(initialFormData);

  const toast = useToast();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignin = (data) => {
    // console.log(data);

    setFormStateData({ ...formStateData, isLoading: true, isError: false });

    axios
      .post(`${BASE_URL}/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request
      })
      .then((response) => response.data)
      .then((responseData) => {
        console.log(responseData);

        setFormStateData({
          ...formStateData,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });

        toast({
          title: "Login Successful",
          //   description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });

        setAuth({
          isAuth: true,
          userId: responseData.data.userid,
          email: responseData.data.email,
          accessToken: responseData.accessToken,
        });

        sessionStorage.setItem("accessToken", responseData.accessToken);
        sessionStorage.setItem("userData", JSON.stringify(responseData.data));

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
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
            Your dream getaway starts here{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              Escape. Explore. Experience
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
              Don't have an account?{" "}
              <Link to={"/signup"} style={{ color: "red" }}>
                Signup
              </Link>
            </Text>
          </Flex>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          height={"fit-content"}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign in to start planning your dream adventure
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text mt={3} color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Exploring destinations, creating memories
            </Text>
          </Stack>
          <Box as={"form"} mt={5} onSubmit={handleSubmit(handleSignin)}>
            <Stack spacing={4}>
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
            </Stack>
            <Button
              type="submit"
              fontFamily={"heading"}
              isLoading={formStateData.isLoading}
              loadingText="Signing In"
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Signin
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  );
};

export { Login };
