import { IMeta } from "@/interface";
import { INotification } from "@/interface/notification";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<
      { data: INotification[]; meta: IMeta },
      Record<string, string | number>
    >({
      query: (query) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/notification/my?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),
    getMyNotificationStats: builder.query<
      { data: { total: number; readCount: number; unreadCount: number }; meta: IMeta },
      undefined
    >({
      query: () => {
        return {
          url: `/notification/my/stats`,
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),
    markAllNotificationAsRead: builder.mutation<{ data: null }, undefined>({
      query: () => {
        return {
          url: `/notification/my/read-all`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["notification"],
    }),
    markNotificationAsReadById: builder.mutation<{ data: null }, string>({
      query: (notificationId) => {
        return {
          url: `/notification/my/read/${notificationId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetMyNotificationsQuery,
  useGetMyNotificationStatsQuery,
  useMarkAllNotificationAsReadMutation,
  useMarkNotificationAsReadByIdMutation,
} = notificationApi;
