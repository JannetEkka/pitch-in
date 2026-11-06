import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export const gridTheme = themeQuartz.withParams({
  accentColor: "#1f7a5a",
  fontFamily: "inherit",
  headerFontWeight: 600,
  borderRadius: 8,
  wrapperBorderRadius: 10,
  rowHoverColor: "#eef7f2",
});
