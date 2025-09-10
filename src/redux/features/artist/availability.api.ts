import { api } from "@/redux/api/api";
import { IAvailability, IUnavailableDates } from "@/interface";

const availabilityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyAvailability: builder.query<{ data: IAvailability }, void>({
      query: () => {
        return {
          url: "/artist/weekly-availability",
          method: "GET",
        };
      },
      providesTags: ["availability"],
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
  }),
});

export const {
  useGetWeeklyAvailabilityQuery,
  useGetUnavailableDatesQuery,
  useCreateUnavailableDatesMutation,
  useDeleteUnavailableDatesMutation,
} = availabilityApi;
