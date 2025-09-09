import { IArtist, IArtistPricingTier, IMeta } from "@/interface";
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
    createPricingTier: builder.mutation<
      {
        data: Pick<
          IArtistPricingTier,
          "name" | "songs" | "deliveryTime" | "priceUsd" | "description" | "revisionCount"
        >;
      },
      Record<string, string | number>
    >({
      query: (body) => ({
        url: `/artist/create-pricing`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["artist"],
    }),
    updatePricingTier: builder.mutation<
      { data: IArtistPricingTier },
      Record<string, string | number>
    >({
      query: (body) => ({
        url: `/artist/pricing-tier`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["artist"],
    }),
    getMyPricingTier: builder.query<{ data: IArtistPricingTier[] }, void>({
      query: () => ({
        url: `/artist/get-pricing`,
        method: "GET",
      }),
      providesTags: ["artist"],
    }),
    getPricingTierByUserName: builder.query<{ data: IArtistPricingTier[] }, string>({
      query: (userName) => ({
        url: `/artist/get-pricing/${userName}`,
        method: "GET",
      }),
      providesTags: ["artist"],
    }),
  }),
});

export const {
  useGetAllArtistQuery,
  useCreatePricingTierMutation,
  useUpdatePricingTierMutation,
  useGetMyPricingTierQuery,
  useGetRecentlyViewedArtistsQuery,
  useGetArtistProfileByUserNameQuery,
  useGetPricingTierByUserNameQuery,
} = artistApi;
