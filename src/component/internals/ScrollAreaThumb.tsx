import {
  CSSProperties,
  PointerEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScrollAreaContext } from "./ScrollAreaRoot";
import { useScrollBarContext } from "./ScrollAreaScrollBar";
import makeClassName from "../utils/makeClassName";

const defaultThumbStyle: CSSProperties = {
  width: "6px",
  height: "12px",
  borderRadius: "4px",
  background: "silver",
  position: "relative",
};

const defaultScrollBarCls = "scroll-thumb";
const ScrollAreaThumb = () => {
  const { viewportRef, viewportScrollTop, className } = useScrollAreaContext();
  const cls = makeClassName(className, defaultScrollBarCls);

  const [position, setPosition] = useState<number>(0);
  const [thumbHeight, setThumbHeight] = useState<number>(0);

  const thumbRef = useRef<HTMLDivElement>(null);
  const { orientation } = useScrollBarContext();

  useEffect(() => {
    const viewportScrollHeight = viewportRef.current?.scrollHeight || 0;
    const viewportClientHeight = viewportRef.current?.clientHeight || 0;
    setPosition(
      (viewportScrollTop * viewportClientHeight) / viewportScrollHeight
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportScrollTop]);

  useEffect(() => {
    if (viewportRef.current) {
      const viewportScrollHeight = viewportRef.current?.scrollHeight || 0;
      const viewportClientHeight = viewportRef.current?.clientHeight || 0;
      setThumbHeight(
        viewportClientHeight / (viewportScrollHeight / viewportClientHeight)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportRef.current]);

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    thumbRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    const viewportStartY = viewportRef.current?.offsetTop || 0;
    const viewportEndY =
      viewportStartY + (viewportRef.current?.clientHeight || 0);
    if (e.clientY < viewportStartY) {
      setPosition(0);
      viewportRef.current?.scroll({ top: 0 });
    }
    if (e.clientY > viewportEndY) {
      setPosition((viewportRef.current?.clientHeight || 0) - thumbHeight);
      viewportRef.current?.scroll({ top: viewportRef.current.scrollHeight });
    }
    if (thumbRef.current?.hasPointerCapture(e.pointerId)) {
      const newPosition =
        e.clientY - (viewportRef.current?.getClientRects()[0]?.y || 0);
      const viewportScrollHeight = viewportRef.current?.scrollHeight || 0;
      const viewportClientHeight = viewportRef.current?.clientHeight || 0;

      if (newPosition < 0) return;
      if (newPosition + thumbHeight > viewportClientHeight) return;

      viewportRef.current?.scroll({
        top: (newPosition * viewportScrollHeight) / viewportClientHeight,
      });
      setPosition(newPosition);
    }
  };
  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    thumbRef.current?.releasePointerCapture(e.pointerId);
  };

  const handlePointerLeave: PointerEventHandler<HTMLDivElement> = (e) => {
    thumbRef.current?.hasPointerCapture(e.pointerId);
  };

  useEffect(() => {
    // console.log(position);
  }, [position]);

  return (
    <div
      className={cls}
      ref={thumbRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      style={{
        ...defaultThumbStyle,
        transform: `translate${
          orientation === "vertical" ? "Y" : "X"
        }(${position}px)`,
        height: `${thumbHeight}px`,
      }}
    />
  );
};
export default ScrollAreaThumb;
