import { defineComponent, PropType } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { elementController } from "../../../../controller/core/elementController";

const IdInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  emits: ["update:modelValue"],
  inheritAttrs: true,
  setup(props, { attrs }) {
    const Input = elementController.getElementRender("input");
    return () => {
      const renderProps = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <Input {...renderProps} />;
    };
  },
});

export default IdInput;
