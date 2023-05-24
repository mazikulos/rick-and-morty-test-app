<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'AInput',
    emits: ['update:modelValue', 'onChange'],
    props: {
        modelValue: {
            type: String as PropType<string>,
            default: '',
        },
        inputClass: {
            type: String as PropType<string>,
            default: '',
        },
        placeholder: {
            type: String,
            required: false,
        },
        onlyNumbers: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        function allowOnlyNumbers(event: KeyboardEvent) {
            if (!props.onlyNumbers) return
            if (
                (event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                event.keyCode === 8 ||
                event.keyCode === 46 ||
                event.keyCode === 37 ||
                event.keyCode === 39
            ) {
                return
            } else {
                event.preventDefault()
            }
        }

        return {
            allowOnlyNumbers,
        }
    },
})
</script>

<template>
    <label
        v-if="placeholder"
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
        {{ placeholder }}
    </label>
    <input
        class="appearance-none block text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
        :class="[inputClass]"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @keydown="allowOnlyNumbers"
        @keyup.enter="$emit('onChange', $event)"
        @change.stop="$emit('onChange', $event)"
        @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
    />
</template>
