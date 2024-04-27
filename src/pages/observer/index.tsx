import * as React from "react";
import "./index.less";

const ObserverTest: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = React.useState("blue");

  React.useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        console.log(e);
      },
      true
    );
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log(entry.isIntersecting, entry.intersectionRatio);
        if (entry.isIntersecting) {
          setBgColor("green");
        } else {
          setBgColor("blue");
        }
        console.log(entry.intersectionRatio, entry.isIntersecting, entry);
      },
      {
        root: undefined,
        threshold: 0.5,
        rootMargin: undefined,
      }
    );

    observer.observe(ref.current as HTMLDivElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="observer" style={{ background: bgColor }}></div>
      <div ref={ref} className="observer">
        11111
      </div>
      <div className="observer" style={{ background: bgColor }}></div>
    </div>
  );
};

export default ObserverTest;
