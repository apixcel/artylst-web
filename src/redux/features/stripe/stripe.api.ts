import { api } from "@/redux/api/api";
import { IStripeAccount } from "@/interface";

const stripeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStripeAccountStats: builder.query<{ data: IStripeAccount }, void>({
      query: () => ({ url: "/stripe/account-status", method: "GET" }),
      providesTags: ["stripe"],
    }),
  }),
});

export const { useGetStripeAccountStatsQuery } = stripeApi;
export default stripeApi;
