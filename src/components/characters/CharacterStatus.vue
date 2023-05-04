<script lang="ts">
import { defineComponent, computed } from 'vue'
import { EStatus } from '@/interfaces/ICharacter'

export default defineComponent({
    name: 'CharacterStatus',
    props: {
        status: {
            type: String as () => EStatus | string,
            required: true,
        },
    },
    setup: props => {
        const statusClass = computed(() => {
            switch (props.status.toLowerCase()) {
                case EStatus.Dead:
                    return 'bg-red-100 text-red-800'
                case EStatus.Alive:
                    return 'bg-green-100 text-green-800'
                case EStatus.Unknown:
                    return 'bg-yellow-100 text-yellow-800'
                default:
                    return ''
            }
        })

        return {
            statusClass,
        }
    },
})
</script>

<template>
    <span class="text-xs font-medium mr-2 px-2.5 py-1.5 rounded" :class="[statusClass]">{{
        status.toUpperCase()
    }}</span>
</template>
