import { ElementManage } from "@cgx-designer/hooks";
import IDE from "../../../../../components/IDE/index";
import { defineComponent, inject, nextTick, ref, watch } from "vue";
import { deepClone } from "@cgx-designer/utils";

// !注意这个IDE是用来修改script用的
const ElementSource = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    const elementListSchema = ref(
      JSON.stringify(deepClone(elementManage.elementList.value))
    );
    watch(
      () => elementManage.elementList.value,
      (nv) => {
        elementListSchema.value = JSON.stringify(deepClone(nv));
      },
      { deep: true }
    );

    // watch(
    //   () => elementListSchema.value,
    //   (nv) => {
    //     elementManage.elementList.value = JSON.parse(nv);
    //   }
    // );

    return () => <IDE v-model={elementListSchema.value} />;
  },
});

export default ElementSource;
