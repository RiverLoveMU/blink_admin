import * as React from "react";
import { Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const gameList = [
  {
    name: "动物",
    questions: [
      "企鹅",
      "袋鼠",
      "恐龙",
      "大象",
      "长颈鹿",
      "树袋熊",
      "狒狒",
      "熊猫",
      "火鸡",
      "鸭嘴兽",
      "松鼠",
      "鹦鹉",
      "火烈鸟",
      "猫头鹰",
      "巨蜥",
      "老鹰",
      "犀牛",
      "猴子",
      "鳄鱼",
      "蜻蜓",
      "章鱼",
      "龙虾",
      "乌龟",
      "兔子",
      "马",
      "雪貂",
      "牛",
      "燕子",
      "蝴蝶",
      "鲨鱼",
      "螃蟹",
      "狗",
      "猫",
      "鸵鸟",
      "豹子",
    ],
  },
  {
    name: "日常用品",
    questions: [
      "手机",
      "水壶",
      "电脑",
      "热水袋",
      "电灯泡",
      "马桶",
      "电视",
      "雨伞",
      "游戏机",
      "空调",
      "手套",
      "耳机",
      "冰箱",
      "洗衣机",
      "旅行箱",
      "热水器",
      "窗帘",
      "吸尘器",
      "枕头",
      "电饭煲",
      "电磁炉",
      "豆浆机",
      "背包",
      "饮水机",
      "电吹风",
      "衣架",
      "剃须刀",
      "按摩椅",
      "洗碗机",
      "加湿器",
      "吊扇",
      "微波炉",
      "榨汁机",
      "熨斗",
      "茶杯",
    ],
  },
  {
    name: "食物",
    questions: [
      "炸鸡",
      "北京烤鸭",
      "汉堡",
      "蛋炒饭",
      "热狗",
      "炒面",
      "牛排",
      "火锅",
      "红烧肉",
      "蛋糕",
      "烧烤",
      "月饼",
      "馄饨",
      "麻辣烫",
      "寿司",
      "包子",
      "回锅肉",
      "烤鱼",
      "麻婆豆腐",
      "油条",
      "红烧肥肠",
      "冰淇淋",
      "薯条",
      "糖醋排骨",
      "炒年糕",
      "烤全羊",
      "拉面",
      "番茄炒蛋",
      "烤红薯",
      "意大利面",
      "茶叶蛋",
      "鱼香肉丝",
      "沙拉",
      "红烧牛肉面",
      "春卷",
    ],
  },
];

const time = 90;

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
