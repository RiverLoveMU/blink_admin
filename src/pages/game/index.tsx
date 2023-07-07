import * as React from "react";
import { Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const gameList = [
  {
    name: "动物",
    questions: ["动物1", "动物2", "动物3", "动物4", "动物5"],
  },
  {
    name: "水果",
    questions: ["水果1", "水果2", "水果3", "水果4", "水果5"],
  },
  {
    name: "食物",
    questions: ["食物1", "食物2", "食物3", "食物4", "食物5"],
  },
];

const time = 120;

const Lottery = () => {
  const [currentType, setCurrentType] = React.useState<number>();
  const [lastTime, setLastTime] = React.useState(time);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [pointList, setPointList] = React.useState<number[]>([]);
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const isChoose = typeof currentType === "number";

  const currentQuestionList = isChoose ? gameList[currentType]?.questions : [];

  const reset = React.useCallback((info: string) => {
    setCurrentType(undefined);
    setLastTime(time);
    message.info(info);
  }, []);

  React.useEffect(() => {
    if (isChoose && lastTime !== 0) {
      timeoutRef.current = setTimeout(() => {
        setLastTime(lastTime - 1);
      }, 1000);
    } else {
      if (!lastTime) {
        reset("时间到啦~");
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isChoose, lastTime, reset]);

  const goNext = () => {
    if (currentQuestion === currentQuestionList.length - 1) {
      reset("题目已经答完啦~");
      return;
    }

    setCurrentQuestion((prev) => (prev += 1));
  };

  return (
    <div className="wedding-container">
      <h1 className="wedding-title">你比我猜</h1>
      {isChoose && (
        <div className="wedding-gift">
          <span className="wedding-tip">
            当前得分：{pointList[currentType]}分
          </span>
          <span className="wedding-tip">倒计时：{lastTime}秒</span>
        </div>
      )}
      <div className="wedding-lucky">
        {isChoose
          ? currentQuestionList[currentQuestion]
          : gameList.map((game, index) => {
              return (
                <div
                  onClick={() => {
                    if (typeof pointList[index] === "number") {
                      message.info("已经玩过啦，请选择另一个分类吧~");
                      return;
                    }

                    setCurrentQuestion(0);
                    setCurrentType(index);
                    setPointList((prev) => {
                      prev[index] = 0;
                      return prev;
                    });
                  }}
                  className="wedding-item"
                  key={index}
                >
                  {game.name}
                  {typeof pointList[index] === "number" && (
                    <div className={"wedding-point"}>{pointList[index]}分</div>
                  )}
                </div>
              );
            })}
      </div>
      {isChoose && (
        <div>
          <Button
            icon={<CheckOutlined rev={undefined} />}
            size="large"
            ghost
            className="wedding-draw"
            onClick={() => {
              setPointList((prev) => {
                return prev.map((point, index) => {
                  return index === currentType ? point + 1 : point;
                });
              });
              goNext();
            }}
          >
            成功
          </Button>
          <Button
            icon={<CloseOutlined rev={undefined} />}
            size="large"
            ghost
            className="wedding-draw"
            onClick={() => {
              goNext();
            }}
          >
            跳过
          </Button>
        </div>
      )}
    </div>
  );
};

export default Lottery;
