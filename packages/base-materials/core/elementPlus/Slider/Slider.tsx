import { useMergeAttr } from "@cgx-designer/hooks";
import { ElSlider } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const Slider = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);

    return () => <ElSlider {...renderProps}></ElSlider>;
  },
});

export default Slider;
