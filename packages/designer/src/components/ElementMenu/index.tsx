import { computed, defineComponent, inject, ref } from "vue";
import ElementList from "./ElementList/index.vue";
import SearchBox from "./SearchBox";
import ElementSource from "./ElementSource";
import ElementTree from "./ElementTree";
import DataSourcePane from "./DataSourcePanel";
import {
  AddIcon,
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

interface IMenuItem {
  icon: any;
  tip: string;
  key: string;
  click?: () => void;
  render?: () => JSX.Element;
  headerSlot?: () => JSX.Element;
}

const ElementMenu = defineComponent({
  setup() {
    const collapseManage = inject("collapseManage") as CollapseManage;
    const focusManage = inject("focusManage") as FocusManage;
    const moreDialogRef = ref<typeof MoreDialog>();
    const createRefDialogRef = ref<typeof CreateRefDialog>();
    const topMenuList: IMenuItem[] = [
      {
        icon: ElementIcon,
        tip: "组件库",
        key: "0",
        headerSlot: () => <SearchBox v-model={searchValue.value} />,
        render: () => (
          <div class="c-min-w-[296px]">
            <ElementList searchValue={searchValue.value} />
          </div>
        ),
      },
      {
        icon: TreeIcon,
        tip: "大纲树",
        key: "1",
        render: () => (
          <div class="c-min-w-[296px] c-h-[calc(100vh-98px)] c-w-full">
            <ElementTree />
          </div>
        ),
      },
      {
        icon: SourceDataIcon,
        tip: "数据源",
        key: "2",
        headerSlot: () => (
          <div class="c-w-full c-flex c-gap-x-1 c-items-center c-pr-2">
            <SearchBox v-model={searchValue.value} />
            <div
              onClick={() => {
                createRefDialogRef.value?.handleOpen();
              }}
            >
              <AddIcon class="c-w-4 c-h-4 c-cursor-pointer dark:c-fill-white hover:c-fill-green-400 dark:hover:c-fill-green-400" />
            </div>
          </div>
        ),
        render: () => (
          <div class="c-min-w-[296px] c-h-[calc(100vh-98px)] c-w-full dark:c-border-darkMode">
            <DataSourcePane
              searchValue={searchValue.value}
              onEditSourceData={({ dataItem, dataIndex }) => {
                createRefDialogRef.value?.handleOpen(dataItem, dataIndex);
              }}
            />
          </div>
        ),
      },
      {
        icon: SourceCodeIcon,
        tip: "源码",
        key: "3",
        render: () => (
          <div class="c-min-w-[296px] c-h-[calc(100vh-98px)] c-w-full dark:c-border-darkMode">
            <ElementSource />
          </div>
        ),
      },
    ];

    const bottomSettingList: IMenuItem[] = [
      {
        icon: MoreIcon,
        tip: "更多",
        key: "3",
        click: () => {
          moreDialogRef.value?.handleOpen();
        },
      },
    ];
    const searchValue = ref<string>("");
    const settingTab = ref<string>("0");
    const currentActiveRenderData = computed(() => {
      return topMenuList.find((item) => item.key === settingTab.value);
    });

    const RenderMenuItem = (Icon: IMenuItem) => {
      const clickEvent = () => {
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
      };
      return (
        <div class="c-w-full c-h-[48px] c-flex c-justify-center c-items-center">
          <CTooltip tooltip={Icon.tip} placement="right">
            <div onClick={clickEvent}>
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
    };

    return () => {
      return (
        <div class="c-border-r c-border-gray-200 c-flex dark:c-border-darkMode dark:c-bg-darkMode">
          {/* 最左侧的小长条 */}
          <div class="c-min-w-[48px] c-w-[48px] c-h-[calc(100vh-48px)] c-border-t c-border-r c-border-gray-200 dark:c-border-darkMode c-flex c-flex-col c-justify-between">
            {/* 左侧上面菜单 */}
            <div class="c-w-full c-pt-3">
              {topMenuList.map((Icon) => RenderMenuItem(Icon))}
            </div>
            {/* 左侧下面菜单 */}
            <div class="c-w-full c-pb-3">
              {bottomSettingList.map((Icon) => RenderMenuItem(Icon))}
            </div>
          </div>
          {/* 左侧渲染内容 */}
          <div class="c-h-[calc(100vh-48px)] c-relative c-overflow-y-auto c-overflow-x-hidden c-w-[300px] c-border-t c-border-gray-200 dark:c-border-darkMode">
            {/* 顶部区间 */}
            <div class="c-sticky c-bg-white dark:c-bg-darkMode c-top-0 c-z-10 c-border-b c-border-gray-200 dark:c-border-darkMode">
              {/* 标题tip */}
              <div class="c-h-[38px] c-px-3 c-flex c-justify-between c-items-center c-font-bold c-min-w-[300px]">
                {currentActiveRenderData.value?.tip}
                {/* 右边的小按钮 */}
                <div
                  onClick={() => {
                    focusManage.startFocusTimedQuery();
                    collapseManage.toggleLeftMenu();
                    setTimeout(() => {
                      focusManage.stopFocusTimedQuery();
                    }, 350);
                  }}
                >
                  <CloseIcon class="c-w-4 h-4 c-cursor-pointer dark:c-fill-white" />
                </div>
              </div>

              {/* 如果有的话 来一个headerSlot */}
              {currentActiveRenderData.value?.headerSlot?.()}
            </div>
            {/* 下面真正的内容 */}
            <div class="c-mt-[-1px]">
              {currentActiveRenderData.value?.render?.()}
            </div>
          </div>

          <MoreDialog ref={moreDialogRef} />
          <CreateRefDialog ref={createRefDialogRef} />
        </div>
      );
    };
  },
});
export default ElementMenu;
