import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const ExploreIndia = () => {
  const places = [
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/ladakh",
      placeName: "Leh Ladakh",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/kashmir",
      placeName: "Kashmir",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/meghalaya",
      placeName: "Meghalaya",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/spiti",
      placeName: "Spiti",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/kerala",
      placeName: "Kerala",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/sikkim",
      placeName: "Sikkim",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/andaman",
      placeName: "Andaman",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/himachal",
      placeName: "Himachal",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/rajasthan",
      placeName: "Rajasthan",
    },
    {
      placeImage:
        "https://images.wanderon.in/new-homepage-data/Explore%20India/uttarakhand",
      placeName: "Uttarakhand",
    },
  ];

  console.log(places);

  return (
    <Flex alignItems={"center"} justifyContent={"center"} mt={10} p={2}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={4}
        maxW={"1376px"}
        w={"100%"}
      >
        {places.map((place) => {
          return (
            <GridItem w="100%" key={place.placeName}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Box
                  position="relative"
                  maxW={"300"}
                  width={"100%"}
                  borderRadius="md"
                  overflow="hidden"
                  boxShadow="lg"
                  bg={"white"}
                  boxSizing="border-box"
                  p={1}
                >
                  <Box
                    position="relative"
                    maxW={"300"}
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
                    >
                      <Text
                        fontSize={{ base: "xl", sm: "2xl" }}
                        fontWeight="bold"
                        align={"center"}
                      >
                        {place.placeName}
                      </Text>
                    </Box>
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

export { ExploreIndia };
