import { deepCompareAndModify } from "@cgx-designer/utils";
import { isEmpty } from "lodash-es";
import { computed, reactive, watch, watchEffect } from "vue";

export const useMergeAttr = (
  props: Record<string, any>,
  attrs: Record<string, any>
) => {
  const getRenderProps = () => {
    return {
      ...(!isEmpty(props.elementSchema) && props.elementSchema.props),
      ...attrs,
    };
  };

  const renderProps = reactive(getRenderProps());

  watchEffect(() => {
    const newRenderProps = getRenderProps();
    deepCompareAndModify(renderProps, newRenderProps);
  });

  return renderProps;
};
