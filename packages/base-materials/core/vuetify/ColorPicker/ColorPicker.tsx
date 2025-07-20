import { VColorPicker } from "vuetify/components";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const ColorPicker = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);
    return () => {
      return <VColorPicker {...renderProps} />;
    };
  },
});

export default ColorPicker;
