import {
  elementController,
  ElementLib,
  ElementPlugin,
} from "@cgx-designer/controller";
import { defineComponent, inject, ref, watch } from "vue";
import {
  elementPlusPlugin,
  vuetifyConfig,
  vuetifyPlugin,
} from "@cgx-designer/materials";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";

const TempLibSelect = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    const Select = elementController.getElementRender("select");
    const lib = ref<ElementLib>(
      elementController.getCurrentElementLibraryName()!
    );

    const libMap: Record<ElementLib, ElementPlugin> = {
      "element-plus": elementPlusPlugin,
      vuetify: vuetifyPlugin,
    };

    const handleChange = (value: ElementLib) => {
      focusManage.resetFocus();
      elementManage.deleteAllElements();
      elementController.clearLibElements();
      elementController.install(libMap[value]);
    };

    watch(() => lib.value, handleChange);

    return () => (
      <div class="c-w-96 c-flex c-gap-x-2">
        <Select
          v-model={lib.value}
          elementSchema={{
            props: {
              ...vuetifyConfig,
              options: [
                { label: "element-plus", value: "element-plus" },
                { label: "vuetify", value: "vuetify" },
              ],
              placeholder: "请选择组件库",
            },
            field: undefined,
            formItem: false,
          }}
        />
        <Select
          v-model={elementController.elementListMode.value}
          elementSchema={{
            props: {
              ...vuetifyConfig,
              options: [
                { label: "盒状", value: "box" },
                { label: "条状", value: "bar" },
              ],
              placeholder: "请选择展示样式",
            },
            field: undefined,
            formItem: false,
          }}
        />
      </div>
    );
  },
});

export default TempLibSelect;
