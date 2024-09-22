import { defineComponent, PropType } from "vue";
import { IEditorElement } from "@/types";
import ElementNode from "../ElementNode";

const ElementBuilderNode = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <ElementNode elementSchema={props.elementSchema}>
          {{
            editNode: () => {
              //就返回循环的elementList啊
              return (
                <>
                  {props.elementSchema.elementList?.map(
                    (childElementSchema: IEditorElement) => {
                      return (
                        <ElementBuilderNode
                          elementSchema={childElementSchema}
                          key={childElementSchema.id}
                        />
                      );
                    }
                  )}
                </>
              );
            },
          }}
        </ElementNode>
      );
    };
  },
});

export default ElementBuilderNode;
