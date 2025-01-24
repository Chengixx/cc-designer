<script setup lang="ts">
import { Ripple } from "@cgx-designer/extensions";
import draggable from "vuedraggable";
import { computed, inject, ref, watch } from "vue";
import { getRandomId } from "@cgx-designer/utils";
import {
  IElementBaseSetting,
  elementController,
} from "@cgx-designer/controller";
import { useDrag, HoverManage, ThemeManage } from "@cgx-designer/hooks";
import { ElementListBarItem, ElementListBoxItem } from "./ElementListItem";
import { Collapse, CollapseItem } from "@cgx-designer/extensions";

//注册指令
defineExpose({
  directives: {
    ripple: Ripple,
  },
});

const props = defineProps({
  searchValue: { type: String, default: "", required: true },
});
const hoverManage = inject("hoverManage") as HoverManage;
const themeManage = inject("themeManage") as ThemeManage;
const activeCollapse = ref(
  elementController.elementList.value.map((item) => item.title)
);

//搜索过后用于渲染的
const renderElementList = computed(() => {
  return elementController!.elementList.value
    .map((elementMaterial) => {
      return {
        ...elementMaterial,
        materials: elementMaterial.materials.filter((item) => {
          return item.label.includes(props.searchValue);
        }),
      };
    })
    .filter((elementMaterial) => elementMaterial.materials.length > 0);
});
//渲染的模式
const renderElementListMode = computed(() => {
  return elementController!.elementListMode.value;
});

const { handleDropStart, handleDropEnd } = useDrag();
const handleClone = (elementBaseSetting: IElementBaseSetting) => {
  const newElement = elementBaseSetting.template(getRandomId);
  return newElement;
};
</script>

<template>
  <template v-if="!renderElementList.length">
    <div
      class="c-w-full c-flex c-justify-center c-items-center c-text-gray-400 c-mt-10"
    >
      暂无组件
    </div>
  </template>
  <template v-else>
    <Collapse v-model="activeCollapse">
      <CollapseItem
        :paddingBottom="false"
        v-for="item in renderElementList"
        :name="item.title"
        :title="item.title"
      >
        <draggable
          v-model="item.materials"
          v-bind="{
            group: { name: 'draggable', pull: 'clone', put: false },
            sort: false,
            animation: 180,
          }"
          :ghost-class="themeManage.isDark.value ? 'dark-moving' : 'moving'"
          @start="() => handleDropStart(hoverManage)"
          @end="() => handleDropEnd(hoverManage)"
          :clone="
            (elementBaseSetting: IElementBaseSetting) =>
              handleClone(elementBaseSetting)
          "
          item-key="id"
          :class="[
            renderElementListMode === 'bar' &&
              'c-grid c-grid-cols-2 c-px-[14px] c-gap-x-2',
            renderElementListMode === 'box' && 'c-grid c-grid-cols-3',
          ]"
        >
          <template #item="{ element, index }">
            <component
              :is="
                renderElementListMode === 'bar'
                  ? ElementListBarItem
                  : ElementListBoxItem
              "
              :element="element"
              :index="index"
            />
          </template>
        </draggable>
      </CollapseItem>
    </Collapse>
  </template>
</template>

<style scoped>
/* .moving {
  height: 3px;
  box-sizing: border-box;
  background: #409eff;
  border: 2px solid #409eff !important;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
} */
.moving {
  border: 1px solid #d9d9d9 !important;
}
.dark-moving {
  border: 1px solid #3c3c3e !important;
}
</style>
