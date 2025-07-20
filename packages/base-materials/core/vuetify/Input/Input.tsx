import { defineComponent, PropType, ref } from "vue";
import { VTextField } from "vuetify/components";
import {
  exposeDom,
  transformValidatorArray,
  createElementProps,
} from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const Input = defineComponent({
  props: createElementProps(),
  setup(props, { attrs, expose, slots }) {
    const elementRef = ref<any>(null);
    expose(exposeDom(elementRef));
    const renderProps = useMergeAttr(props, attrs);
    return () => {
      const rulesList =
        renderProps.rules && transformValidatorArray(renderProps.rules);
      //Todo 这里不知道为什么给ref有ts报错啊
      return (
        <VTextField {...renderProps} ref={elementRef as any} rules={rulesList}>
          {{
            "prepend-inner": () => slots.prefix && slots.prefix(),
            "append-inner": () => slots.append && slots.append(),
          }}
        </VTextField>
      );
    };
  },
});

export default Input;
