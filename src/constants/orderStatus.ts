export const statusOption = {
  pending: {
    className: "bg-yellow-500/10 text-yellow-500",
    label: "Pending",
    description: "Waiting for artist approval",
  },
  accepted: {
    className: "bg-green-500/10 text-green-500",
    label: "Accepted",
    description: "Work started by the artist",
  },
  rejected: {
    className: "bg-red-500/10 text-red-500",
    label: "Rejected",
    description: "Order was rejected by the artist",
  },
  "in-revision": {
    className: "bg-blue-500/10 text-blue-500",
    label: "In Revision",
    description: "Customer requested changes, work under revision",
  },
  completed: {
    className: "bg-emerald-500/10 text-emerald-500",
    label: "Completed",
    description: "Order successfully completed",
  },
  disputed: {
    className: "bg-orange-500/10 text-orange-500",
    label: "Disputed",
    description: "Order is under dispute resolution",
  },
  delivered: {
    className: "bg-indigo-500/10 text-indigo-500",
    label: "Delivered",
    description: "Work delivered, awaiting confirmation",
  },
};
