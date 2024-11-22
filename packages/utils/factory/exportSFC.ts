import { FormSetting, IEditorElement } from "@cgx-designer/core";

export type ICreateSFC = ReturnType<typeof createSFCSourceCode>;

//创建vue的SFC源码模式
export const createSFCSourceCode = (
  elementList: IEditorElement[],
  formSetting: FormSetting,
  javaScript: string
) => {
  const createHTMLCode = () => {
    //form的代码
    const FormCode = `
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="活动名称" prop="name">`;
    // 生成代码
    return FormCode;
  };

  const createScriptCode = () => {};
  const createStyleCode = () => {};

  const exportCode = () => {
    //总和
    return `
    <script setup>
    ${createScriptCode()}
    </script>

    <template>
    ${createHTMLCode()}
    </template>

    <style scoped>
    ${createStyleCode()}
    </style>
    `;
  };
};
