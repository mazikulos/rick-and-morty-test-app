<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    name: 'ASelect',
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: String as PropType<string>,
            default: '',
        },
        options: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        initOption: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            required: false,
        },
    },
})
</script>

<template>
    <label
        v-if="placeholder"
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
        {{ placeholder }}
        {{ modelValue }}
    </label>
    <div class="relative">
        <select
            @change="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
            class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
        >
            <option v-if="initOption" value="">{{ initOption }}</option>
            <option
                v-for="(option, oIdx) in options"
                :selected="option === modelValue"
                :value="option"
                :key="oIdx"
            >
                {{ option }}
            </option>
        </select>
        <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
            <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
            </svg>
        </div>
    </div>
</template>
