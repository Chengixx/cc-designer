<script setup lang="ts">
import { TabPane, Tabs, CTree } from "@cgx-designer/extensions";
import { ref } from "vue";

const activeTab = ref("0");
const handleClick = (tab: any, e: any) => {};
const selectedKeys = ref("9aNQnBKA");
const data = ref([
  {
    id: "9aNQnBKA",
    key: "row",
    props: {},
    elementList: [
      {
        id: "NDaEJ1yg",
        key: "col",
        props: {
          span: 12,
        },
        elementList: [
          {
            id: "iBDbMJ3R",
            formItem: true,
            key: "rate",
            field: "rate-iBDbMJ3R",
            props: {
              size: "",
              label: "rate",
              defaultValue: 0,
            },
          },
        ],
      },
      {
        id: "yP5zIysH",
        key: "col",
        props: {
          span: 12,
        },
        elementList: [
          {
            id: "1SRqPps7",
            key: "select",
            formItem: true,
            field: "select-1SRqPps7",
            props: {
              label: "select",
              multiple: false,
              options: [
                {
                  label: "label1",
                  value: "value1",
                },
                {
                  label: "label2",
                  value: "value2",
                },
              ],
              placeholder: "请选择",
            },
          },
        ],
      },
    ],
  },
  {
    id: "ov1oLvjf",
    key: "select",
    formItem: true,
    field: "select-ov1oLvjf",
    props: {
      label: "select",
      multiple: false,
      options: [
        {
          label: "label1",
          value: "value1",
        },
        {
          label: "label2",
          value: "value2",
        },
      ],
      placeholder: "请选择",
    },
  },
]);
</script>
<template>
  <div class="c-h-screen c-w-screen">
    {{ selectedKeys }}
    <CTree v-model:elementList="data" v-model:selectedKey="selectedKeys">
      <template #tree-node-extension="{ elementSchema }">
        <div class="c-text-gray-500">{{ elementSchema.id }}</div>
      </template>
    </CTree>
    <!-- <Tabs v-model="activeTab" @tabClick="handleClick">
      <TabPane label="第一个">1</TabPane>
      <TabPane label="第二个">2</TabPane>
      <TabPane label="第三个">3</TabPane>
    </Tabs> -->
  </div>
</template>

<style scoped></style>
