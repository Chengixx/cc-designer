import { IEditorElement } from "@cgx-designer/types";
import { defineComponent, PropType, ref } from "vue";
import { VTextField } from "vuetify/components";
import { isEmpty } from "lodash-es";
import { exposeDom, transformValidatorArray } from "@cgx-designer/utils";

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
    return () => {
      const renderProps: Record<string, any> = {
        ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
        ...attrs,
      };
      let rulesList: any[] = [];
      if (props.elementSchema && props.elementSchema.rules) {
        rulesList = transformValidatorArray(props.elementSchema.rules);
      }
      //Todo 这里不知道为什么给ref有ts报错啊
      return (
        <VTextField {...renderProps} ref={elementRef as any} rules={rulesList}>
          {{
            "prepend-inner": () => {
              return slots.prefix && slots.prefix();
            },
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
