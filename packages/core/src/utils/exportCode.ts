import { useFormStoreHook } from "@/store/modules/form";
import { useElementStoreHook } from "@/store/modules/element";

const { formSetting } = useFormStoreHook();
const { elementList } = useElementStoreHook();

const createHTMLCode = () => {
  //form的代码
  const FormCode = `
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="活动名称" prop="name">`;
  // 生成代码
  return FormCode;
};

const createSciptCode = () => {};
const createStyleCode = () => {};

const exportCode = () => {
  //总和
  return `
  <tempate>
  ${createHTMLCode()}
  </tempate>
  <script setup>
  ${createSciptCode()}
  </script>
  <style scoped>
  ${createStyleCode()}
  </style>
  `;
};

export default exportCode;
