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
        url: `/pricing/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["pricingTier"],
    }),

    updatePricingTier: builder.mutation<{ data: IArtistPricingTier }, IArtistPricingTier>(
      {
        query: (body) => {
          const { _id, ...rest } = body;
          return {
            url: `/artist/update/${_id}`,
            method: "PATCH",
            body: rest,
          };
        },
        invalidatesTags: ["pricingTier"],
      }
    ),

    getMyPricingTier: builder.query<{ data: IArtistPricingTier[] }, void>({
      query: () => ({
        url: `/pricing/get`,
        method: "GET",
      }),
      providesTags: ["pricingTier"],
    }),

    getPricingTierByUserName: builder.query<
      { data: IArtistPricingTier[] },
      { userName: string }
    >({
      query: ({ userName }) => ({
        url: `/pricing/get/${userName}`,
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
