import { deepCompareAndModify } from "@cgx-designer/utils";
import { isEmpty } from "lodash-es";
import { reactive, watchEffect } from "vue";

export const useMergeAttr = (
  props: Record<string, any>,
  attrs: Record<string, any>
) => {
  const getRenderProps = () => {
    return {
      ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
      ...attrs,
      ...props,
      rules: !isEmpty(props.elementSchema?.rules)
        ? props.elementSchema?.rules
        : undefined,
    };
  };

  const renderProps = reactive(getRenderProps());

  watchEffect(() => {
    const newRenderProps = getRenderProps();
    deepCompareAndModify(renderProps, newRenderProps);
  });

  return renderProps;
};
