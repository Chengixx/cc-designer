import { BuilderSchema, FormSetting } from "@cgx-designer/types";

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

export const elementSchemaList = [
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
    labelWidth: 100,
    disabled: false,
    size: "default",
    labelPosition: "left",
  },
  elementList: [
    {
      id: "0BIdsa5V",
      field: {
        type: "sourceData",
        dataType: "ref",
        value: "test",
      },
      key: "input",
      formItem: true,
      props: {
        label: "input",
        placeholder: "placeholder",
        size: "",
        labelPosition: "",
      },
    },
  ],
  script:
    '\n    const { inject , get , ElMessage , ElMessageBox } = this;\n\n    function fn () {\n        console.log("i am yours");\n        ElMessage.success("i am yours");\n    }\n    \n    const testFn = () => {\n        console.log(this);\n        test.value = "曼巴哈哈哈";\n    }\n\n    inject({\n      fn,\n      testFn,\n    })\n    ',
  sourceData: [
    {
      type: "ref",
      name: "test",
      instance: {
        initialValue: "myName",
        deps: [
          {
            key: "0BIdsa5Vfield",
            type: "component",
            componentId: "0BIdsa5V",
            attrName: "field",
          },
        ],
      },
    },
  ],
};
