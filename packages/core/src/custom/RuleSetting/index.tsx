import { RuleItem } from "../..//types";
import { CCard } from "@cgx-designer/extensions";
import { IEditorElement } from "@cgx-designer/core";
import { ElButton, ElDivider, ElInput, ElOption, ElSelect, ElSwitch } from "element-plus";
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { triggerOptions, typeOptions } from "./constant";
import RuleFormItem from "./components/RuleFormItem";
import { deepClone } from "@cgx-designer/utils";

interface RuleSettingAttrs {
  modelValue: RuleItem[] | undefined;
  "onUpdate:modelValue": (value: RuleItem[] | undefined) => void;
}

const RuleSetting = defineComponent({
  props: {
    elementSchema: {
      type: Object as PropType<IEditorElement>,
    },
  },
  setup(_, { attrs }) {
    const requiredRule = ref<RuleItem>({
      required: false,
      message: "必填项",
      type: "",
      trigger: ["change"],
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

    const handleAddRule = () => {
      rulesList.value?.push({
        message: "",
        type: "",
        trigger: ["change"],
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
      <div class="w-full">
        <ElDivider>校验管理</ElDivider>
        <div class="mt-2">
          <CCard>
            {{
              default: () => {
                return (
                  <>
                    <RuleFormItem label="必填">
                      <ElSwitch v-model={requiredRule.value.required} />
                    </RuleFormItem>
                    {requiredRule.value.required && (
                      <>
                        <RuleFormItem label="校验时机" class="mt-2">
                          <ElSelect
                            v-model={requiredRule.value.trigger}
                            multiple
                          >
                            {triggerOptions.map((item) => {
                              return (
                                <ElOption
                                  label={item.label}
                                  value={item.value}
                                  key={item.value}
                                />
                              );
                            })}
                          </ElSelect>
                        </RuleFormItem>
                        <RuleFormItem label="类型" class="mt-2">
                          <ElSelect v-model={requiredRule.value.type}>
                            {typeOptions.map((item) => {
                              return (
                                <ElOption
                                  label={item.label}
                                  value={item.value}
                                  key={item.value}
                                />
                              );
                            })}
                          </ElSelect>
                        </RuleFormItem>
                        <RuleFormItem label="提示信息" class="mt-2">
                          <ElInput v-model={requiredRule.value.message} />
                        </RuleFormItem>
                      </>
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
                        <RuleFormItem label="校验时机">
                          <ElSelect v-model={rule.trigger} multiple>
                            {triggerOptions.map((item) => {
                              return (
                                <ElOption
                                  label={item.label}
                                  value={item.value}
                                  key={item.value}
                                />
                              );
                            })}
                          </ElSelect>
                        </RuleFormItem>
                        <RuleFormItem label="类型" class="mt-2">
                          <ElSelect v-model={rule.type}>
                            {typeOptions.map((item) => {
                              return (
                                <ElOption
                                  label={item.label}
                                  value={item.value}
                                  key={item.value}
                                />
                              );
                            })}
                          </ElSelect>
                        </RuleFormItem>
                        <RuleFormItem label="正则校验" class="mt-2">
                          <ElInput v-model={rule.pattern} />
                        </RuleFormItem>
                        <RuleFormItem label="提示信息" class="mt-2">
                          <ElInput v-model={rule.message} />
                        </RuleFormItem>
                      </>
                    );
                  },
                  footer: () => (
                    <div class="w-full flex justify-end">
                      <ElButton
                        link
                        type="danger"
                        onClick={() => handleDeleteRule(index)}
                      >
                        删除规则
                      </ElButton>
                    </div>
                  ),
                }}
              </CCard>
            );
          })}
        </div>
        <div>
          <ElButton
            link
            type="primary"
            onClick={() => {
              handleAddRule();
            }}
          >
            新增校验
          </ElButton>
        </div>
      </div>
    );
  },
});

export default RuleSetting;
