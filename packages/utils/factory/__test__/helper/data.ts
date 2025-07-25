import { BuilderSchema, FormSetting, IElementSchema } from "@cgx-designer/types";

export const javaScript = `
      const { inject , get } = this;

      function lcc () {
          console.log(lcc222);
      }
      
      const test = () => {
          console.log(this);
      }

      inject({
        lcc,
        test,
      })
    `;

export const elementSchemaList: IElementSchema[] = [
  {
    id: "IRj2GmLB",
    field: "bar",
    key: "input",
    formItem: true,
    props: {
      label: "bar",
      placeholder: "placeholder",
      size: "",
      labelPosition: "",
      defaultValue: "",
    },
    on: {
      input: [
        {
          type: "custom",
          methodName: "lcc",
          componentId: null,
        },
      ],
    },
  },
  {
    id: "Vm5tIeLq",
    field: "foo",
    key: "input",
    formItem: true,
    props: {
      label: "foo",
      placeholder: "placeholder",
      size: "",
      labelPosition: "",
      defaultValue: "",
    },
  },
  {
    id: "Vm5tIe123",
    field: "number",
    key: "inputNumber",
    formItem: true,
    props: {
      label: "数字",
      placeholder: "placeholder",
      size: "",
      labelPosition: "",
      defaultValue: 0,
    },
  },
];

export const formSetting: FormSetting = {
  modelName: "formData",
  refName: "formRef",
  rulesName: "formRules",
  labelPosition: "top",
  labelWidth: 100,
  size: "default",
};

export const builderSchema: BuilderSchema = {
  formSetting: {
    modelName: "formData",
    refName: "formRef",
    rulesName: "formRules",
    labelPosition: "left",
    labelWidth: 50,
    size: "default",
    disabled: true,
  },
  elementList: [
    {
      id: "IRj2GmLB",
      field: "bar",
      key: "input",
      formItem: true,
      props: {
        label: "bar",
        placeholder: "placeholder",
        size: "",
        labelPosition: "",
        defaultValue: "",
      },
    },
    {
      id: "Vm5tIeLq",
      field: "foo",
      key: "input",
      formItem: true,
      props: {
        label: "foo",
        placeholder: "placeholder",
        size: "",
        labelPosition: "",
        defaultValue: "",
      },
    },
    {
      id: "Vm5tIe123",
      field: "number",
      key: "inputNumber",
      formItem: true,
      props: {
        label: "数字",
        placeholder: "placeholder",
        size: "",
        labelPosition: "",
        defaultValue: 0,
      },
    },
    {
      id: "Vm5tIa678",
      field: "select",
      key: "select",
      formItem: true,
      props: {
        label: "选择",
        placeholder: "placeholder",
        size: "",
        labelPosition: "",
        options: [
          { label: "label1", value: "value1" },
          { label: "label2", value: "value2" },
        ],
      },
    },
  ],
  script: javaScript,
};

export const formatSchema = `<script setup lang="ts">
import {
  BuilderSchema,
  ElementBuilder,
  ElementBuilderExpose,
} from "cgx-designer";
import { ref } from "vue";

const elementBuilderRef = ref<ElementBuilderExpose | null>(null);
const builderSchema: BuilderSchema = {"formSetting":{"modelName":"formData","refName":"formRef","rulesName":"formRules","labelPosition":"left","labelWidth":50,"s
ize":"default","disabled":true},"elementList":[{"id":"IRj2GmLB","field":"bar","key":"input","formItem":true,"props":{"label":"bar","placeholder":"placeholder","s
ize":"","labelPosition":"","defaultValue":""}},{"id":"Vm5tIeLq","field":"foo","key":"input","formItem":true,"props":{"label":"foo","placeholder":"placeholder","s
ize":"","labelPosition":"","defaultValue":""}},{"id":"Vm5tIe123","field":"number","key":"inputNumber","formItem":true,"props":{"label":"数字","placeholder":"plac
eholder","size":"","labelPosition":"","defaultValue":0}},{"id":"Vm5tIa678","field":"select","key":"select","formItem":true,"props":{"label":"选择","placeholder":
"placeholder","size":"","labelPosition":"","options":[{"label":"label1","value":"value1"},{"label":"label2","value":"value2"}]}}],"script":"\n      const { injec
t , get } = this;\n\n      function lcc () {\n          console.log(lcc222);\n      }\n      \n      const test = () => {\n          console.log(this);\n      }\
n\n      inject({\n        lcc,\n        test,\n      })\n    "});
</script>`;

export const testElementSchema: IElementSchema = {
  id: "etIkZQxN",
  field: "input-etIkZQxN",
  key: "input",
  formItem: true,
  props: {
    label: "input",
    placeholder: "placeholder",
    size: "",
    labelPosition: "",
  },
  style: {},
};
