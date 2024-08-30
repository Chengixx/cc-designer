import { defineComponent } from "vue";
import ElementList from "./components/ElementList.vue";

const ElementMenu = defineComponent({
  setup() {
    return () => {
      return (
        <div class="w-full h-95% overflow-y-auto overflow-x-hidden px-2">
          <ElementList />
        </div>
      );
    };
  },
});
export default ElementMenu;
