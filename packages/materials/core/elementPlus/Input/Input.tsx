import { IEditorElement } from "@cgx-designer/types";
import { ElInput } from "element-plus";
import { defineComponent, PropType, ref } from "vue";
import { isEmpty } from "lodash-es";
import { exposeDom } from "@cgx-designer/utils";
import { useMergeAttr } from "@cgx-designer/hooks";

const Input = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
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
