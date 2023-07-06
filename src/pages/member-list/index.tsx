import * as React from "react";
import List, { ListRef } from "rc-virtual-list";
import _ from "lodash";

type ItemList = { key: number; name: string }[];

const data: ItemList = [];

for (let index = 22; index > 0; index--) {
  data.push({
    key: index,
    name: "测试",
  });
}

const MemberList: React.FC = () => {
  const [list, setList] = React.useState<ItemList>([]);
  const [height, setHeight] = React.useState<number>(200);
  const listRef = React.useRef<ListRef>(null);
  const isBottom = React.useRef(true);
  const isTop = React.useRef(false);
  const lastKey = React.useRef<number>();

  React.useEffect(() => {
    setTimeout(() => {
      setHeight(500);
    }, 1000);

    setTimeout(() => {
      setList([]);
    }, 3000);

    setTimeout(() => {
      setList(data);
    }, 5000);
  }, []);

  React.useLayoutEffect(() => {
    if (listRef.current) {
      if (isBottom.current) {
        listRef.current.scrollTo({
          index: list.length - 1,
          align: "auto",
        });
      } else if (isTop.current) {
        if (_.findIndex(list, (i) => i.key === lastKey.current) > -1) {
          listRef.current.scrollTo({
            index: _.findIndex(list, (i) => i.key === lastKey.current),
            align: "top",
          });
        }
      }
    }
  }, [list]);

  const getNewData = React.useCallback((num = 10) => {
    const dateTime = new Date().getTime();
    const newData: { key: number; name: string }[] = [];

    for (let index = 0; index < num; index++) {
      newData.push({
        key: index + dateTime,
        name: "新增" + dateTime,
      });
    }
    setList((prev) => [...prev, ...newData]);
  }, []);

  const getOldData = React.useCallback((num = 10) => {
    const dateTime = new Date().getTime();
    const newData: { key: number; name: string }[] = [];

    for (let index = 0; index < num; index++) {
      newData.push({
        key: index + dateTime,
        name: "国往" + dateTime,
      });
    }
    setList((prev) => [...newData, ...prev]);
  }, []);

  const onVisibleChange = React.useCallback((v: ItemList) => {
    if (!isTop.current === true) {
      lastKey.current = _.first(v)?.key;
    }
  }, []);

  const onScroll = React.useCallback(
    _.throttle((e: React.UIEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      console.log(e, target);
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        isBottom.current = true;
      } else {
        isBottom.current = false;
      }

      if (target.scrollTop < target.scrollHeight * 0.3) {
        isTop.current = true;
        getOldData(10);
      } else {
        isTop.current = false;
      }
    }, 200),
    []
  );

  return (
    <div>
      <List
        ref={listRef}
        data={list}
        height={height}
        itemHeight={30}
        itemKey="key"
        onVisibleChange={onVisibleChange}
        onScroll={onScroll}
      >
        {(item) => (
          <div style={{ height: 50 }}>{`${item.key}-${item.name}`}</div>
        )}
      </List>
      <div onClick={() => getNewData(1)}>add</div>
    </div>
  );
};

export default MemberList;
