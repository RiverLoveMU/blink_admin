import * as React from "react";

const VideoTest = () => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D>();

  React.useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctxRef.current = ctx;
    }
  });

  const draw = () => {
    const ctx = ctxRef.current as CanvasRenderingContext2D;

    if (ref.current && !ref.current?.ended) {
      ctx.clearRect(0, 0, 640, 360);
      ctx.drawImage(ref.current, 0, 0);

      // const imgUrl = (
      //   document.getElementById("canvas") as HTMLCanvasElement
      // ).toDataURL("image/png");

      // const link = document.createElement("a");
      // link.href = imgUrl;
      // link.download = new Date().getTime() + ".png";
      // link.click();
      // link.remove();

      requestAnimationFrame(draw);
    }
  };

  return (
    <div>
      <div
        onClick={async () => {
          const res = await ref.current?.play();
          draw();
        }}
      >
        开始
      </div>
      <video
        ref={ref}
        src="./big_buck_bunny.mp4"
        style={{ width: 500, height: 500 }}
      ></video>

      <canvas id="canvas" width={640} height={360} />
    </div>
  );
};

export default VideoTest;
