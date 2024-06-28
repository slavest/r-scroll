import {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  WheelEventHandler,
  useEffect,
  useRef,
} from "react";

import { useScrollAreaContext } from "./ScrollAreaRoot";
import makeClassName from "../utils/makeClassName";

export interface ScrollAreaViewportProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

const defaultScrollBarCls = "scroll-viewport";
const ScrollAreaViewport: FC<ScrollAreaViewportProps> = (props) => {
  const { setViewportRef, setViewportScrollTop, className } =
    useScrollAreaContext();
  const cls = makeClassName(className, defaultScrollBarCls);

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      setViewportRef(viewportRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportRef.current]);
  const { children, width = "auto", height = "200px", ...restProps } = props;
  const handleWheel: WheelEventHandler<HTMLDivElement> = (e) => {
    setViewportScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      className={cls}
      style={{
        width,
        height,
        overflow: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
      }}
      onWheel={handleWheel}
      ref={viewportRef}
      {...restProps}
    >
      {children}
    </div>
  );
};
export default ScrollAreaViewport;
