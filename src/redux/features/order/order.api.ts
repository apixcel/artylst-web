import { IMeta } from "@/interface";
import { IOrder } from "@/interface/order.interface";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBusinessOrder: builder.mutation<{ data: IOrder }, Partial<IOrder>>({
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
  }),
});

export const { useCreateBusinessOrderMutation, useGetMyBusinessOrderQuery } = orderApi;
