import { defineComponent } from "vue";
import { VTextField } from "vuetify/components";
import {
  transformValidatorArray,
  createElementProps,
} from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const Input = defineComponent({
  props: createElementProps(),
  setup(props, { attrs, slots }) {
    const renderProps = useMergeAttr(props, attrs);
    const rulesList =
      renderProps.rules && transformValidatorArray(renderProps.rules);
    return () => (
      <VTextField {...renderProps} rules={rulesList}>
        {{
          "prepend-inner": () => slots.prefix && slots.prefix(),
          "append-inner": () => slots.append && slots.append(),
        }}
      </VTextField>
    );
  },
});

export default Input;
