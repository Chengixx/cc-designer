import { defineComponent, provide, ref } from "vue";
import { createOperationButtonSetting } from "./OperationMenu/operationButtonSetting";
import CGXLogo from "./CGXLogo";
import ActionMenu from "./ActionMenu";
import OperationMenu from "./OperationMenu";
import EditorCanvas from "./EditorCanvas";
import SettingMenu from "./SettingMenu";
import PreviewDialog from "./PreviewDialog";
import {
  ExportSourceCodeDialog,
  ImportSourceCodeDialog,
} from "./SourceCodeDialog";
import {
  useCollapse,
  useFunction,
  useForm,
  useHover,
  useElement,
  useFocus,
  useTheme,
  useMode,
  useSourceData,
  useQueue,
  useKeyboard,
} from "@cgx-designer/hooks";
import CollapseWidget from "./CollapseWidget";
import { elementController } from "@cgx-designer/controller";
import { Loading } from "@cgx-designer/extensions";
import { isMac } from "@cgx-designer/utils";
import { initMonacoVue } from "../init";
import { registerPrivateCompoents } from "@cgx-designer/private-materials";
import SearchBar from "./SearchBar";

//设计器
const ElementDesigner = defineComponent({
  setup() {
    registerPrivateCompoents();
    initMonacoVue();
    //实例
    const previewDialogRef = ref<any>(null);
    const exportSourceCodeDialogRef = ref<any>(null);
    const importSourceCodeDialogRef = ref<any>(null);
    const searchBarRef = ref<any>(null);
    //所有的hook实例
    const formManager = useForm();
    const elementManager = useElement();
    const collapseManager = useCollapse();
    const themeManager = useTheme();
    const modeManager = useMode();
    const hoverManager = useHover(elementManager, modeManager);
    const focusManager = useFocus(elementManager, modeManager);
    const sourceDataManager = useSourceData(elementManager);
    const functionManager = useFunction(elementManager, sourceDataManager);
    const queueManager = useQueue(elementManager, focusManager);
    //因为只能有一个实例 所以用provide注入进去
    provide("focusManager", focusManager);
    provide("elementManager", elementManager);
    provide("themeManager", themeManager);
    provide("collapseManager", collapseManager);
    provide("hoverManager", hoverManager);
    provide("formManager", formManager);
    provide("modeManager", modeManager);
    provide("sourceDataManager", sourceDataManager);
    provide("functionManager", functionManager);
    provide("queueManager", queueManager);

    const manages = {
      formManager,
      elementManager,
      functionManager,
      focusManager,
      sourceDataManager,
      queueManager,
    };

    const refs = {
      previewDialogRef,
      exportSourceCodeDialogRef,
      importSourceCodeDialogRef,
      searchBarRef,
    };

    const buttonMap = createOperationButtonSetting(manages, refs);

    //mac是command+z，windows是ctrl+z
    useKeyboard([
      {
        key: isMac ? "cmd+z" : "ctrl+z",
        handler: queueManager.undo,
      },
      {
        key: isMac ? "cmd+shift+z" : "ctrl+shift+z",
        handler: queueManager.redo,
      },
      {
        key: isMac ? "cmd+f" : "ctrl+f",
        handler: () => {
          searchBarRef.value.show();
        },
      },
    ]);

    return () => (
      <>
        {elementController.isReady.value ? (
          <>
            <div
              class="c-relative"
              key={elementController.elementLibrary.value!.name || "key"}
            >
              {/* 顶部条Logo以及部分操作栏 */}
              <CGXLogo />
              {/* 下面内容的主体 */}
              <div class="c-w-full c-h-full c-flex c-justify-between c-bg-gray-100 dark:c-bg-black">
                {/* 编辑器左侧菜单 */}
                <ActionMenu />
                {/* 中间部分 */}
                <div class="c-h-full c-flex-1">
                  {/* 编辑器顶部操作栏 */}
                  <OperationMenu buttonMap={buttonMap} />
                  {/* 下面的画布 */}
                  <EditorCanvas />
                </div>
                {/* 编辑器右侧菜单 */}
                <SettingMenu />
              </div>
            </div>
            {/* 折叠按钮小控件 */}
            <CollapseWidget />
            {/* 预览dialog */}
            <PreviewDialog ref={previewDialogRef} />
            {/* 导入导出dialog */}
            <ExportSourceCodeDialog ref={exportSourceCodeDialogRef} />
            <ImportSourceCodeDialog ref={importSourceCodeDialogRef} />
            {/* 搜索控件 */}
            <SearchBar ref={searchBarRef} />
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  },
});

export default ElementDesigner;
