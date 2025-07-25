import { BuilderSchema, FormSetting, IElementSchema } from "@cgx-designer/types";
import { defaultCSS } from "./data";

export type ICreateSFCCode = ReturnType<typeof createSFCSourceCode>;

//创建vue的SFC源码模式
export const createSFCSourceCode = (builderSchema: BuilderSchema) => {
  const createFormItem = (formSetting: FormSetting) => {
    return `
  <el-form
    ref="${formSetting.refName}"
    :model="${formSetting.modelName}"
    :rules="${formSetting.rulesName}"
    label-width="${formSetting.labelWidth}px"
    :disabled="${formSetting.disabled}"
    :size="${formSetting.size}"
    :label-position="${formSetting.labelPosition}"
    >
  </el-form>`;
  };

  const createHTML = () => {
    //form的代码
    const defaultSFCHtml = `
<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="活动名称" prop="name">
    </el-form-item>
  </el-form>
</template>`;
    return defaultSFCHtml;
  };

  const createScriptCode = () => {
    return `
<script setup lang="ts">
import {
  BuilderSchema,
  ElementBuilder,
  ElementBuilderExpose,
} from "cgx-designer";
import { ref } from "vue";

const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
const builderSchema: BuilderSchema = ${JSON.stringify(builderSchema)};
</script>`;
  };
  const createStyleSheet = () => {
    return defaultCSS;
  };

  const createSFCSourceCode = () => {
    const { script, elementList, formSetting } = builderSchema;
    // console.log(createFormItem(formSetting));

    //总和
    return `
${createScriptCode()}
${createHTML()}
${createStyleSheet()}
`;
  };

  return {
    createSFCSourceCode,
    createFormItem,
  };
};
