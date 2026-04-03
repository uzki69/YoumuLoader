<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';

interface TextInput extends /* @vue-ignore */ InputHTMLAttributes{}
defineProps<TextInput>();

</script>
<template>
    <span>
        <div class="container">
            <label :for="`textinput_${$attrs.name as string}`" class="label">
                <slot></slot>
            </label>
            <input v-bind="$attrs" class="input"  :id="`textinput_${$attrs.name as string}`" type="text">
        </div>
    </span>
    </template>
<style scoped>
.container {
    display: flex;
    padding: 8px;
    column-gap: 16px;
    align-items: center;
}

.label {
    color: #fefefe;
}

.input {
    background-color: #4f4f4f;
    color: #fefefe;
    outline: none;
    border: 0;
    font-size: larger;
    padding: 0.3em 1ch;
    flex: 1;
}
.input:focus {
    box-shadow: 0px 1px #fefefe
}
</style>