import { computed, defineComponent, PropType, ref, watch } from "vue";
import { IElementSchema } from "@cgx-designer/types";
import { elementController } from "@cgx-designer/controller";
import { GroupOption } from "@cgx-designer/base-materials";

const StyleInput = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IElementSchema>, required: true },
  },
  emits: ["update:modelValue"],
  // 加入这个即可防止直接v-model透传
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    const Input = elementController.getElementRender("input");
    const SelectPanel = elementController.getElementRender("selectPanel");
    const Select = elementController.getElementRender("select");
    const isVuetify = computed(() => {
      return elementController.getCurrentElementLibraryName() === "vuetify";
    });
    const options: GroupOption[] = [
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
                      <div class="c-flex c-justify-center c-items-center c-gap-x-1">
                        <span>{stylePrefix.value}</span>
                        <div class="c-translate-y-1 c-border-4 c-border-l-transparent c-border-r-transparent c-border-t-gray-600 c-border-b-transparent"></div>
                      </div>
                      <SelectPanel
                        v-model={stylePrefix.value}
                        options={options}
                      />
                    </span>
                  ) : (
                    <Select
                      v-model={stylePrefix.value}
                      style="width: 70px"
                      options={options}
                      placeholder="请选择"
                    />
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
