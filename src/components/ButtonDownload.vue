<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {}
defineProps<Props>();

</script>

<template>
    <span>
        <button class="button-download" v-bind="$attrs">
            <slot></slot>
        </button>
    </span>
</template>

<style scoped>
    .button-download {
        background: hsl(138, 67%, 47%);
        color: #f0f0f0;
        border: 1px solid #181818;
        padding: 0.7em;
        text-shadow: 1px 1px 2px #181818;
    }
    
    .button-download:hover {
        background: hsl(138, 29%, 57%);
    }

    .button-download:active {
        background: hsl(138, 69%, 30%);
    }



</style>