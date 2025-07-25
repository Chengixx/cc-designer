import { RuleItem } from "@cgx-designer/types";
import { CCard, Divider } from "@cgx-designer/extensions";
import { IElementSchema } from "@cgx-designer/types";
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { CFormItem } from "@cgx-designer/extensions";
import { deepClone } from "@cgx-designer/utils";
import { elementController } from "@cgx-designer/controller";
import { VBtnColorType, vuetifyConfig } from "@cgx-designer/base-materials";
import { MonacoIDE } from "@cgx-designer/extensions";

interface RuleSettingAttrs {
  modelValue: RuleItem[] | undefined;
  "onUpdate:modelValue": (value: RuleItem[] | undefined) => void;
}

const RuleSetting = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IElementSchema>,
    },
  },
  setup(_, { attrs }) {
    const Button = elementController.getElementRender("button");
    const Input = elementController.getElementRender("input");
    const Switch = elementController.getElementRender("switch");
    const requiredRule = ref<RuleItem>({
      required: false,
      message: "必填项",
    });
    const rulesList = ref<RuleItem[]>([]);

    onMounted(() => {
      if (!attrs.modelValue) return;
      rulesList.value = [];
      (attrs.modelValue as RuleSettingAttrs["modelValue"])?.forEach((item) => {
        if (typeof item.required !== "undefined") {
          requiredRule.value = item;
        } else {
          rulesList.value.push(item);
        }
      });
    });

    const handleUpdate = () => {
      if (requiredRule.value.required) {
        (attrs["onUpdate:modelValue"] as Function)(
          deepClone([...rulesList.value, requiredRule.value])
        );
        return;
      }
      if (rulesList.value.length) {
        (attrs["onUpdate:modelValue"] as Function)(deepClone(rulesList.value));
        return;
      }
      (attrs["onUpdate:modelValue"] as Function)(undefined);
    };

    watch(() => requiredRule.value, handleUpdate, { deep: true });
    watch(() => rulesList.value, handleUpdate, { deep: true });

    const handleAddRule = () => {
      rulesList.value?.push({
        prototype: "",
      });
      handleUpdate();
    };

    const handleDeleteRule = (index: number) => {
      rulesList.value?.splice(index, 1);
      if (!rulesList.value?.length) {
        rulesList.value = [];
      }
      handleUpdate();
    };
    return () => (
      <div class="c-w-full">
        <Divider label="校验配置" />
        <div class="c-mt-2">
          <CCard>
            {{
              default: () => {
                return (
                  <>
                    <CFormItem label="必填" labelCol={8} needBottom={false}>
                      <Switch
                        v-model={requiredRule.value.required}
                        {...vuetifyConfig}
                      />
                    </CFormItem>
                    {requiredRule.value.required && (
                      <CFormItem label="提示信息" class="c-mt-2" labelCol={8}>
                        <Input
                          v-model={requiredRule.value.message}
                          {...vuetifyConfig}
                        />
                      </CFormItem>
                    )}
                  </>
                );
              },
            }}
          </CCard>
          {rulesList.value?.map((rule, index) => {
            return (
              <CCard key={index}>
                {{
                  default: () => {
                    return (
                      <>
                        <div class="c-w-full c-h-fit c-bg-[#ededed] dark:c-bg-[#1b1b1b] c-px-3 c-py-1 c-box-border c-rounded-t-md">
                          <span class="c-text-sm c-text-gray-500 dark:c-text-gray-200">
                            validate (value) &#123;
                          </span>
                        </div>
                        <div class="c-w-full c-h-60">
                          <MonacoIDE v-model={rule.prototype} />
                        </div>
                        <div class="c-w-full c-h-fit c-bg-[#ededed] dark:c-bg-[#1b1b1b] c-px-3 c-py-1 c-box-border c-rounded-b-md">
                          <span class="c-text-sm c-text-gray-500 dark:c-text-gray-200">
                            &#125;
                          </span>
                        </div>
                      </>
                    );
                  },
                  footer: () => (
                    <div class="c-w-full c-flex c-justify-end">
                      <Button
                        link
                        color={VBtnColorType.danger}
                        variant="text"
                        type="danger"
                        onClick={() => handleDeleteRule(index)}
                      >
                        删除规则
                      </Button>
                    </div>
                  ),
                }}
              </CCard>
            );
          })}
        </div>
        <div>
          <Button
            link
            variant="text"
            color={VBtnColorType.primary}
            type="primary"
            onClick={() => {
              handleAddRule();
            }}
          >
            新增校验
          </Button>
        </div>
      </div>
    );
  },
});

export default RuleSetting;
