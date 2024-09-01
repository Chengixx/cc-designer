import { defineComponent, provide } from "vue";
import { Editor } from "cgx-designer"

const App = defineComponent({
  setup() {
    return () => {
      return (
        <div class="app w-screen h-screen bg-gray-100 overflow-x-hidden">
          <Editor />
        </div>
      );
    };
  },
});
export default App;
