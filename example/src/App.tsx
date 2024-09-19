import { defineComponent, provide } from "vue";
import { Container } from "cgx-designer";

const App = defineComponent({
  setup() {
    return () => {
      return (
        <div class="app w-screen h-screen bg-gray-100 overflow-x-hidden">
          <Container />
        </div>
      );
    };
  },
});
export default App;
