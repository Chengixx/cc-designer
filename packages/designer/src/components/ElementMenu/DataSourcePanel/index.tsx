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
    const sourceDataManage = inject("sourceDataManage") as SourceDataManage;
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
          sourceDataManage.removeSourceData(dataItem.name);
        },
      },
    ];
    const renderSourceData = computed(() => {
      return sourceDataManage.sourceData.value.filter((dataItem) => {
        return dataItem.name.includes(props.searchValue);
      });
    });
    return () => (
      <div>
        {sourceDataManage.sourceData.value.length === 0 && (
          <div class="c-w-full c-flex c-justify-center c-items-center c-text-gray-400">
            <Empty />
          </div>
        )}
        {renderSourceData.value.map((dataItem, dataIndex) => {
          return (
            <div class="c-h-10 c-w-full c-cursor-pointer c-px-3 c-py-1 c-flex c-justify-between c-items-center c-border-b c-border-dashed hover:c-bg-gray-100 dark:hover:c-bg-gray-600 dark:c-border-darkMode">
              <div class="c-flex c-justify-center c-items-center c-gap-x-1 c-select-none">
                <span
                  style={{
                    color: dataSourceColor[dataItem.type],
                    marginRight: "4px",
                  }}
                >
                  {dataItem.type}
                </span>
                <span>{dataItem.name}</span>
              </div>

              <div class="c-h-full c-flex c-justify-center c-items-center c-gap-x-2">
                {iconList.map((iconItem) => {
                  const Icon = iconItem.icon;
                  return (
                    <div
                      onClick={() => {
                        const dataIndex =
                          sourceDataManage.sourceData.value.findIndex(
                            (item) => item.name === dataItem.name
                          );
                        iconItem.onClick(dataItem, dataIndex);
                      }}
                    >
                      <Icon class="c-h-4 c-w-4 hover:c-fill-blue-400 dark:c-fill-white dark:hover:c-fill-blue-400 c-cursor-pointer" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});

export default DataSourcePane;
