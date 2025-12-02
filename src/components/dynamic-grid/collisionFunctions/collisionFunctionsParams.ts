import { RefObject } from "react";
import { SetStateType, WidgetDetailsType } from "../types";

export type siblingsCollisionParams = {
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  widgetsDetailsRef: RefObject<WidgetDetailsType[]>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
};
