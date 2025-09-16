import { IArtistPricingTier } from "@/interface";
import { api } from "@/redux/api/api";

const pricingTierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPricingTier: builder.mutation<
      { data: IArtistPricingTier },
      Pick<
        IArtistPricingTier,
        "name" | "songs" | "deliveryTime" | "priceUsd" | "description" | "revisionCount"
      >
    >({
      query: (body) => ({
        url: `/artist/create-pricing`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["pricingTier", "artist"],
    }),

    updatePricingTier: builder.mutation<{ data: IArtistPricingTier }, IArtistPricingTier>(
      {
        query: (body) => {
          const { _id, ...rest } = body;
          return {
            url: `/artist/update-pricing/${_id}`,
            method: "PATCH",
            body: rest,
          };
        },
        invalidatesTags: ["pricingTier"],
      }
    ),

    getMyPricingTier: builder.query<{ data: IArtistPricingTier[] }, void>({
      query: () => ({
        url: `/artist/get-pricing`,
        method: "GET",
      }),
      providesTags: ["pricingTier"],
    }),

    getPricingTierByUserName: builder.query<
      { data: IArtistPricingTier[] },
      { userName: string }
    >({
      query: ({ userName }) => ({
        url: `/artist/get-pricing/${userName}`,
        method: "GET",
      }),
      providesTags: ["pricingTier"],
    }),
  }),
});

export const {
  useCreatePricingTierMutation,
  useUpdatePricingTierMutation,
  useGetMyPricingTierQuery,
  useGetPricingTierByUserNameQuery,
} = pricingTierApi;
