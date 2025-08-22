import { IUser } from "@/interface/user.interface";
import { api } from "@/redux/api/api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<
      { data: { result: IUser; accessToken: string } },
      IUser
    >({
      query: (post) => ({
        url: "/user/signup",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const { useRegisterCustomerMutation } = userApi;
