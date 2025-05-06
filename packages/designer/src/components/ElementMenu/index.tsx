import { defineComponent, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";
import ElementSource from "./components/ElementSource";
import ElementTree from "./components/ElementTree";
import { ElementIcon, SourceCodeIcon, TreeIcon } from "@cgx-designer/icons";

const ElementMenu = defineComponent({
  setup() {
    const menuList = [ElementIcon, SourceCodeIcon, TreeIcon];
    const searchValue = ref<string>("");
    const settingTab = ref<string>("0");

    return () => {
      return (
        <div class="c-overflow-x-hidden c-border-r c-border-gray-200 c-flex dark:c-border-darkMode dark:c-bg-darkMode">
          <div class="c-w-[48px] c-h-[calc(100vh-48px)] c-border-t c-border-r c-overflow-y-auto c-overflow-x-hidden c-border-gray-200 dark:c-border-darkMode">
            <div class="c-w-full c-pt-3">
              {menuList.map((Icon, index) => (
                <div
                  onClick={() => (settingTab.value = String(index))}
                  class="c-w-full c-h-[48px] c-flex c-justify-center c-items-center"
                >
                  <Icon
                    class={[
                      "c-w-5 c-h-5 c-cursor-pointer",
                      settingTab.value === String(index)
                        ? "c-fill-blue-500 dark:c-fill-blue-300"
                        : "c-fill-gray-600 dark:c-fill-gray-400",
                    ]}
                  />
                </div>
              ))}
            </div>
          </div>
          <div class="c-h-[calc(100vh-48px)] c-overflow-y-auto c-overflow-x-hidden c-w-[300px] c-border-gray-200 dark:c-border-darkMode">
            {settingTab.value === "0" && (
              <>
                <SearchBox v-model:widgetName={searchValue.value} />
                <ElementList searchValue={searchValue.value} />
              </>
            )}

            {settingTab.value === "1" && (
              <>
                <div class="c-h-[calc(100vh-128px)] c-w-full dark:c-border-darkMode">
                  <ElementSource />
                </div>
              </>
            )}

            {settingTab.value === "2" && (
              <>
                <div class="c-h-[calc(100vh-128px)] c-w-full c-border-t dark:c-border-darkMode">
                  <ElementTree />
                </div>
              </>
            )}
          </div>
        </div>
      );
    };
  },
});
export default ElementMenu;
