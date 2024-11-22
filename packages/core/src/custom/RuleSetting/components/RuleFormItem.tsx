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
      <div class="w-full flex items-center">
        <ElRow class="w-full">
          {props.label && (
            <ElCol span={8}>
              <div class="font-medium text-sm text-gray-600 h-full flex items-center">
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
