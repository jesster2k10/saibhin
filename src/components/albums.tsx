import { getAlbums } from "@/lib/spotify/get-albums";
import { Box, Grid, Image, Text } from "@chakra-ui/react";

export default async function Albums() {
  const artistId = "7aehPgEdlzSNB14w0z3j9z";
  const albums = await getAlbums(artistId);

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      sm={{ gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}
      gap={4}
    >
      {albums.map((album) => (
        <Box key={album.id}>
          <Box
            position="relative"
            w="100%"
            aspectRatio="1"
            borderRadius="md"
            overflow="hidden"
          >
            <Image
              src={album.imageUrl}
              alt={album.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          <Text
            fontSize="sm"
            sm={{ fontSize: "inherit" }}
            mt={2}
            fontWeight="semibold"
            maxLines={1}
          >
            {album.name}
          </Text>

          <Text fontSize="xs" sm={{ fontSize: "sm" }} color="gray.500">
            {album.releaseDate.slice(0, 4)} • {album.type.toUpperCase()}
          </Text>
        </Box>
      ))}
    </Grid>
  );
}
