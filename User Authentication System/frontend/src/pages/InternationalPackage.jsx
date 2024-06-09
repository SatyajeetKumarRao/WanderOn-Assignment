import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

const InternationalPackage = () => {
  const international = [
    {
      placeName: "thailand-card",
      placeImage: "https://ik.imagekit.io/workcations/thailand-card",
    },
    {
      placeName: "bhutan_card",
      placeImage: "https://ik.imagekit.io/workcations/bhutan_card",
    },
    {
      placeName: "turkey_card",
      placeImage: "https://ik.imagekit.io/workcations/turkey_card",
    },
    {
      placeName: "sri-lanka_card",
      placeImage: "https://ik.imagekit.io/workcations/sri-lanka_card",
    },
    {
      placeName: "singapore_card",
      placeImage: "https://ik.imagekit.io/workcations/singapore_card",
    },
    {
      placeName: "malaysia_card",
      placeImage: "https://ik.imagekit.io/workcations/malaysia_card",
    },
    {
      placeName: "maldives_card",
      placeImage: "https://ik.imagekit.io/workcations/maldives_card",
    },
    {
      placeName: "almaty_card",
      placeImage: "https://ik.imagekit.io/workcations/almaty_card",
    },
    {
      placeName: "baku_card",
      placeImage: "https://ik.imagekit.io/workcations/baku_card",
    },
    {
      placeName: "dubai-card",
      placeImage: "https://ik.imagekit.io/workcations/dubai-card",
    },
    {
      placeName: "bali_card",
      placeImage: "https://ik.imagekit.io/workcations/bali_card",
    },
    {
      placeName: "vietnam_card",
      placeImage: "https://ik.imagekit.io/workcations/vietnam_card",
    },
    {
      placeName: "europe_card",
      placeImage: "https://ik.imagekit.io/workcations/europe_card",
    },
  ];

  return (
    <Flex alignItems={"center"} justifyContent={"center"} mt={10} p={2}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={7}
        maxW={"1376px"}
        w={"100%"}
      >
        {international.map((place) => {
          return (
            <GridItem w="100%" key={place.placeName}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Box
                  position="relative"
                  maxW={"350"}
                  width={"100%"}
                  borderRadius="md"
                  boxShadow="lg"
                  boxSizing="border-box"
                  p={1}
                >
                  <Box
                    transform={"rotate(2deg)"}
                    w={"100%"}
                    h={"100%"}
                    bg={
                      "linear-gradient(180deg, rgba(230,225,30,1) 0%, rgba(15,178,198,1) 100%);"
                    }
                    position={"absolute"}
                    top={0}
                    left={0}
                    borderRadius="md"
                  >
                    <Image
                      src={place.placeImage}
                      alt="Singapore"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      borderRadius="md"
                      opacity={0}
                    />
                  </Box>
                  <Box
                    position="relative"
                    maxW={"350"}
                    width={"100%"}
                    borderRadius="md"
                    overflow="hidden"
                    boxSizing="border-box"
                  >
                    <Image
                      src={place.placeImage}
                      alt="Singapore"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      borderRadius="md"
                    />

                    <Box
                      position="absolute"
                      bottom="0"
                      bg={
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
                      }
                      boxSizing="border-box"
                      width="100%"
                      color="white"
                      p={10}
                    ></Box>
                  </Box>
                </Box>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export { InternationalPackage };
