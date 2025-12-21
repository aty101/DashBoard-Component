import DynamicGrid from "@/components/dynamic-grid/grid-components/DynamicGrid";
import {
  ActivityFeed,
  SalesOverview,
  SystemHealth,
} from "@/components/TestComps";

function renderWidget(type: number) {
  switch (type) {
    case 1:
      return <SalesOverview revenue={124000} changePct={12.4} />;
    case 2:
      return <SystemHealth cpu={63} memory={78} disk={41} />;
    case 3:
      return (
        <ActivityFeed
          items={[
            { user: "Alice", action: "created report", time: "2m ago" },
            { user: "Bob", action: "updated settings", time: "10m ago" },
            { user: "Carol", action: "invited user", time: "1h ago" },
          ]}
        />
      );
    default:
      return <div>Unknown</div>;
  }
}

export default function Home() {
  return (
    <>
      <DynamicGrid>
        {renderWidget(1)}
        {renderWidget(2)}
        {renderWidget(3)}
      </DynamicGrid>
    </>
  );
}
