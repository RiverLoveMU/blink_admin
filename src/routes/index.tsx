import DataPlatform from "@/pages/data-platform/index";
import MemberList from "@/pages/member-list/index";
import DataEntry from "@/pages/data-entry";
import TestPage from "@/pages/test-page";
import Lottery from "@/pages/lottery";
import Signature from "@/pages/signature";
import Game from "@/pages/game";
import File from "@/pages/file";
import VideoTest from "@/pages/video-test";
import ExcelReader from "@/pages/excel-reader";
import PicTest from "@/pages/pic-test";
import Observer from "@/pages/observer";
import Touch from "@/pages/touch";
import TestWorker from "@/pages/test-worker";
import { ROUTE_KEY_PREFIX } from "@/common/constants";

export interface IRoute {
  name: string;
  key: string;
  path?: string;
  component?: React.FC;
  children?: IRoute[];
  icon?: React.FC;
}

export const routes: IRoute[] = [
  {
    name: "testWorker",
    key: `${ROUTE_KEY_PREFIX}testWorker`,
    path: "/testWorker",
    component: TestWorker,
  },
  {
    name: "touch",
    key: `${ROUTE_KEY_PREFIX}touch`,
    path: "/touch",
    component: Touch,
  },
  {
    name: "observer",
    key: `${ROUTE_KEY_PREFIX}observer`,
    path: "/observer",
    component: Observer,
  },
  {
    name: "picTest",
    key: `${ROUTE_KEY_PREFIX}pic_test`,
    path: "/pic_test",
    component: PicTest,
  },
  {
    name: "转excel",
    key: `${ROUTE_KEY_PREFIX}excel_reader`,
    path: "/excel_reader",
    component: ExcelReader,
  },
  {
    name: "测试页面",
    key: `${ROUTE_KEY_PREFIX}test_page`,
    path: "/test_page",
    component: TestPage,
  },
  {
    name: "签名",
    key: `${ROUTE_KEY_PREFIX}signature`,
    path: "/signature",
    component: Signature,
  },
  {
    name: "文件处理",
    key: `${ROUTE_KEY_PREFIX}file`,
    path: "/file",
    component: File,
  },
  {
    name: "视频截图",
    key: `${ROUTE_KEY_PREFIX}video_test`,
    path: "/video_test",
    component: VideoTest,
  },
  {
    name: "抽奖",
    key: `${ROUTE_KEY_PREFIX}lottery`,
    path: "/lottery",
    component: Lottery,
  },
  {
    name: "抽奖",
    key: `${ROUTE_KEY_PREFIX}game`,
    path: "/game",
    component: Game,
  },
  {
    name: "数据录入",
    key: `${ROUTE_KEY_PREFIX}data_entry`,
    path: "/data_entry",
    component: DataEntry,
  },
  {
    name: "数据台",
    key: `${ROUTE_KEY_PREFIX}data_platform`,
    path: "/data_platform",
    component: DataPlatform,
  },
  {
    name: "球队信息",
    key: `${ROUTE_KEY_PREFIX}team_info`,
    path: "/team_info",
    children: [
      {
        name: "成员列表",
        key: `${ROUTE_KEY_PREFIX}team_info.member_list`,
        path: "/team_info/member_list",
        component: MemberList,
      },
    ],
  },
];
