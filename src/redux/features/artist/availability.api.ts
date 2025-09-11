import {
  IAutoOrderAccept,
  IDeliveryWindow,
  IUnavailableDates,
  IWeeklyAvailability,
} from "@/interface";
import { api } from "@/redux/api/api";

const availabilityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyAvailability: builder.query<{ data: IWeeklyAvailability }, void>({
      query: () => {
        return {
          url: "/artist/weekly-availability",
          method: "GET",
        };
      },
      providesTags: ["availability"],
    }),
    updateWeeklyAvailability: builder.mutation<
      { data: IWeeklyAvailability },
      Partial<IWeeklyAvailability>
    >({
      query: (payload) => {
        return {
          url: "/artist/weekly-availability",
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["availability"],
    }),
    getUnavailableDates: builder.query<{ data: IUnavailableDates[] }, void>({
      query: () => {
        return {
          url: "/artist/timer-off-slot",
          method: "GET",
        };
      },
      providesTags: ["availability"],
    }),
    createUnavailableDates: builder.mutation<
      { data: IUnavailableDates },
      Pick<IUnavailableDates, "startTime" | "endTime">
    >({
      query: (body) => {
        return {
          url: "/artist/timer-off-slot",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["availability"],
    }),
    deleteUnavailableDates: builder.mutation<{ data: IUnavailableDates }, string>({
      query: (id) => {
        return {
          url: `/artist/timer-off-slot/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["availability"],
    }),

    getMyDeliveryWindow: builder.query<{ data: IDeliveryWindow }, undefined>({
      query: () => {
        return {
          url: "/artist/delivery-window",
          method: "GET",
        };
      },
      providesTags: ["availability"],
    }),
    updateDeliveryWindow: builder.mutation<
      { data: IDeliveryWindow },
      Partial<IDeliveryWindow>
    >({
      query: (body) => {
        return {
          url: "/artist/delivery-window",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["availability"],
    }),
    getMyAutoOrderAccept: builder.query<{ data: IAutoOrderAccept }, undefined>({
      query: () => {
        return {
          url: "/artist/auto-accept",
          method: "GET",
        };
      },
      providesTags: ["availability"],
    }),
    updateMyOrderAccept: builder.mutation<
      { data: IAutoOrderAccept },
      Partial<IAutoOrderAccept>
    >({
      query: (body) => {
        return {
          url: "/artist/auto-accept",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["availability"],
    }),
  }),
});

export const {
  useGetWeeklyAvailabilityQuery,
  useGetUnavailableDatesQuery,
  useCreateUnavailableDatesMutation,
  useDeleteUnavailableDatesMutation,
  useUpdateWeeklyAvailabilityMutation,
  useGetMyDeliveryWindowQuery,
  useUpdateDeliveryWindowMutation,
  useGetMyAutoOrderAcceptQuery,
  useUpdateMyOrderAcceptMutation,
} = availabilityApi;
