import { defineComponent, ref } from "vue";
import ElementList from "./components/ElementList.vue";
import SearchBox from "./components/SearchBox";

const ElementMenu = defineComponent({
  setup() {
    const searchValue = ref<string>("");

    return () => {
      return (
        <div class="w-full h-[calc(100vh-40px)] overflow-y-auto overflow-x-hidden min-w-[260px]">
          <SearchBox v-model:widgetName={searchValue.value} />
          <ElementList searchValue={searchValue.value} />
        </div>
      );
    };
  },
});
export default ElementMenu;
