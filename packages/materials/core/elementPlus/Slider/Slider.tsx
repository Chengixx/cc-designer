import { IEditorElement } from "@cgx-designer/types";
import { ElSlider } from "element-plus";
import { defineComponent, PropType } from "vue";

const Slider = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return <ElSlider {...renderProps}></ElSlider>;
    };
  },
});

export default Slider;
