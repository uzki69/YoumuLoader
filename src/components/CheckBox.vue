<script lang="ts" setup>
import SmallCheck from '@/assets/SmallCheck.vue'

const checked = defineModel<boolean>();  

</script>

<template>
    <span @click="checked=!checked">
        <div>
            <SmallCheck v-if="checked" class="check_small"/>
        </div>
        <slot></slot>
    </span>
</template>

<style scoped>

span {
    display: flex;
    color: #fefefe;
    column-gap: 8px;
}

div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.4em;
    height: 1.4em;
    background-color: white;
    box-shadow: 0px 0px 1px 1px #121212;
}
.check_small {
    fill: black;
    width: 90%;
    height: 90%;
}

</style>