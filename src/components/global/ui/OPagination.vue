<script lang="ts">
import { defineComponent } from 'vue'
import { IPagination } from '@/interfaces/IPagination'
import AButton from './AButton.vue'

export default defineComponent({
    components: { AButton },
    name: 'OPagination',
    props: {
        pagination: {
            type: Object as () => IPagination,
            required: true,
        },
    },
    setup: (props, { emit }) => {
        function onPageChange(page: number, event?: Event) {
            if (event?.type === 'keyup') {
                const targetElement = event.target as HTMLElement
                targetElement.blur()
                return
            }

            if (page < 1) {
                page = 1
            }
            if (props.pagination.pages && +page > props.pagination?.pages) {
                page = props.pagination.pages
            }

            emit('onPageChange', page)
        }

        return {
            onPageChange
        }
    },
})
</script>

<template>
    <nav class="flex justify-center">
        <ul class="list-style-none flex items-center gap-3">
            <li>
                <span
                    class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
                    :class="[
                        { disabled: !pagination.prev },
                        { 'cursor-pointer': pagination.prev },
                        { 'pointer-events-none': !pagination.prev },
                    ]"
                    @click="onPageChange(pagination.currentPage - 1)"
                    >Previous</span
                >
            </li>
            <a-input
                :inputClass="'w-16 text-center'"
                :modelValue="pagination.currentPage.toString()"
                :onlyNumbers="true"
                @onChange="onPageChange($event.target.value, $event)"
            />
            <li
                v-if="pagination.pages"
                class="text-neutral-500 cursor-pointer"
                @click="onPageChange(pagination.pages)"
            >
                /
                {{ pagination.pages }}
            </li>
            <li>
                <span
                    class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 "
                    :class="[
                        { disabled: !pagination.next },
                        { 'cursor-pointer': pagination.next },
                        { 'pointer-events-none': !pagination.next },
                    ]"
                    @click="onPageChange(pagination.currentPage + 1)"
                    >Next</span
                >
            </li>
        </ul>
    </nav>
</template>
