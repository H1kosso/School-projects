import { StyleSheet } from "react-native";

import { OrientationType } from "./Orientation";
import { CalculatorPortraitLayout } from "./CalculatorPortraitLayout";
import { CalculatorLandscapeLayout } from "./CalculatorLandscapeLayout";
import { calculatorStyles } from "../styles/style";
import { get2DArrayDims } from "../utils/utils";
import { CalculatorLogic } from './CalculatorLogic';
import CalculatorKey from './CalculatorKey';

type Layout<T extends StyleSheet.NamedStyles<T>> = {
  buttons: CalculatorKey[][];
  styles: T;
};

export function CalculatorLayout(
  orientation: OrientationType,
  logic: CalculatorLogic,
): Layout<any> {
  const isPortraitLayout = orientation === OrientationType.Portrait;
  const layout = isPortraitLayout
    ? CalculatorPortraitLayout(logic)
    : CalculatorLandscapeLayout(logic);
  return {
    buttons: layout,
    styles: calculatorStyles(get2DArrayDims(layout)),
  };
}

