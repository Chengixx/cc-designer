import { computed, defineComponent, inject, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";
import ElementSource from "./components/ElementSource";
import ElementTree from "./components/ElementTree";
import {
  ElementIcon,
  MoreIcon,
  SourceCodeIcon,
  TreeIcon,
} from "@cgx-designer/icons";
import { CTooltip } from "@cgx-designer/extensions";
import { CollapseManage } from "@cgx-designer/hooks";
import { JSX } from "vue/jsx-runtime";
import MoreDialog from "./components/MoreDialog";

interface IMenuItem {
  icon: any;
  tip: string;
  key: string;
  click?: () => void;
  render?: () => JSX.Element;
}

const ElementMenu = defineComponent({
  setup() {
    const collapseManage = inject("collapseManage") as CollapseManage;
    const moreDialogRef = ref<typeof MoreDialog>();
    const topMenuList: IMenuItem[] = [
      {
        icon: ElementIcon,
        tip: "组件库",
        key: "0",
        render: () => (
          <div class="c-min-w-[296px]">
            <SearchBox v-model:widgetName={searchValue.value} />
            <ElementList searchValue={searchValue.value} />
          </div>
        ),
      },
      {
        icon: TreeIcon,
        tip: "大纲树",
        key: "1",
        render: () => (
          <div class="c-min-w-[296px] c-h-[calc(100vh-98px)] c-w-full c-border-t dark:c-border-darkMode">
            <ElementTree />
          </div>
        ),
      },
      {
        icon: SourceCodeIcon,
        tip: "源码",
        key: "2",
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
          console.log("更多");
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
          <div class="c-h-[calc(100vh-48px)] c-overflow-y-auto c-overflow-x-hidden c-w-[300px] c-border-t c-border-gray-200 dark:c-border-darkMode">
            <div class="c-h-12 c-px-3 c-flex c-justify-start c-items-center c-font-bold c-min-w-[300px]">
              {currentActiveRenderData.value?.tip}
            </div>
            {currentActiveRenderData.value?.render?.()}
          </div>

          <MoreDialog ref={moreDialogRef} />
        </div>
      );
    };
  },
});
export default ElementMenu;
