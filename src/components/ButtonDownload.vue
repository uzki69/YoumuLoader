<script lang="ts" setup>
import { DownloadState } from '@/lib/type';
import { computed, type ButtonHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
    state?: DownloadState
}
const props = defineProps<Props>();

const color = computed(() => {
    if (!props.state) return 'normal_button_color';
    const maps: Record<DownloadState, string> = {
        [DownloadState.BAD]: 'bad_button_color',
        [DownloadState.GOOD]: 'good_button_color',
        [DownloadState.WAITING]: 'waiting_button_color',
        [DownloadState.NORMAL]: 'normal_button_color'
    };
    return maps[props.state];
});

</script>

<template>
    <!-- span to prevent parent class css -->
    <span>
        <button v-bind="$attrs" :class="color" >
            <slot></slot>
        </button>
    </span>
</template>

<style scoped>
button {
    background: hsl(138, 65%, 41%);
    color: #f0f0f0;
    border: 1px solid #181818;
    padding: 0.7em;
    text-shadow: 1px 1px 2px #181818;
}

.normal_button_color {
    background: hsl(138, 65%, 41%);
}

.normal_button_color:hover {
    background: hsl(138, 53%, 49%);
}

.normal_button_color:active {
    background: hsl(138, 65%, 39%);
}

.bad_button_color {
    background: #ee5511;
}

.waiting_button_color {
    background: #fecc00;
}

.good_button_color {
    background: #11ff87;
}
</style>