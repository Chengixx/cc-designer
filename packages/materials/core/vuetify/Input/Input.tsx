import { useExpose } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/core";
import { defineComponent, PropType, ref } from "vue";
import { VTextField } from "vuetify/components";

const Input = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { attrs, expose }) {
    const elementRef = ref<any>(null);
    expose(useExpose(elementRef));
    return () => {
      const renderProps: Record<string, any> = {
        ...props.elementSchema.props,
        ...attrs,
      };
      //Todo 这里不知道为什么给ref有ts报错啊
      return <VTextField {...renderProps} ref={elementRef as any} />;
    };
  },
});

export default Input;
