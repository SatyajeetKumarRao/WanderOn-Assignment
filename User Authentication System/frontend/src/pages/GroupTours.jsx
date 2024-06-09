import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const GroupTours = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "A journey is best measured in friends rather than miles.",
        "Good company on a journey makes the way seem shorter.",
        "Friends that travel together, stay together.",
        "There is an unspoken bond you create with the friends you travel with.",
        "Life was meant for great adventures and close friends.",
        "Good friends follow you anywhere.",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <Box
      textAlign={"center"}
      fontWeight={600}
      fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
      mt={28}
    >
      <Text as={"span"} color={"gray.600"} ref={el}></Text>
    </Box>
  );
};

export { GroupTours };
