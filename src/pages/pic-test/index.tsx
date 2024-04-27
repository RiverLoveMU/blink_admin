import * as React from "react";
import "./index.less";

const prefix =
  "https://p5-auto.dcarimg.com/img/tos-cn-i-dcdx/20ff66dbd5f647c78c9203b06c0c215b~tplv-dcdx-high-auto-webp:";

const PicTest: React.FC = () => {
  const [deg, setDeg] = React.useState(0);

  // React.useEffect(() => {
  //   const rotate = () => {
  //     requestAnimationFrame(() => {
  //       setDeg((p) => p + 1);
  //       rotate();
  //     });
  //   };
  //   rotate();
  // }, []);

  return (
    <div>
      <img
        srcSet={`${prefix}1280:0.image 1280w, ${prefix}2560:0.image 2560w`}
        style={{ width: 500 }}
        sizes="300px"
      ></img>

      <div
        style={{ background: `linear-gradient(${deg}deg, red, blue)` }}
        className="test-linear-gradient"
      >
        {deg}
      </div>
      <div className="rounded-trapezoid"></div>

      <div
        style={{
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 300,
        }}
      >
        <div style={{ height: 50, width: 50, backgroundColor: "red" }}></div>
        <div style={{ height: 120, width: 120, backgroundColor: "blue" }}></div>
      </div>
    </div>
  );
};

export default PicTest;
