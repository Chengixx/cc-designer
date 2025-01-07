import { defineComponent, PropType } from "vue";
import { IEditorElement } from "../../../../cgx-designer/dist/core";
import "../../style/index.css";
import { copyToClipboard } from "@cgx-designer/utils";
import { elementController } from "../../../../controller/core/elementController";
import { CopyIcon } from "@cgx-designer/icons";
import { Message } from "@cgx-designer/extensions";

const IdInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  emits: ["update:modelValue"],
  inheritAttrs: true,
  setup(props, { attrs }) {
    const Input = elementController.getElementRender("input");
    const handleCopy = () => {
      const inputValue = attrs.modelValue;
      if (inputValue !== undefined && inputValue !== null) {
        copyToClipboard(
          inputValue as string,
          () => Message.success("复制成功"),
          () => Message.warning("复制失败")
        );
      }
    };

    return () => {
      const renderProps = {
        ...props.elementSchema.props,
        ...attrs,
      };
      return (
        <Input {...renderProps} class="no-padding-elInput">
          {{
            append: () => (
              <div class="c-cursor-pointer" onClick={handleCopy} title="复制">
                <CopyIcon class="c-h-[18px] c-w-[18px] hover:c-fill-blue-500 dark:c-fill-white dark:hover:c-fill-blue-500"></CopyIcon>
              </div>
            ),
          }}
        </Input>
      );
    };
  },
});

export default IdInput;
