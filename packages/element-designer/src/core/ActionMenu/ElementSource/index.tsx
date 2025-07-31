import { ElementManage } from "@cgx-designer/hooks";
import { formatJson, MonacoIDE } from "@cgx-designer/extensions";
import { defineComponent, inject, ref, toRaw, watch } from "vue";
import { deepClone, deepCompareAndModify } from "@cgx-designer/utils";
import { isEqual } from "lodash-es";
import { IElementSchema } from "@cgx-designer/types";

// !注意这个IDE是用来修改script用的
const ElementSource = defineComponent({
  setup() {
    const elementManager = inject("elementManager") as ElementManage;
    const sourceCodeIDERef = ref<any>(null);
    const modelValue = formatJson(elementManager.elementList.value);

    let tempSchema: IElementSchema | null = null;

    const handleUpdateSchema = (v: string) => {
      if (!v) return;
      try {
        tempSchema = JSON.parse(v);
        deepCompareAndModify(elementManager.elementList.value, tempSchema!);
      } catch (e) {}
    };

    watch(
      () => elementManager.elementList.value,
      (newSchema) => {
        if (!isEqual(tempSchema, toRaw(deepClone(newSchema)))) {
          sourceCodeIDERef.value!.setValue(formatJson(newSchema));
        }
      },
      {
        deep: true,
      }
    );

    return () => (
      <MonacoIDE
        modelValue={modelValue}
        ref={sourceCodeIDERef as any}
        onUpdate:modelValue={(v) => handleUpdateSchema(v)}
        mode="json"
      />
    );
  },
});

export default ElementSource;
