import { EventPrototype } from "@cgx-designer/types";

export const defaultEvents: EventPrototype[] = [
  {
    title: "生命周期",
    events: [
      {
        type: "vnodeBeforeMount",
        describe: "元素挂载前",
      },
      {
        type: "vnodeMounted",
        describe: "元素挂载时",
      },
      {
        type: "vnodeBeforeUpdate",
        describe: "元素更新前",
      },
      {
        type: "vnodeUpdated",
        describe: "元素更新时",
      },
      {
        type: "vnodeBeforeUnmount",
        describe: "元素卸载前",
      },
      {
        type: "vnodeUnmounted",
        describe: "元素卸载时",
      },
      {
        type: "vnodeErrorCaptured",
        describe: "元素错误捕获",
      },
    ],
  },
];
