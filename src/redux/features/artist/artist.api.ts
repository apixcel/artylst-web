import { IArtist, IMeta } from "@/interface";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const artistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllArtist: builder.query<
      { data: IArtist[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/artist?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    getRecentlyViewedArtists: builder.query<
      { data: IArtist[] },
      Record<string, string | number>
    >({
      query: () => {
        return {
          url: `/artist/recent-view`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    getArtistProfileByUserName: builder.query<{ data: IArtist }, { userName: string }>({
      query: (query) => {
        const { userName } = query;
        return {
          url: `/artist/profile/${userName}`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    getWeeklyPopulerArtist: builder.query<{ data: IArtist[] }, undefined>({
      query: () => {
        return {
          url: `/artist/weekly-trending`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    getTopViewedArtist: builder.query<{ data: IArtist[] }, undefined>({
      query: () => {
        return {
          url: `/artist/top-viewed`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
    amIFeatured: builder.query<
      {
        data: {
          isFeatured: boolean;
          rank: number | null;
          stats?: {
            ordersCount?: number;
            totalIncome?: number;
            reviewCount?: number;
            avgRating?: number;
            minStartingPrice?: number;
          };
        };
      },
      undefined
    >({
      query: () => {
        return {
          url: `/artist/am-i-featured`,
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
  }),
});

export const {
  useGetAllArtistQuery,
  useGetRecentlyViewedArtistsQuery,
  useGetArtistProfileByUserNameQuery,
  useGetWeeklyPopulerArtistQuery,
  useGetTopViewedArtistQuery,
  useAmIFeaturedQuery,
} = artistApi;
