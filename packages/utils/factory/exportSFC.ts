import { BuilderSchema, IEditorElement } from "@cgx-designer/core";
import { defaultCSS } from "./data";

export type ICreateSFCCode = ReturnType<typeof createSFCSourceCode>;

const formItemKeys: string[] = ["label", "size", "labelPosition"];

//创建vue的SFC源码模式
export const createSFCSourceCode = (builderSchema: BuilderSchema) => {
  const { elementList, script, formSetting } = builderSchema;
  const createFormItem = (elementSchema: IEditorElement) => {
    const props = elementSchema.props;
    let formItemPropsString = "";
    Object.keys(props!).forEach((key) => {
      console.log(key, props![key]);
      //如果是在formItemKeys中，则添加到form-item的props中
      if (formItemKeys.includes(key)) {
        formItemPropsString += ` ${key}="${props![key]}"`;
      }
    });
    console.log(formItemPropsString);

    return `<el-form-item ${formItemPropsString}>
    </el-form-item>`;
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
import { javaScript } from '../../../play/src/data';

const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
const builderSchema: BuilderSchema = ${JSON.stringify(builderSchema)};
</script>`;
  };
  const createStyleSheet = () => {
    return defaultCSS;
  };

  const createSFCSourceCode = () => {
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
