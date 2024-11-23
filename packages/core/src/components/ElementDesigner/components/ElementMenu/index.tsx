import { defineComponent, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";

const ElementMenu = defineComponent({
  setup() {
    const searchValue = ref<string>("");

    return () => {
      return (
        <div class="overflow-x-hidden border-r border-gray-200">
          <div class="w-full h-10 flex justify-center items-center border min-w-[260px]">
            <span>组件菜单</span>
          </div>
          <div class="w-full h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden min-w-[260px]">
            <SearchBox v-model:widgetName={searchValue.value} />
            <ElementList searchValue={searchValue.value} />
          </div>
        </div>
      );
    };
  },
});
export default ElementMenu;
