import { RefObject, useEffect, useEffectEvent } from "react";
import { WidgetDetailsType } from "../types";

export function useWidgetDetails(
  widgetsDetailsRef: RefObject<WidgetDetailsType[]>,
  widgetsDetails: WidgetDetailsType[]

) {
  const changeWidgetDetailsRef = useEffectEvent(
    (widgets: WidgetDetailsType[]) => {
      widgetsDetailsRef.current = widgets;
    }
  );
  useEffect(() => {
    changeWidgetDetailsRef(widgetsDetails);
  }, [widgetsDetails]);
}
