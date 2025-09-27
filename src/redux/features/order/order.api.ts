import { IMeta } from "@/interface";
import { IOrder } from "@/interface/order.interface";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBusinessOrder: builder.mutation<
      { data: { order: IOrder; sessionUrl: string } },
      Partial<IOrder>
    >({
      query: (payload) => {
        return {
          url: `/order/business`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["order"],
    }),
    getMyBusinessOrder: builder.query<
      { data: IOrder[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/order/my/business?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getMyArtistOrders: builder.query<
      { data: IOrder[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/order/my/artist?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getMyArtistOrderById: builder.query<{ data: IOrder }, string>({
      query: (id) => {
        return {
          url: `/order/my/artist/${id}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    createFanOrder: builder.mutation<
      { data: { order: IOrder; sessionUrl: string } },
      Partial<IOrder>
    >({
      query: (payload) => {
        return {
          url: `/order/fan`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["order"],
    }),
    getMyFanOrder: builder.query<
      { data: IOrder[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/order/my/fan?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCreateBusinessOrderMutation,
  useGetMyBusinessOrderQuery,
  useGetMyArtistOrdersQuery,
  useGetMyArtistOrderByIdQuery,
  useCreateFanOrderMutation,
  useGetMyFanOrderQuery,
} = orderApi;
