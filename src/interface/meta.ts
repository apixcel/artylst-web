export interface IMeta {
  totalDoc: number;
  page?: number;
  cursorIn?: string;
  nextCursor?: string | null;
  hasMore?: boolean;
}
