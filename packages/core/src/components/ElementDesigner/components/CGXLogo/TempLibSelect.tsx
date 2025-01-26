import {
  elementController,
  ElementLib,
  ElementPlugin,
} from "@cgx-designer/controller";
import { ElOption, ElSelect } from "element-plus";
import { defineComponent, inject, ref, watch } from "vue";
import {
  elementPlusPlugin,
  vuetifyConfig,
  vuetifyPlugin,
} from "@cgx-designer/materials";
import { ElementManage } from "@cgx-designer/hooks";

const TempLibSelect = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const Select = elementController.getElementRender("select");
    const lib = ref<ElementLib>(
      elementController.getCurrentElementLibraryName()!
    );

    const libMap: Record<ElementLib, ElementPlugin> = {
      "element-plus": elementPlusPlugin,
      vuetify: vuetifyPlugin,
    };

    const handleChange = (value: ElementLib) => {
      elementManage.deleteAllElements();
      elementController.clearLibElements();
      elementController.install(libMap[value]);
    };

    watch(() => lib.value, handleChange, { immediate: true });

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
