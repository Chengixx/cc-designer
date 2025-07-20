import { FunctionManage } from "@cgx-designer/hooks";
import { IDE } from "@cgx-designer/extensions";
import { defineComponent, inject } from "vue";

// !注意这个IDE是用来修改script用的
const ScriptIDE = defineComponent({
  setup() {
    const functionManage = inject("functionManage") as FunctionManage;

    return () => <IDE v-model={functionManage.javaScriptVal.value} />;
  },
});

export default ScriptIDE;
