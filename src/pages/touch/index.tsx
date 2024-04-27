import { resolve } from "path";
import * as React from "react";

const TouchTest: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const touchStart = (e: TouchEvent) => {
      console.log("touchStart===>", e.touches?.[0], e.targetTouches?.[0]);
    };

    const touchMove = (e: TouchEvent) => {
      console.log("touchMove===>", e.touches?.[0], e.targetTouches?.[0]);
    };

    const touchEnd = (e: TouchEvent) => {
      console.log("touchEnd===>", e.touches?.[0], e.targetTouches?.[0]);
    };

    if (ref.current) {
      ref.current.addEventListener("click", (e) => {
        console.log(e);
      });
      ref.current.addEventListener("touchstart", touchStart);
      ref.current.addEventListener("touchmove", touchMove);
      ref.current.addEventListener("touchend", touchEnd);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("touchstart", touchStart);
        ref.current.removeEventListener("touchmove", touchMove);
        ref.current.removeEventListener("touchend", touchEnd);
      }
    };
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <div
        ref={ref}
        style={{ width: 200, height: 200, background: "red" }}
      ></div>
    </div>
  );
};

export default TouchTest;
