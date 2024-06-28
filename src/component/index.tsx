import Root from "./internals/ScrollAreaRoot";
import Viewport from "./internals/ScrollAreaViewport";
import ScrollBar from "./internals/ScrollAreaScrollBar";
import Thumb from "./internals/ScrollAreaThumb";
import { CSSProperties, FC, PropsWithChildren } from "react";

interface ScrollProps extends PropsWithChildren {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}
const Scroll: FC<ScrollProps> = (props) => {
  const { children, width, height } = props;
  return (
    <Root>
      <Viewport width={width} height={height}>
        {children}
      </Viewport>
      <ScrollBar>
        <Thumb />
      </ScrollBar>
    </Root>
  );
};
export default Scroll;
