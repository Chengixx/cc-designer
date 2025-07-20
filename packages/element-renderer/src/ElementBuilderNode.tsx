import { defineComponent, PropType } from "vue";
import { IEditorElement } from "@cgx-designer/types";
import { ElementEngine } from "@cgx-designer/element-engine";

const ElementBuilderNode = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props) {
    return () => {
      return (
        <ElementEngine elementSchema={props.elementSchema} isPreview>
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
        </ElementEngine>
      );
    };
  },
});

export default ElementBuilderNode;
