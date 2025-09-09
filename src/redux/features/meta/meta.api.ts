import { IGenre, IMeta, IVibe } from "@/interface";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const metaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVibes: builder.query<
      { data: IVibe[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/meta/vibe?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["meta"],
    }),
    getGenres: builder.query<
      { data: IGenre[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/meta/genre?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["meta"],
    }),
  }),
});

export const { useGetVibesQuery, useGetGenresQuery } = metaApi;
