import { defineComponent, provide } from "vue";
import { elementConfig } from "./config/elementCreator";
import Editor from "./pages/Editor";

const App = defineComponent({
  setup() {
    provide("elementConfig", elementConfig);
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
