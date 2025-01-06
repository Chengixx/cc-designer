import { useExpose } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/core";
import { defineComponent, PropType, ref } from "vue";
import { VTextField } from "vuetify/components";
import { isEmpty } from "lodash";

const Input = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
      default: () => {},
    },
  },
  setup(props, { attrs, expose, slots }) {
    const elementRef = ref<any>(null);
    expose(useExpose(elementRef));
    return () => {
      const renderProps: Record<string, any> = {
        ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
        ...attrs,
      };
      //Todo 这里不知道为什么给ref有ts报错啊
      return (
        <VTextField {...renderProps} ref={elementRef as any}>
          {{
            "append-inner": () => {
              return slots.append && slots.append();
            },
          }}
        </VTextField>
      );
    };
  },
});

export default Input;
