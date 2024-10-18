import { defineComponent } from "vue";
import { ElementDesigner } from "cgx-designer";

const App = defineComponent({
  setup() {

    return () => {
      return (
        <div class="app w-screen h-screen bg-gray-100 overflow-x-hidden">
          <ElementDesigner />
        </div>
      );
    };
  },
});
export default App;
