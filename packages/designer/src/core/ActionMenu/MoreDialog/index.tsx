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
import { CFormItem } from "@cgx-designer/extensions";

const MoreDialog = defineComponent({
  setup(_, { expose }) {
    const Button = elementController.getElementRender("button");
    const Dialog = elementController.getElementRender("dialog");
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
    const dialogShow = ref<boolean>(false);
    const handleOpen = () => {
      dialogShow.value = true;
    };
    const handleClose = () => {
      dialogShow.value = false;
    };
    expose({
      handleOpen,
      handleClose,
    });
    return () => {
      return (
        <>
          <Dialog
            destroyOnClose
            title="设置"
            v-model={dialogShow.value}
            beforeClose={handleClose}
            style={{
              marginTop: "5vh !important",
            }}
          >
            {{
              default: () => {
                return (
                  <div class="c-h-[70vh] c-overflow-y-auto">
                    <CFormItem label="组件库" labelCol={3}>
                      <Select
                        v-model={lib.value}
                        {...vuetifyConfig}
                        options={[
                          { label: "element-plus", value: "element-plus" },
                          { label: "vuetify", value: "vuetify" },
                        ]}
                        placeholder="请选择组件库"
                      />
                    </CFormItem>
                    <CFormItem label="展示样式" labelCol={3}>
                      <Select
                        v-model={elementController.elementListMode.value}
                        {...vuetifyConfig}
                        options={[
                          { label: "盒状", value: "box" },
                          { label: "条状", value: "bar" },
                        ]}
                        placeholder="请选择展示样式"
                      />
                    </CFormItem>
                  </div>
                );
              },
              footer: () => {
                return <Button onClick={handleClose}>关闭</Button>;
              },
            }}
          </Dialog>
        </>
      );
    };
  },
});
export default MoreDialog;
