import * as React from "react";
import { Button, message } from "antd";
import "./index.less";

const max = 100;

const gifts = [
  { name: "礼物一", winner: 88 },
  { name: "礼物二" },
  { name: "礼物三" },
  { name: "礼物四" },
  { name: "礼物五" },
  { name: "礼物六" },
];

const getRandomNumber = () => {
  return Math.ceil(Math.random() * max);
};

const Lottery = () => {
  const [inProgress, setInProgress] = React.useState(false);
  const [luckyNumber, setLuckyNumber] = React.useState<number>();
  const luckyNumberRef = React.useRef<number>();
  const [currentGift, setCurrentGift] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout>();
  const usedLuckyNumberListRef = React.useRef<Array<number>>([]);

  const checkNumber = React.useCallback((number: number): number => {
    if (usedLuckyNumberListRef.current.includes(number)) {
      return checkNumber(getRandomNumber()) as number;
    } else {
      return number;
    }
  }, []);

  const changeLuckyNumber = React.useCallback((number?: number) => {
    setLuckyNumber(number);
    luckyNumberRef.current = number;
  }, []);

  const start = () => {
    setInProgress((prev) => !prev);
  };

  const clear = () => {
    setInProgress(false);
    setTimeout(() => {
      setLuckyNumber(undefined);
    });
  };

  React.useEffect(() => {
    if (inProgress) {
      intervalRef.current = setInterval(() => {
        const number = checkNumber(getRandomNumber());
        changeLuckyNumber(number);
      }, 60);
    }

    return () => {
      if (intervalRef.current) {
        const winnerNumber = gifts[currentGift]?.winner;
        if (
          winnerNumber &&
          !usedLuckyNumberListRef.current.includes(winnerNumber)
        ) {
          changeLuckyNumber(gifts[currentGift]?.winner);
        }
        if (typeof luckyNumberRef.current == "number") {
          usedLuckyNumberListRef.current.push(luckyNumberRef.current);
        }

        clearInterval(intervalRef.current);

        intervalRef.current = undefined;
      }
    };
  }, [inProgress, currentGift, changeLuckyNumber, checkNumber]);

  return (
    <div className="lottery-container">
      <div className="lottery-gift">礼物：{gifts[currentGift].name}</div>
      <h1 className="lottery-title">幸运抽奖</h1>
      <div className="lottery-lucky">{luckyNumber || "?"}</div>
      <div>
        <Button
          onClick={() => {
            if (currentGift === 0) {
              message.info("这就是第一个哦");
              return;
            }

            setCurrentGift((prev) => (prev -= 1));
            clear();
          }}
          size="large"
          ghost
          className="lottery-draw"
        >
          上一个
        </Button>
        <Button onClick={start} size="large" ghost className="lottery-draw">
          {inProgress ? "开奖" : "开始"}
        </Button>
        <Button
          onClick={() => {
            if (currentGift === gifts.length - 1) {
              message.info("没有更多奖品啦");
              return;
            }

            setCurrentGift((prev) => (prev += 1));
            clear();
          }}
          size="large"
          ghost
          className="lottery-draw"
        >
          下一个
        </Button>
      </div>
    </div>
  );
};

export default Lottery;
