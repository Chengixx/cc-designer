import { computed, defineComponent, inject, ref } from "vue";
import ElementList from "./ElementList/index.vue";
import SearchBox from "./SearchBox";
import ElementSource from "./ElementSource";
import ElementTree from "./ElementTree";
import DataSourcePane from "./DataSourcePanel";
import {
  CloseIcon,
  ElementIcon,
  MoreIcon,
  SourceCodeIcon,
  SourceDataIcon,
  TreeIcon,
} from "@cgx-designer/icons";
import { CTooltip } from "@cgx-designer/extensions";
import { CollapseManage, FocusManage } from "@cgx-designer/hooks";
import { JSX } from "vue/jsx-runtime";
import MoreDialog from "./MoreDialog";
import { CreateRefDialog } from "./CreateRefDialog";
import { elementController } from "@cgx-designer/controller";
import { computedButtonColor } from "@cgx-designer/utils";

interface IMenuItem {
  icon: any;
  tip: string;
  key: string;
  type?: "top" | "bottom";
  width?: number | string;
  click?: () => void;
  isFullScreen?: boolean;
  render?: () => JSX.Element;
  headerSlot?: () => JSX.Element;
}

const ActionMenu = defineComponent({
  setup() {
    const Button = elementController.getElementRender("button");
    const collapseManage = inject("collapseManage") as CollapseManage;
    const focusManage = inject("focusManage") as FocusManage;
    const moreDialogRef = ref<typeof MoreDialog>();
    const createRefDialogRef = ref<typeof CreateRefDialog>();
    const searchValue = ref<string>("");
    const settingTab = ref<string | undefined>("0");
    const menuList: IMenuItem[] = [
      {
        icon: ElementIcon,
        tip: "组件库",
        key: "0",
        type: "top",
        width: "300px",
        headerSlot: () => (
          <SearchBox v-model={searchValue.value} placeholder="搜索组件" />
        ),
        render: () => <ElementList searchValue={searchValue.value} />,
      },
      {
        icon: TreeIcon,
        tip: "大纲树",
        width: "300px",
        key: "1",
        type: "top",
        render: () => <ElementTree />,
      },
      {
        icon: SourceDataIcon,
        tip: "数据源",
        key: "2",
        type: "top",
        width: "300px",
        headerSlot: () => (
          <div class="c-w-full c-flex c-gap-x-1 c-items-center c-pr-2">
            <SearchBox v-model={searchValue.value} placeholder="搜索数据源" />
            <Button
              link
              variant="text"
              color={computedButtonColor("success")}
              type="success"
              onClick={createRefDialogRef.value?.handleOpen}
            >
              新增
            </Button>
          </div>
        ),
        render: () => (
          <DataSourcePane
            searchValue={searchValue.value}
            onEditSourceData={({ dataItem, dataIndex }) => {
              createRefDialogRef.value?.handleOpen(dataItem, dataIndex);
            }}
          />
        ),
      },
      {
        icon: SourceCodeIcon,
        tip: "源码",
        key: "3",
        type: "top",
        isFullScreen: true,
        render: () => <ElementSource />,
      },
      {
        icon: MoreIcon,
        tip: "更多",
        key: "4",
        type: "bottom",
        click: () => {
          moreDialogRef.value?.handleOpen();
        },
      },
    ];

    const currentActiveRenderData = computed(() =>
      menuList.find((item) => item.key === settingTab.value)
    );

    const RenderMenuItem = (Icon: IMenuItem) => (
      <div class="c-w-full c-h-[48px] c-flex c-justify-center c-items-center">
        <CTooltip tooltip={Icon.tip} placement="right">
          <div
            onClick={() => {
              if (Icon.click) {
                Icon.click();
              } else {
                if (collapseManage.leftMenuCollapseState.value === false) {
                  collapseManage.toggleLeftMenu();
                }
                if (settingTab.value !== Icon.key) {
                  searchValue.value = "";
                }
                settingTab.value = Icon.key;
              }
            }}
          >
            <Icon.icon
              class={[
                "c-w-5 c-h-5 c-cursor-pointer",
                settingTab.value === Icon.key
                  ? "c-fill-blue-500 dark:c-fill-blue-300"
                  : "c-fill-gray-600 dark:c-fill-gray-400",
              ]}
            />
          </div>
        </CTooltip>
      </div>
    );

    const RenderPanelTitle = () => {
      return (
        <div
          class={[
            "c-bg-white dark:c-bg-darkMode c-border-b c-border-gray-200 dark:c-border-darkMode",
            currentActiveRenderData.value?.isFullScreen && "c-w-full",
          ]}
        >
          {/* 标题tip */}
          <div
            class="c-h-[38px] c-px-3 c-flex c-justify-between c-items-center c-font-bold c-w-full"
            style={{
              minWidth: currentActiveRenderData.value?.width || undefined,
            }}
          >
            {currentActiveRenderData.value?.tip}
            {/* 右边的小按钮 */}
            <div
              onClick={() => {
                if (!currentActiveRenderData.value?.isFullScreen) {
                  focusManage.startFocusTimedQuery();
                  collapseManage.toggleLeftMenu();
                  setTimeout(() => {
                    focusManage.stopFocusTimedQuery();
                    settingTab.value = undefined;
                  }, 350);
                } else {
                  collapseManage.toggleLeftMenu();
                  settingTab.value = undefined;
                }
              }}
            >
              <CloseIcon class="c-w-4 h-4 c-cursor-pointer dark:c-fill-white" />
            </div>
          </div>

          {/* 如果有的话 来一个headerSlot */}
          {currentActiveRenderData.value?.headerSlot?.()}
        </div>
      );
    };

    return () => (
      <div class="c-bg-white c-flex dark:c-bg-darkMode c-relative">
        {/* 最左侧的小长条 */}
        <div class="c-w-[48px] c-h-[calc(100vh-48px)] c-border-t c-border-r c-border-gray-200 dark:c-border-darkMode c-flex c-flex-col c-justify-between">
          {/* 左侧上面菜单 */}
          <div class="c-w-full c-pt-3">
            {menuList
              .filter((item) => item.type === "top")
              .map((Icon) => RenderMenuItem(Icon))}
          </div>
          {/* 左侧下面菜单 */}
          <div class="c-w-full c-pb-3">
            {menuList
              .filter((item) => item.type === "bottom")
              .map((Icon) => RenderMenuItem(Icon))}
          </div>
        </div>
        {/* 左侧渲染内容 */}
        <div
          class={[
            "c-overflow-hidden c-transition-all c-duration-300 c-h-[calc(100vh-48px)] c-flex c-flex-col c-relative c-border-t c-border-gray-200 dark:c-border-darkMode",
            collapseManage.leftMenuCollapseState.value && "c-border-r",
          ]}
          style={{
            width: collapseManage.leftMenuCollapseState.value
              ? currentActiveRenderData.value?.width || undefined
              : "0",
          }}
        >
          {/* 顶部区间 */}
          {RenderPanelTitle()}
          {/* 下面真正的内容 */}
          <div
            class="c-overflow-y-auto c-flex-1"
            style={{
              minWidth: currentActiveRenderData.value?.width || undefined,
            }}
          >
            {currentActiveRenderData.value?.render?.()}
          </div>
        </div>

        {currentActiveRenderData.value?.isFullScreen && (
          <div class="c-overflow-hidden c-absolute c-left-[48px] c-z-50 c-w-[calc(100vw-48px)] c-h-[calc(100vh-48px)] c-flex c-flex-col c-justify-center c-items-center c-border-t c-border-gray-200 dark:c-border-darkMode">
            {/* 顶部区间 */}
            {RenderPanelTitle()}
            {currentActiveRenderData.value?.render?.()}
          </div>
        )}

        <MoreDialog ref={moreDialogRef} />
        <CreateRefDialog ref={createRefDialogRef} />
      </div>
    );
  },
});
export default ActionMenu;
