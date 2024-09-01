import { ElCard } from "element-plus";
import { defineComponent } from "vue";
import Draggle from "@/components/EdiorCanvas/components/Draggle.vue";

const Card = defineComponent({
  props: {
    props: Object,
    elementList: Array,
  },
  setup(props: any) {
    return () => {
      return (
        <div class="p-1 w-full">
          <ElCard class="w-full">
            {{
              header: () => {
                return <div>{props.props!.label}</div>
              },
              default: () => {
                return (
                  <div
                    class={[
                      "border-dashed border border-[#d9d9d9]",
                    ]}
                    id={props.id as string}
                  >
                    <Draggle list={props.elementList!} isNested={true} elementKey="card" />
                  </div>
                )

              }
            }}
          </ElCard>
        </div>
      )
    }
  }
})

export default Card