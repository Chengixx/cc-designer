import { defineComponent, PropType } from "vue";
import { IElementSchema } from "@cgx-designer/types";
import { ElementEngine } from "@cgx-designer/element-engine";

const ElementBuilderNode = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IElementSchema>, required: true },
  },
  setup(props) {
    return () => (
      <ElementEngine elementSchema={props.elementSchema} isPreview>
        {{
          editNode: () => {
            //就返回循环的elementList啊
            return (
              <>
                {props.elementSchema.elementList?.map(
                  (childElementSchema: IElementSchema) => {
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
  },
});

export default ElementBuilderNode;
