import { SoureDataManage } from "@cgx-designer/hooks";
import { defineComponent, inject } from "vue";

const DataSourcePane = defineComponent({
  setup() {
    const sourceDataManage = inject("sourceDataManage") as SoureDataManage;
    return () => (
      <div>
        <div>源码面板</div>
        {sourceDataManage.sourceData.value.map((dataItem) => {
          return (
            <div>
              {dataItem.name} :::: {dataItem.value}
            </div>
          );
        })}
      </div>
    );
  },
});

export default DataSourcePane;
