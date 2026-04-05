<script lang="ts" setup>
import type { ImgHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ImgHTMLAttributes {}
const props = defineProps<Props>();
</script>
<template>
    <span>
        <img v-bind="$attrs">
    </span>
</template>

<style scoped>
span {
    display: flex;
    justify-content: center;
}
img {
  width: 90% ;
  height: auto;
  padding: 8px;
}
</style>