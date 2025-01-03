import { ElCol, ElRow } from "element-plus";
import { defineComponent } from "vue";

const RuleFormItem = defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => (
      <div class="c-w-full c-flex c-items-center">
        <ElRow class="c-w-full">
          {props.label && (
            <ElCol span={8}>
              <div class="c-font-medium c-text-sm c-text-gray-600 c-h-full c-flex c-items-center dark:text-gray-300">
                {props.label}:
              </div>
            </ElCol>
          )}
          <ElCol span={props.label ? 16 : 24}>{slots.default?.()}</ElCol>
        </ElRow>
      </div>
    );
  },
});

export default RuleFormItem;
