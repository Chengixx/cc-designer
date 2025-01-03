import { defineComponent, PropType, ref, watch } from "vue";
import { IEditorElement } from "../../../../cgx-designer/dist/core";
import { ElInput, ElMessage } from "element-plus";
import "../../style/index.css";
import { copyToClipboard } from "@cgx-designer/utils";

const IdInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  emits: ["update:modelValue"],
  inheritAttrs: true,
  setup(props, { attrs }) {
    const handleCopy = () => {
      const inputValue = attrs.modelValue;
      if (inputValue !== undefined && inputValue !== null) {
        copyToClipboard(
          inputValue as string,
          () => ElMessage.success("复制成功"),
          () => ElMessage.warning("复制失败")
        );
      }
    };

    return () => {
      const renderProps = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return (
        <ElInput {...renderProps} class="no-padding-elInput">
          {{
            append: () => (
              <div class="c-cursor-pointer" onClick={handleCopy}>
                复制
              </div>
            ),
          }}
        </ElInput>
      );
    };
  },
});

export default IdInput;
