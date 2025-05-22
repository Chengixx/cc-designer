import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { ElSlider } from "element-plus";
import { defineComponent, PropType } from "vue";

const Slider = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return <ElSlider {...renderProps}></ElSlider>;
    };
  },
});

export default Slider;
