import DynamicGrid from "@/components/dynamic-grid/grid-components/DynamicGrid";
import {
  AcquisitionFunnel,
  ActivityFeed,
  SalesOverview,
  SystemHealth,
  TeamTasks,
} from "@/components/TestComps";

export default function Home() {
  return (
    <DynamicGrid>
      <SalesOverview min-width={3} min-height={3} revenue={124000} changePct={12.4} />

      <SystemHealth cpu={63} memory={78} disk={41} />

      <ActivityFeed
        items={[
          { user: "Alice", action: "created report", time: "2m ago" },
          { user: "Bob", action: "updated settings", time: "10m ago" },
          { user: "Carol", action: "invited user", time: "1h ago" },
        ]}
      />

      <AcquisitionFunnel
        steps={[
          { label: "Visits", value: 12000 },
          { label: "Sign Ups", value: 4200 },
          { label: "Trials", value: 1800 },
          { label: "Paid Users", value: 640 },
        ]}
      />

      <TeamTasks
        tasks={[
          { title: "API refactor", owner: "Alice", progress: 80 },
          { title: "Billing migration", owner: "Bob", progress: 45 },
          { title: "Dashboard redesign", owner: "Carol", progress: 60 },
          { title: "Auth hardening", owner: "Dave", progress: 30 },
        ]}
      />
    </DynamicGrid>
  );
}
