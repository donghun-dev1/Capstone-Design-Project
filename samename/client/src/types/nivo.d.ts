// client/src/types/nivo.d.ts

declare module "@nivo/pie" {
  import { FC } from "react";

  type NivoPieProps = Record<string, unknown>;

  export const ResponsivePie: FC<NivoPieProps>;
  const Pie: FC<NivoPieProps>;
  export default Pie;
}
