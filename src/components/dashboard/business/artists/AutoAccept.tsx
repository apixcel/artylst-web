import { IAutoOrderAccept, IQueryMutationErrorResponse } from "@/interface";
import {
  useGetMyAutoOrderAcceptQuery,
  useUpdateMyOrderAcceptMutation,
} from "@/redux/features/artist/availability.api";
import { ShieldCheck, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const AutoAccept = () => {
  const { data } = useGetMyAutoOrderAcceptQuery(undefined);

  const [update, { isLoading: isUpdating }] = useUpdateMyOrderAcceptMutation();

  // Normalize server data to safe defaults
  const initial = useMemo(() => {
    const d = (data?.data ?? {}) as Partial<IAutoOrderAccept>;
    return {
      autoOrderAccept: (d.autoOrderAccept as boolean) ?? false,
      orderQueue: (d.orderQueue as number) ?? 10,
    };
  }, [data]);

  // Local controlled state
  const [state, setState] = useState<{ autoOrderAccept: boolean; orderQueue: number }>(
    initial
  );

  // Keep local state in sync when server data changes
  useEffect(() => {
    setState(initial);
  }, [initial]);

  // Change tracking
  const isDirty =
    state.autoOrderAccept !== initial.autoOrderAccept ||
    state.orderQueue !== initial.orderQueue;

  // Minimal validation
  const hasErrors =
    state.orderQueue < 0 || (state.autoOrderAccept && state.orderQueue < 1);

  const handleSave = async () => {
    if (hasErrors || isUpdating) return;
    console.log("Saving AutoAccept:", state);

    const res = await update(state);
    const err = res?.error as IQueryMutationErrorResponse;
    if (err) {
      toast.error(err.data?.message || "Something went wrong");
      return;
    }
    toast.success("Auto-accept updated successfully");
  };

  return (
    <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 space-y-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3>Auto-accept</h3>
      </div>
      <div className="text-sm text-muted">
        Auto accept new orders until queue limit, then pause.
      </div>
      <label className="mt-2 inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="accent-brand-4"
          checked={state.autoOrderAccept}
          onChange={(e) => setState((s) => ({ ...s, autoOrderAccept: e.target.checked }))}
        />
        Enable
      </label>
      <div>
        <label className="text-sm text-white/60">Auto-pause at queue size</label>
        <input
          type="number"
          min={0}
          value={Number.isFinite(state.orderQueue) ? state.orderQueue : 0}
          onChange={(e) =>
            setState((s) => ({
              ...s,
              orderQueue: Math.max(0, parseInt(e.target.value || "0", 10)),
            }))
          }
          className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2"
        />
        {state.autoOrderAccept && state.orderQueue < 1 && (
          <p className="mt-1 text-xs text-red-300">Must be at least 1 when enabled.</p>
        )}
      </div>
      <div className="rounded-xl p-4 border border-white/10 bg-white/5 text-xs text-white/70 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3 w-3" /> Fans never see your email or phone; LYSTN
          intermediates all contact.
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-3 w-3" /> Faster replies improve your queue ranking.
        </div>
      </div>{" "}
      {isDirty && (
        <button
          onClick={handleSave}
          disabled={hasErrors}
          className="px-3 py-2 cursor-pointer text-sm rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 disabled:opacity-50"
          title={hasErrors ? "Fix validation errors to save" : "Save changes"}
        >
          Save changes
        </button>
      )}
    </div>
  );
};

export default AutoAccept;
