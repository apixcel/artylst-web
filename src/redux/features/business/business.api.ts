import { IArtist, IGenre, IMeta } from "@/interface";
import { IBusinessProfile } from "@/interface/business.interface";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const businessApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavArtist: builder.query<
      { data: IArtist[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/business/fav-artist?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),
    addOrRemoveFavArtist: builder.mutation<{ data: IArtist[] }, string>({
      query: (artistId) => {
        return {
          url: `/business/fav-artist/${artistId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["business"],
    }),

    getBusinessPrfile: builder.query<{ data: IBusinessProfile }, undefined>({
      query: () => {
        return {
          url: `/business/profile`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),
    updateBusinessPrfile: builder.mutation<
      { data: IBusinessProfile },
      Partial<IBusinessProfile>
    >({
      query: (payload) => {
        return {
          url: `/business/update-profile`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["business"],
    }),
    getBusinessRecommendedArtist: builder.query<
      { data: { artists: IArtist[]; genre: IGenre } },
      undefined
    >({
      query: () => {
        return {
          url: `/business/recommended-artist`,
          method: "GET",
        };
      },
      providesTags: ["business"],
    }),
  }),
});

export const {
  useAddOrRemoveFavArtistMutation,
  useGetFavArtistQuery,
  useGetBusinessPrfileQuery,
  useUpdateBusinessPrfileMutation,
  useGetBusinessRecommendedArtistQuery,
} = businessApi;
