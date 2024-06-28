import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useScrollAreaContext } from "./ScrollAreaRoot";
import useDebounce from "../hooks/useDebounce";
import makeClassName from "../utils/makeClassName";
export interface ScrollAreaScrollBarProps extends PropsWithChildren {
  orientation?: "vertical" | "horizontal";
}
interface ScrollBarContextProps
  extends Pick<ScrollAreaScrollBarProps, "orientation"> {}
const ScrollBarContext = createContext<ScrollBarContextProps>({});

export const useScrollBarContext = () => {
  const context = useContext(ScrollBarContext);
  if (!context) {
    throw new Error("(!) Cannot use `Scrollbar` Context at here.");
  }
  return context;
};

const defaultScrollBarCls = "scroll-scrollbar";
const ScrollAreaScrollBar: FC<ScrollAreaScrollBarProps> = (props) => {
  const { viewportRef, className } = useScrollAreaContext();
  const cls = makeClassName(className, defaultScrollBarCls);

  const { children, orientation = "vertical" } = props;
  const [barStyle, setBarStyle] = useState({ x: 0, y: 0, height: 0 });
  const debouncedBarStyle = useDebounce(barStyle, 50);

  const setBarPosition = () => {
    // TODO :: x = viewport.width - ScrollThumb.width
    const x = viewportRef?.current?.offsetWidth ?? 0;
    const y = viewportRef?.current?.offsetTop ?? 0;
    const height = viewportRef?.current?.clientHeight ?? 0;
    setBarStyle({ x, y, height });
  };

  useEffect(() => {
    if (viewportRef.current) {
      setBarPosition();
    }
    window.addEventListener("resize", setBarPosition);
    return () => {
      window.removeEventListener("resize", setBarPosition);
    };
  }, [viewportRef.current]);
  const contextValue = {
    orientation,
  };

  return (
    <ScrollBarContext.Provider value={contextValue}>
      <div
        className={cls}
        style={{
          width: "6px",
          height: debouncedBarStyle.height,
          top: debouncedBarStyle.y,
          left: debouncedBarStyle.x,
          background: "#eeeeee",
          position: "absolute",
          zIndex: 5,
        }}
      >
        {children}
      </div>
    </ScrollBarContext.Provider>
  );
};
export default ScrollAreaScrollBar;
