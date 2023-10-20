import * as React from "react";
import "./index.less";

const TestPage = () => {
  const ctxRef = React.useRef<CanvasRenderingContext2D>();
  const isDrawingRef = React.useRef(false);
  const [type, setType] = React.useState<"pen" | "eraser">("pen");
  const startPoint = React.useRef({ x: 0, y: 0 });
  const points = React.useRef<Array<{ x: number; y: number }>>([]);

  React.useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctxRef.current = ctx;
      ctxRef.current.lineCap = "round";
      ctxRef.current.lineJoin = "round";
      ctxRef.current.lineWidth = 6;
    }
  }, []);

  const getPoint = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      return { x: e.nativeEvent.offsetX * 2, y: e.nativeEvent.offsetY * 2 };
    },
    []
  );

  const drawLine = React.useCallback(
    (
      start: { x: number; y: number },
      control: { x: number; y: number },
      end: { x: number; y: number }
    ) => {
      if (ctxRef.current) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(start.x, start.y);
        ctxRef.current.quadraticCurveTo(control.x, control.y, end.x, end.y);
        ctxRef.current.stroke();
        ctxRef.current.closePath();
      }
    },
    []
  );

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (ctxRef.current && type) {
      isDrawingRef.current = true;
      const point = getPoint(e);
      startPoint.current = point;
      points.current.push(point);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawingRef.current && type) {
      const point = getPoint(e);
      points.current.push(point);
      if (points.current.length > 2) {
        const lastTwoPoints = points.current.slice(-2);
        const controlPoint = lastTwoPoints[0];
        const endPoint = {
          x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
          y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
        };
        drawLine(startPoint.current, controlPoint, endPoint);
        startPoint.current = endPoint;
      }
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (ctxRef.current && type) {
      isDrawingRef.current = false;
      points.current = [];
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          left: 10,
          top: 10,
          padding: 20,
          background: "white",
        }}
      >
        <div
          onClick={() => {
            setType("pen");
          }}
          style={{
            marginBottom: 20,
            color: type === "pen" ? "blue" : "black",
            cursor: "pointer",
          }}
        >
          铅笔
        </div>
        <div
          onClick={() => {
            setType("eraser");
          }}
          style={{
            color: type === "eraser" ? "blue" : "black",
            cursor: "pointer",
          }}
        >
          橡皮擦
        </div>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        id="canvas"
        width={1600}
        height={1600}
        style={{ backgroundColor: "white", width: 800, height: 800 }}
      />
    </div>
  );
};

export default TestPage;
