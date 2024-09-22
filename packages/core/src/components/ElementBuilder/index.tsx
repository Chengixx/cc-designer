import { ElementManage } from "@cgx-designer/hooks";
import { defineComponent, inject } from "vue";
import ElementBuilderNode from "./ElementBuilderNode";

const ElementBuilder = defineComponent({
  setup() {
    const elementManage = inject("elementManage") as ElementManage;
    return () => {
      return (
        <div>
          {elementManage.elementList.value.map((elementSchema) => {
            return (
              <>
                <ElementBuilderNode elementSchema={elementSchema} />
              </>
            );
          })}
        </div>
      );
    };
  },
});
export default ElementBuilder;
