import { ElementManage } from "@cgx-designer/hooks";
import { IDE } from "@cgx-designer/extensions";
import { defineComponent, inject, ref, toRaw, watch } from "vue";
import { deepClone, deepCompareAndModify } from "@cgx-designer/utils";
import { isEqual } from "lodash-es";
import { IEditorElement } from "@cgx-designer/types";

// !注意这个IDE是用来修改script用的
const ElementSource = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const sourceCodeIDERef = ref<any>(null);
    const modelValue = JSON.stringify(elementManage.elementList.value);

    let tempSchema: IEditorElement | null = null;

    const handleUpdateSchema = (v: string) => {
      if (!v) return;
      try {
        tempSchema = JSON.parse(v);
        deepCompareAndModify(elementManage.elementList.value, tempSchema!);
      } catch (e) {}
    };

    watch(
      () => elementManage.elementList.value,
      (newSchema) => {
        if (!isEqual(tempSchema, toRaw(deepClone(newSchema)))) {
          sourceCodeIDERef.value!.setEditorValue(JSON.stringify(newSchema));
        }
      },
      {
        deep: true,
      }
    );

    return () => (
      <IDE
        modelValue={modelValue}
        ref={sourceCodeIDERef as any}
        onUpdate:modelValue={(v) => handleUpdateSchema(v)}
      />
    );
  },
});

export default ElementSource;
