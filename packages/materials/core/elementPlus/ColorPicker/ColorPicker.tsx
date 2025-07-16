import { useMergeAttr } from "@cgx-designer/hooks";
import { ElColorPicker } from "element-plus";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";

const ColorPicker = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    return () => {
      const renderProps = useMergeAttr(props, attrs);

      return <ElColorPicker {...renderProps} />;
    };
  },
});

export default ColorPicker;
