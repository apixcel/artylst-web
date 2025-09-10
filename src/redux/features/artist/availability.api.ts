import { api } from "@/redux/api/api";
import { IAvailability } from "@/interface";

const availabilityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWeeklyAvailability: builder.query<{ data: IAvailability }, void>({
      query: () => {
        return {
          url: "/artist/weekly-availability",
          method: "GET",
        };
      },
      providesTags: ["artist"],
    }),
  }),
});

export const { useGetWeeklyAvailabilityQuery } = availabilityApi;
