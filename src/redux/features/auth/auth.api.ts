import { ISession } from "@/interface/session.interface";
import {
  IUser,
  RegisterArtistPayload,
  RegisterBusinessPayload,
} from "@/interface/user.interface";
import { api } from "@/redux/api/api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerArtist: builder.mutation<{ data: { email: string } }, RegisterArtistPayload>({
      query: (post) => ({
        url: "/auth/artist/register",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    checkArtistUserName: builder.mutation<{ data: { isExist: boolean } }, string>({
      query: (userName) => ({
        url: "/auth/check/userName",
        method: "POST",
        body: { userName },
      }),
      invalidatesTags: ["user"],
    }),
    registerBusiness: builder.mutation<
      { data: { email: string } },
      RegisterBusinessPayload
    >({
      query: (post) => ({
        url: "/auth/business/register",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    sendVerificationEmail: builder.mutation<
      { data: { cooldownEnd: number; remainingSecond: number } },
      string
    >({
      query: (email) => ({
        url: "/auth/send-verify-email",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["user"],
    }),
    verifyEmail: builder.mutation<{ data: null }, { otp: number; email: string }>({
      query: (payload) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation<{ data: IUser }, { identifier: string; password: string }>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    logout: builder.mutation<{ data: null }, undefined>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation<{ data: null }, { email: string }>({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<{ data: null }, { token: string; password: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation<
      { data: null },
      { oldPassword: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    getLoggedInSessions: builder.query<{ data: ISession[] }, undefined>({
      query: () => ({
        url: "/auth/session",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    revokeAllSession: builder.mutation<{ data: null }, undefined>({
      query: () => ({
        url: "/auth/session/revoke",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    revokeSessionBySessionId: builder.mutation<{ data: null }, string>({
      query: (sessionId) => ({
        url: `/auth/session/revoke/${sessionId}`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterArtistMutation,
  useCheckArtistUserNameMutation,
  useSendVerificationEmailMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useRegisterBusinessMutation,
  useResetPasswordMutation,
  useGetLoggedInSessionsQuery,
  useRevokeAllSessionMutation,
  useRevokeSessionBySessionIdMutation,
  useChangePasswordMutation,
} = userApi;
