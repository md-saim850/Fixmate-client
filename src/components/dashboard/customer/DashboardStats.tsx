
import {
  ClipboardList,
  Clock,
  CheckCircle2,
} from "lucide-react";

import StatCard from "./StatCard";

interface Props {
  totalRequests: number;
  activeJobs: number;
  completedJobs: number;
}

export default function DashboardStatus({
  totalRequests,
  activeJobs,
  completedJobs,
}: Props) {
  const status = [
    {
      title: "Total Requests",
      value: totalRequests,
      description: "All your service bookings",
      icon: ClipboardList,
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      description: "Currently accepted or in progress",
      icon: Clock,
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      description: "Successfully completed services",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {status.map((val) => (
        <StatCard key={val.title} {...val} />
      ))}
    </div>
  );
}
