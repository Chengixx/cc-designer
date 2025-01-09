import { computed, defineComponent, PropType, ref, watch } from "vue";
import { IEditorElement } from "../../types";
import { ElOption, ElSelect } from "element-plus";
import { OptionGroup } from "element-plus/es/components/select-v2/src/select.types.mjs";
import { elementController } from "@cgx-designer/controller";
import { VList, VListItem, VListItemTitle, VMenu } from "vuetify/components";

const StyleInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  emits: ["update:modelValue"],
  // 加入这个即可防止直接v-model透传
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    const Input = elementController.getElementRender("input");
    const isVuetify = computed(() => {
      return elementController.getCurrentElementLibrary() === "vuetify";
    });
    const options: OptionGroup[] = [
      { label: "px", value: "px" },
      { label: "em", value: "em" },
      { label: "rem", value: "rem" },
      { label: "vw", value: "vw" },
      { label: "vh", value: "vh" },
      { label: "%", value: "%" },
    ];
    const bindValue = ref<string | null>(null);
    const stylePrefix = ref<(typeof options)[number]["value"]>("px");
    watch(
      () => attrs.modelValue as string | undefined,
      (nv) => {
        if (!nv) return;
        const regex = new RegExp(
          `^(\\d+(\\.\\d+)?)(${options.map((i) => i.value).join("|")}){1}$`
        );
        const match = (nv as string).trim().match(regex);
        bindValue.value = match?.[1] ?? null;
        stylePrefix.value = match?.[3] ?? "";
      },
      { immediate: true }
    );
    watch(
      () => bindValue.value,
      () => {
        emit(
          "update:modelValue",
          bindValue.value ? bindValue.value + stylePrefix.value : undefined
        );
      }
    );
    return () => {
      const renderProps = {
        ...props.elementSchema.props,
        // !0不是想写在这 是写在下面会报错 ts不知道为什么说elInput不支持 实际上是支持的
        min: "0",
        hideDetails: true,
        variant: "outlined",
        inset: true,
        color: "primary",
        density: "compact",
      };
      return (
        <Input v-model={bindValue.value} type="number" {...renderProps}>
          {{
            append: () => {
              return (
                <>
                  {isVuetify.value ? (
                    <span class="c-cursor-pointer">
                      {stylePrefix.value}
                      <VMenu activator="parent">
                        <VList>
                          {options.map((option) => {
                            return (
                              <VListItem
                                key={option.value}
                                value={option.value}
                                onClick={() => {
                                  stylePrefix.value = option.value;
                                }}
                              >
                                <VListItemTitle>{option.label}</VListItemTitle>
                              </VListItem>
                            );
                          })}
                        </VList>
                      </VMenu>
                    </span>
                  ) : (
                    <ElSelect v-model={stylePrefix.value} style="width: 75px">
                      {options.map((option) => {
                        return (
                          <ElOption
                            key={option.value}
                            label={option.label}
                            value={option.value}
                          />
                        );
                      })}
                    </ElSelect>
                  )}
                </>
              );
            },
          }}
        </Input>
      );
    };
  },
});

export default StyleInput;
