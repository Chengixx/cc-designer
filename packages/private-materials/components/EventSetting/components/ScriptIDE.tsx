import { FunctionManage } from "@cgx-designer/hooks";
import { MonacoIDE } from "@cgx-designer/extensions";
import { defineComponent, inject } from "vue";

// !注意这个IDE是用来修改script用的
const ScriptIDE = defineComponent({
  setup() {
    const functionManager = inject("functionManager") as FunctionManage;

    return () => <MonacoIDE v-model={functionManager.javaScriptVal.value} />;
  },
});

export default ScriptIDE;
