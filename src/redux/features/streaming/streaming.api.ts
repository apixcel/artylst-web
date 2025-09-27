import { api } from "@/redux/api/api";

const streamingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpotifyPlaylists: builder.mutation<{ data: null }, { userId: string }>({
      query: (payload) => ({
        url: `/streaming-connection/spotify-playlists/${payload.userId}`,
        method: "GET",
      }),
      invalidatesTags: ["streaming"],
    }),
  }),
});

export const { useGetSpotifyPlaylistsMutation } = streamingApi;
