import * as React from "react";
import "./index.less";

const TestPage = () => {
  const ref = React.useRef<HTMLVideoElement>(null);

  function playLocalStream(stream: MediaStream) {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }

  async function getLocalStream(constraints: MediaStreamConstraints) {
    // 获取媒体流
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // 将媒体流设置到 video 标签上播放
    playLocalStream(stream);
  }

  React.useEffect(() => {
    getLocalStream({
      audio: false,
      video: true,
    });
  }, []);

  return (
    <div>
      <video
        ref={ref}
        autoPlay
        muted
        style={{ width: 500, height: 500 }}
      ></video>
    </div>
  );
};

export default TestPage;
