import { useMergeAttr } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/types";
import { ElColorPicker } from "element-plus";
import { defineComponent, PropType } from "vue";

const ColorPicker = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs }) {
    return () => {
      const renderProps = useMergeAttr(props, attrs);

      return <ElColorPicker {...renderProps} />;
    };
  },
});

export default ColorPicker;
