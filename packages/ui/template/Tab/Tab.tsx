import { ElTabs, TabPaneName, TabsPaneContext } from "element-plus";
import {
  computed,
  defineComponent,
  inject,
  PropType,
  renderSlot,
  watch,
} from "vue";
import { ElementManage, FocusManage } from "@cgx-designer/hooks";
import { IEditorElement } from "@cgx-designer/core";

const Tab = defineComponent({
  props: {
    elementSchema: { type: Object as PropType<IEditorElement>, required: true },
  },
  setup(props, { slots }) {
    const elementManage = inject("elementManage") as ElementManage;
    const focusManage = inject("focusManage") as FocusManage;
    //原型元素
    const prototypeElementSchema = computed(() => {
      return elementManage.findElementById(props.elementSchema.id!);
    });
    //用于聚焦某个tabPane
    const handleFocusTabPane = (index: number) => {
      if (!elementManage.isDesignMode.value) return;
      const tabPaneId = props.elementSchema.elementList![index].id!;
      const tabPanePrototype = elementManage.findElementById(tabPaneId);
      focusManage.handleFocus(tabPanePrototype!);
    };
    //切换tab
    const handleTabChange = (v: TabPaneName) => {
      prototypeElementSchema.value!.props!.activeName = v;
    };
    //点击tab
    const handleTabClick = (context: TabsPaneContext, event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      handleFocusTabPane(Number(context.index));
    };
    //监听长度是为了删除的时候不要没选中
    const tabPaneListLength = computed(() => {
      return props.elementSchema.elementList?.length ?? 0;
    });
    watch(
      () => tabPaneListLength.value,
      (newLength, oldLength) => {
        //删除的情况下
        if (newLength < oldLength) {
          const currentActiveIndex =
            prototypeElementSchema.value!.elementList?.findIndex(
              (item) =>
                item.props!.name ===
                prototypeElementSchema.value!.props!.activeName
            );
          if (currentActiveIndex === -1) {
            prototypeElementSchema.value!.props!.activeName =
              prototypeElementSchema.value!.elementList![0].props!.name;
            handleFocusTabPane(0);
          }
        }
      }
    );
    return () => {
      return (
        <ElTabs
          stretch={props.elementSchema.props!.stretch}
          type={
            props.elementSchema.props!.type === "default"
              ? undefined
              : props.elementSchema.props!.type
          }
          v-model={props.elementSchema.props!.activeName}
          onTabChange={(v) => handleTabChange(v)}
          onTabClick={(context, event) => handleTabClick(context, event)}
        >
          {renderSlot(slots, "editNode")}
        </ElTabs>
      );
    };
  },
});

export default Tab;
