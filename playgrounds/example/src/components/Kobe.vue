<script setup lang="ts">
defineProps({
  elementSchema: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="flex">
    <img src="../img/kobe.png" alt="" class="w-60 h-60" />
    <div class="p-2">
      <div class="text-2xl font-bold">Kobe Bryant(科比·布牢恩大)🏀🏀🏀</div>
      <div class="text-2xl font-bold">No.②④ No.⑧🚀🚀🚀</div>
      <div class="mt-2 text-gray-500">🌹🌹🌹NBA Legend(沙克也干了)</div>
      <div class="mt-2 text-gray-500">
        {{ elementSchema.props.value }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
