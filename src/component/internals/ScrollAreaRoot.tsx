import {
  Dispatch,
  FC,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export interface ScrollAreaRootProps extends PropsWithChildren {
  className?: string;
}

interface ScrollAreaContextProps {
  viewportRef: RefObject<HTMLDivElement>;
  setViewportRef: Dispatch<SetStateAction<RefObject<HTMLDivElement>>>;
  viewportScrollTop: number;
  setViewportScrollTop: Dispatch<SetStateAction<number>>;
  scrollHide: boolean;
  setScrollHide: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const ScrollAreaContext = createContext<ScrollAreaContextProps>({
  viewportRef: { current: null },
  setViewportRef: () => {},
  viewportScrollTop: 0,
  setViewportScrollTop: () => {},
  scrollHide: true,
  setScrollHide: () => {},
  className: undefined,
});

export const useScrollAreaContext = () => {
  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("(!) Cannot use `ScrollArea` Context at here.");
  }
  return context;
};
const ScrollAreaRoot: FC<ScrollAreaRootProps> = (props) => {
  const { children, className } = props;
  const [viewportRef, setViewportRef] = useState<RefObject<HTMLDivElement>>({
    current: null,
  });
  const [viewportScrollTop, setViewportScrollTop] = useState<number>(0);
  const [scrollHide, setScrollHide] = useState<boolean>(true);
  const contextValue = useMemo(
    () => ({
      viewportRef,
      setViewportRef,
      viewportScrollTop,
      setViewportScrollTop,
      scrollHide,
      setScrollHide,
      className,
    }),
    [viewportRef.current, viewportScrollTop, scrollHide]
  );
  return (
    <ScrollAreaContext.Provider value={contextValue}>
      {children}
    </ScrollAreaContext.Provider>
  );
};
export default ScrollAreaRoot;
