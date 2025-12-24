import React from "react";

/* =========================================================
   1️⃣ Sales Overview (KPI + Trend)
   ========================================================= */

type SalesOverviewProps = {
  revenue: number;
  changePct: number;
};

export function SalesOverview({ revenue, changePct }: SalesOverviewProps) {
  const positive = changePct >= 0;

  return (
    <div className="w-full h-full rounded-xl bg-white p-4 shadow-md flex flex-col">
      <div className="text-sm font-semibold text-gray-700">Sales Overview</div>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-3xl font-bold text-gray-900">
          ${revenue.toLocaleString()}
        </div>
        <div
          className={`text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? "▲" : "▼"} {Math.abs(changePct)}%
        </div>
      </div>

      <div className="mt-auto flex items-end gap-1 pt-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-1 rounded bg-indigo-500"
            style={{ height: 20 + (i % 7) * 6 }}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   2️⃣ System Health (Ops / DevOps)
   ========================================================= */

type SystemHealthProps = {
  cpu: number;
  memory: number;
  disk: number;
};
const Bar = ({ label, value }: { label: string; value: number }) => (
  <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="h-2 rounded bg-gray-200">
      <div
        className="h-full rounded bg-green-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-sm font-medium text-gray-800">{value}%</span>
  </div>
);
export function SystemHealth({ cpu, memory, disk }: SystemHealthProps) {
  return (
    <div className="w-full h-full rounded-xl bg-white p-4 shadow-md flex flex-col gap-3">
      <div className="text-sm font-semibold text-gray-700">System Health</div>
      <Bar label="CPU" value={cpu} />
      <Bar label="Memory" value={memory} />
      <Bar label="Disk" value={disk} />
    </div>
  );
}

/* =========================================================
   3️⃣ Recent Activity Feed (Admin / SaaS)
   ========================================================= */

type Activity = {
  user: string;
  action: string;
  time: string;
};

type ActivityFeedProps = {
  items: Activity[];
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="w-full h-full rounded-xl bg-white p-4 shadow-md flex flex-col">
      <div className="text-sm font-semibold text-gray-700 mb-3">
        Recent Activity
      </div>

      <ul className="flex-1 overflow-auto space-y-2 text-sm">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex justify-between items-center text-gray-700"
          >
            <span>
              <strong className="font-medium">{item.user}</strong> {item.action}
            </span>
            <span className="text-xs text-gray-400">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =========================================================
   4️⃣ User Acquisition Funnel (Growth)
   ========================================================= */

type FunnelStep = {
  label: string;
  value: number;
};

type AcquisitionFunnelProps = {
  steps: FunnelStep[];
};

export function AcquisitionFunnel({ steps }: AcquisitionFunnelProps) {
  const max = Math.max(...steps.map((s) => s.value));

  return (
    <div className="w-full h-full rounded-xl bg-white p-4 shadow-md flex flex-col">
      <div className="text-sm font-semibold text-gray-700 mb-4">
        User Acquisition Funnel
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center">
        {steps.map((step, i) => {
          const pct = Math.round((step.value / max) * 100);

          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-24 text-xs text-gray-600 truncate">
                {step.label}
              </div>

              <div className="flex-1 h-3 bg-gray-200 rounded">
                <div
                  className="h-full bg-indigo-500 rounded transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="w-14 text-right text-xs font-medium text-gray-800">
                {step.value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   5️⃣ Team Tasks & Progress (Project / Ops)
   ========================================================= */

type Task = {
  title: string;
  owner: string;
  progress: number;
};

type TeamTasksProps = {
  tasks: Task[];
};

export function TeamTasks({ tasks }: TeamTasksProps) {
  return (
    <div className="w-full h-full rounded-xl bg-white p-4 shadow-md flex flex-col">
      <div className="text-sm font-semibold text-gray-700 mb-3">Team Tasks</div>

      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {tasks.map((task, i) => (
          <div key={i} className="rounded-lg border border-gray-100 p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-800 truncate">
                {task.title}
              </div>
              <div className="text-xs text-gray-500">{task.owner}</div>
            </div>

            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-green-500 rounded transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>

            <div className="mt-1 text-xs text-gray-500 text-right">
              {task.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
