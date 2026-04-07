<script lang="ts" setup>
import { ref, type InputHTMLAttributes } from 'vue';
import VisibilityOn from '@/assets/VisibilityOn.vue';
import VisibilityOff from '@/assets/VisibilityOff.vue';

const text = defineModel<string>();

interface TextInput extends /* @vue-ignore */ InputHTMLAttributes{}
defineProps<TextInput>();

const visible = ref<boolean>(false);

</script>
<template>
    <span>
        <div class="container">
            <label :for="`textinput_${$attrs.name as string}`" class="label">
                <slot></slot>
            </label>
            <span v-if="$attrs.type === 'password'" class="password_input">
                <input v-bind="$attrs" :type="visible ? 'text':'password'" v-model="text" :id="`text_input_${$attrs.name as string}`" autocomplete="off" >
                <VisibilityOn v-if="visible" class="icons" @click="visible=false" />
                <VisibilityOff v-else class="icons" @click="visible=true" />
            </span>
            <input type="text" v-bind="$attrs" v-model="text" :id="`textinput_${$attrs.name as string}`" v-else  autocomplete="off">
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

label {
    color: #fefefe;
}

input {
    background-color: #4f4f4f;
    color: #fefefe;
    outline: none;
    border: 0;
    font-size: medium;
    padding: 0.3em 1ch;
    flex: 1;
}

input:autofill, input:autofill:hover, input:autofill:focus {
    box-shadow: 0 0 0 400px inset #4f4f4f;
    -webkit-text-fill-color: #fefefe;
}

.password_input {
    display: flex;
    align-items: center;
}

.icons {
    position: relative;
    fill: #fefefe;
    right: 3ch;
}

</style>