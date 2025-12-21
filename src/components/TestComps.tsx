

type SalesOverviewProps = {
  revenue: number;
  changePct: number;
};

export function SalesOverview({ revenue, changePct }: SalesOverviewProps) {
  const positive = changePct >= 0;

  return (
    <div className="h-full  bg-white p-4 shadow-md flex flex-col">
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
            className="w-1  bg-indigo-500"
            style={{ height: 20 + (i % 7) * 6 }}
          />
        ))}
      </div>
    </div>
  );
}

type SystemHealthProps = {
  cpu: number;
  memory: number;
  disk: number;
};

const Bar = ({ label, value }: { label: string; value: number }) => (
  <div className="grid grid-cols-[80px_1fr_40px] items-center gap-2">
    <span className="text-sm text-gray-600">{label}</span>
    <div className="h-2  bg-gray-200">
      <div
        className="h-full  bg-green-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-sm font-medium text-gray-800">{value}%</span>
  </div>
);
export function SystemHealth({ cpu, memory, disk }: SystemHealthProps) {
  return (
    <div className="h-full  bg-white p-4 shadow-md flex flex-col gap-3">
      <div className="text-sm font-semibold text-gray-700">System Health</div>
      <Bar label="CPU" value={cpu} />
      <Bar label="Memory" value={memory} />
      <Bar label="Disk" value={disk} />
    </div>
  );
}

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
    <div className="h-full  bg-white p-4 shadow-md flex flex-col">
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
              <strong className="font-medium">{item.user}</strong>{" "}
              {item.action}
            </span>
            <span className="text-xs text-gray-400">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

