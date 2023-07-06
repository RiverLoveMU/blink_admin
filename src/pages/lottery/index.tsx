import * as React from "react";
import { Button } from "antd";
import "./index.less";

const max = 100;

const cheat = 88;

const Lottery = () => {
  const [inProgress, setInProgress] = React.useState(false);
  const [luckyNumber, setLuckyNumber] = React.useState<number>();
  const intervalRef = React.useRef<NodeJS.Timeout>();

  const start = () => {
    setInProgress((prev) => !prev);
  };

  React.useEffect(() => {
    if (inProgress) {
      intervalRef.current = setInterval(() => {
        setLuckyNumber(Math.ceil(Math.random() * max));
      }, 60);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        // setLuckyNumber(cheat);
        intervalRef.current = undefined;
      }
    };
  }, [inProgress]);

  return (
    <div className="lottery-container">
      <h1 className="lottery-title">幸运抽奖</h1>
      <div className="lottery-lucky">{luckyNumber || "?"}</div>
      <Button onClick={start} size="large" ghost className="lottery-draw">
        {inProgress ? "开奖" : "开始"}
      </Button>
    </div>
  );
};

export default Lottery;
