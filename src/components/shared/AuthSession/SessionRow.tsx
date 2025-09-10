import { ISession } from "@/interface/session.interface";
import { formatDistanceToNow } from "date-fns";
import SignoutBySessionId from "./SignoutBySessionId";

const SessionRow = ({ session }: { session: ISession }) => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex flex-col">
        <span className="font-medium">{session.userAgent || "Unknown device"}</span>
        <span className="text-xs text-muted">
          Last seen:{" "}
          {formatDistanceToNow(new Date(session.lastSeenAt), {
            addSuffix: true,
          })}
        </span>
      </div>

      {session.isThisDevice ? (
        <span className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-500">
          This device
        </span>
      ) : (
        <SignoutBySessionId session={session} />
      )}
    </div>
  );
};

export default SessionRow;
