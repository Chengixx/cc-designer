import { Empty } from "@cgx-designer/extensions";
import { SourceDataItem, SourceDataManage } from "@cgx-designer/hooks";
import { ClearIcon, EditIcon } from "@cgx-designer/icons";
import { computed, defineComponent, inject } from "vue";
import { dataSourceColor } from "../../../constant/index";

const DataSourcePane = defineComponent({
  emits: ["editSourceData"],
  props: {
    searchValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const sourceDataManager = inject("sourceDataManager") as SourceDataManage;
    const iconList = [
      {
        icon: EditIcon,
        onClick(dataItem: SourceDataItem, dataIndex: number) {
          emit("editSourceData", { dataItem, dataIndex });
        },
      },
      {
        icon: ClearIcon,
        onClick(dataItem: SourceDataItem) {
          sourceDataManager.removeSourceData(dataItem.name);
        },
      },
    ];
    const renderSourceData = computed(() => {
      return sourceDataManager.sourceData.value.filter((dataItem) => {
        return dataItem.name.includes(props.searchValue);
      });
    });
    return () => (
      <div class="c-space-y-2 c-p-2">
        {sourceDataManager.sourceData.value.length === 0 && (
          <div class="c-flex c-flex-col c-items-center c-justify-center c-py-12 c-text-gray-400 c-bg-gray-50 dark:c-bg-gray-800 c-rounded-lg c-border-2 c-border-dashed c-border-gray-200 dark:c-border-gray-700">
            <Empty />
            <p class="c-mt-2 c-text-sm">暂无数据源</p>
          </div>
        )}
        {renderSourceData.value.map((dataItem, _) => {
          return (
            <div class="c-group c-relative c-bg-white dark:c-bg-gray-950 c-rounded-lg c-border c-border-gray-200 dark:c-border-gray-700 c-shadow-sm hover:c-shadow-md c-transition-all c-duration-200 c-ease-in-out hover:c-border-blue-300 dark:hover:c-border-gray-600">
              <div class="c-flex c-items-center c-justify-between c-px-3 c-py-2">
                <div class="c-flex c-items-center c-gap-x-2 c-min-w-0 c-flex-1">
                  <div
                    class="c-px-1.5 c-py-0.5 c-rounded c-text-xs c-font-medium c-text-white c-shadow-sm"
                    style={{
                      backgroundColor: dataSourceColor[dataItem.type],
                    }}
                  >
                    {dataItem.type}
                  </div>
                  <span class="c-text-sm c-font-medium c-text-gray-900 dark:c-text-gray-100 c-truncate">
                    {dataItem.name}
                  </span>
                </div>

                <div class="c-flex c-items-center c-gap-x-1 c-opacity-0 group-hover:c-opacity-100 c-transition-opacity c-duration-200">
                  {iconList.map((iconItem, iconIndex) => {
                    const Icon = iconItem.icon;
                    return (
                      <button
                        key={iconIndex}
                        onClick={() => {
                          const dataIndex =
                            sourceDataManager.sourceData.value.findIndex(
                              (item) => item.name === dataItem.name
                            );
                          iconItem.onClick(dataItem, dataIndex);
                        }}
                        class="c-p-1 c-rounded c-text-gray-500 hover:c-text-blue-600 hover:c-bg-blue-50 dark:c-text-gray-300 dark:hover:c-text-blue-400 dark:hover:c-bg-gray-700 c-transition-all c-duration-150 c-ease-in-out c-cursor-pointer"
                        title={iconIndex === 0 ? "编辑" : "删除"}
                      >
                        <Icon class="c-h-4 c-w-4 hover:c-fill-blue-400 dark:c-fill-white dark:hover:c-fill-blue-400 c-cursor-pointer" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});

export default DataSourcePane;
