import {
  elementController,
  ElementLib,
  ElementPlugin,
} from "@cgx-designer/controller";
import { ElOption, ElSelect } from "element-plus";
import { defineComponent, inject, ref } from "vue";
import { elementPlusPlugin, vuetifyPlugin } from "@cgx-designer/materials";
import { ElementManage } from "@cgx-designer/hooks";

const TempLibSelect = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const lib = ref<ElementLib>(elementController.getCurrentElementLibraryName()!);

    const libMap: Record<ElementLib, ElementPlugin> = {
      "element-plus": elementPlusPlugin,
      vuetify: vuetifyPlugin,
    };

    const handleChange = (value: ElementLib) => {
      elementManage.deleteAllElements();
      elementController.clearLibElements();
      elementController.install(libMap[value]);
    };

    return () => (
      <div class="c-w-40">
        <ElSelect
          placeholder="请选择组件库"
          v-model={lib.value}
          onChange={handleChange}
        >
          <ElOption label="element-plus" value="element-plus" />
          <ElOption label="vuetify" value="vuetify" />
        </ElSelect>
      </div>
    );
  },
});

export default TempLibSelect;
