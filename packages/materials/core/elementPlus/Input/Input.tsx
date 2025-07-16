import { ElInput } from "element-plus";
import { defineComponent, ref } from "vue";
import { exposeDom } from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";
import { createElementProps } from "@cgx-designer/utils";

const Input = defineComponent({
  props: createElementProps(),
  setup(props, { attrs, expose, slots }) {
    const elementRef = ref<any>(null);
    expose(exposeDom(elementRef));
    const renderProps = useMergeAttr(props, attrs);

    return () => {
      return (
        <ElInput {...renderProps} ref={elementRef}>
          {{
            ...slots,
          }}
        </ElInput>
      );
    };
  },
});

export default Input;
