<script lang="ts">
import { defineComponent } from 'vue'
import { IListItem } from '@/interfaces/IList'
import CharacterStatus from '@/components/characters/CharacterStatus.vue'

export default defineComponent({
    name: 'CharactersList',
    props: {
        list: {
            type: Array as () => IListItem[],
            required: true,
        },
    },
    components: {
        CharacterStatus,
    },
})
</script>

<template>
    <ul role="list" class="divide-y divide-gray-100">
        <li
            class="flex justify-between gap-x-6 py-5 cursor-pointer items-center w-full"
            v-for="item in list"
            :key="item.id"
            @click="$emit('onClick', item.id)"
        >
            <div class="flex gap-x-4 w-full">
                <img class="h-20 w-20 flex-none rounded-full bg-gray-50" :src="item.image" />
                <div class="min-w-0 w-full gap-2 flex-auto self-center items-start flex flex-col sm:flex-row sm:items-center justify-between">
                    <p class="text-lg font-semibold leading-6 text-gray-900">
                        {{ item.name }}
                    </p>
                    <character-status :status="item.status ? item.status : 'unknown'" />
                </div>
            </div>
        </li>
    </ul>
</template>
