import { isEmpty } from "lodash-es";
import { computed } from "vue";

export const useMergeAttr = (
  props: Record<string, any>,
  attrs: Record<string, any>
) => {
  const renderProps: Record<string, any> = computed(() => {
    return {
      ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
      ...attrs,
    };
  });
  return renderProps;
};
