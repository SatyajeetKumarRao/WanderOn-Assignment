import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const WeekendsTrips = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Adventure awaits, just a weekend away.",
        "Exploring new horizons, one weekend getaway at a time.",
        "Where will this weekend take you?",
        "Recharge and reset: it’s a weekend thing.",
        "Seeking serenity one weekend at a time.",
        "When in doubt, escape for the weekend!",
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

export { WeekendsTrips };
