import { defineComponent } from "vue";

const ElementBuilder = defineComponent({
  setup() {
    return () => {
      return <>我是用来生成的</>;
    };
  },
});
export default ElementBuilder;
