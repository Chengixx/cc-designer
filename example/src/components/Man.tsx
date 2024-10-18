import { defineComponent } from "vue";

const Man = defineComponent({
  setup() {
    return () => (
      <div>
        <div>我是一个自定义组件哦</div>
      </div>
    );
  },
});

export default Man;
