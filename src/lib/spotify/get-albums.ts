// lib/spotify/getAlbums.ts

import { getAccessToken } from "./get-access-token";

export interface Album {
  id: string;
  name: string;
  releaseDate: string;
  imageUrl: string;
  type: string;
}

export async function getAlbums(artistId: string): Promise<Album[]> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single,appears_on,compilation&market=IE&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch albums from Spotify");
  }

  const data = await response.json();

  // Simplify into clean structure
  const albums: Album[] = data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    releaseDate: item.release_date,
    imageUrl: item.images[0]?.url ?? "",
    type: item.album_type,
  }));

  return albums;
}
