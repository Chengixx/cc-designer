import { ElCard } from "element-plus";
import { defineComponent } from "vue";
import Draggle from "cgx-designer/src/components/EdiorCanvas/components/Draggle.vue";

const Card = defineComponent({
  props: {
    elementSchema: Object,
  },
  setup(props: any) {
    return () => {
      return (
        <div class="p-1 w-full">
          <ElCard class="w-full">
            {{
              header: () => {
                return <div>{props.elementSchema.props!.label}</div>;
              },
              default: () => {
                return (
                  <div
                    class={["border-dashed border border-[#d9d9d9]"]}
                    id={props.elementSchema.id as string}
                  >
                    <Draggle
                      list={props.elementSchema.elementList!}
                      isNested={true}
                    />
                  </div>
                );
              },
            }}
          </ElCard>
        </div>
      );
    };
  },
});

export default Card;
