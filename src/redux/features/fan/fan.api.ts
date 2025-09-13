import { IFan } from "@/interface/fan.interface";
import { api } from "@/redux/api/api";

const fanApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateFanProfile: builder.mutation<{ data: IFan }, Partial<IFan>>({
      query: (body) => ({
        url: `/fan/update-profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["fan", "authProfile"],
    }),
  }),
});

export const { useUpdateFanProfileMutation } = fanApi;
