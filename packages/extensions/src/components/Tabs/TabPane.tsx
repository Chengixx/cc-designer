import {
  computed,
  ComputedRef,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  Ref,
  Slots,
  UnwrapRef,
} from "vue";
import { TabsRootContext } from "./Tabs";
import { useEagerComputed } from "@cgx-designer/hooks";

export interface TabPaneContext {
  uid: number;
  slots: Slots;
  props: any;
  paneName: ComputedRef<string>;
  active: ComputedRef<boolean>;
  index: string;
}

const TabPane = defineComponent({
  name: "CTabPane",
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const tabsRoot = inject("tabsRootContext") as TabsRootContext;
    const instance = getCurrentInstance()!;
    const index = ref<string>();
    const paneName = computed(() => props.name ?? index.value);
    const active = useEagerComputed(
      () => tabsRoot.currentName.value === (props.name ?? index.value)
    );
    const pane = reactive({
      uid: instance.uid,
      slots,
      props,
      paneName,
      active,
      index,
    });

    onMounted(() => {
      tabsRoot.registerPane(pane);
    });

    onUnmounted(() => {
      tabsRoot.unregisterPane(pane.uid);
    });

    return () => (
      <>
        {active.value && (
          <div class={[active.value ? "c-opacity-100" : "c-opacity-0"]}>
            {slots.default?.()}
          </div>
        )}
      </>
    );
  },
});

export default TabPane;
