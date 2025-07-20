import { VSwitch } from "vuetify/components";
import { defineComponent } from "vue";
import { createElementProps } from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const Switch = defineComponent({
  props: createElementProps(),
  setup(props, { attrs }) {
    const renderProps = useMergeAttr(props, attrs);
    return () => <VSwitch {...renderProps} />;
  },
});

export default Switch;
