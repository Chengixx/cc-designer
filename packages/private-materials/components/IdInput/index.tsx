import { defineComponent, PropType } from "vue";
import { IElementSchema } from "@cgx-designer/types";
import { elementController } from "@cgx-designer/controller";

const IdInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IElementSchema>, required: true },
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
