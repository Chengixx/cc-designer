import { EventPrototype } from "../../../../../../types";

export const defaultEvents: EventPrototype[] = [
  {
    title: "生命周期",
    events: [
      {
        type: "vnodeBeforeMount",
        describe: "beforeMount",
      },
      {
        type: "vnodeMounted",
        describe: "mounted",
      },
      {
        type: "vnodeBeforeUpdate",
        describe: "beforeUpdate",
      },
      {
        type: "vnodeUpdated",
        describe: "updated",
      },
      {
        type: "vnodeBeforeUnmount",
        describe: "beforeUnmount",
      },
      {
        type: "vnodeUnmounted",
        describe: "unmounted",
      },
      {
        type: "vnodeErrorCaptured",
        describe: "errorCaptured",
      },
    ],
  },
];
