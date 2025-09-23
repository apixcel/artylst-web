import { IConversation, IMessage } from "@/interface/conversation.interface";
import { api } from "@/redux/api/api";
import { generateQueryParams } from "@/utils";

const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyConversationList: builder.query<{ data: IConversation[] }, undefined>({
      query: () => {
        return {
          url: `/conversation/my`,
          method: "GET",
        };
      },
      providesTags: ["conversation"],
    }),
    getMessagesByConversationId: builder.query<
      { data: IMessage[] },
      { conversationId: string; query: Record<string, string | number> }
    >({
      query: ({ query, conversationId }) => {
        const queryString = generateQueryParams(query);
        return {
          url: `/conversation/messages/${conversationId}?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["conversation-message"],
    }),
    sendMessageByConversation: builder.mutation<
      { data: IMessage[] },
      { conversation: string; text: string }
    >({
      query: (payload) => {
        return {
          url: `/conversation/message`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["conversation-message-send"],
    }),
  }),
});

export const {
  useGetMyConversationListQuery,
  useGetMessagesByConversationIdQuery,
  useSendMessageByConversationMutation,
} = conversationApi;
