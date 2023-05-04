<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useCharactersStore } from '@/stores/characters'
import { useRoute } from 'vue-router'
import CharacterStatus from '@/components/characters/CharacterStatus.vue'

const characters = useCharactersStore()

export default defineComponent({
    name: 'ViewCharacter',
    components: {
        CharacterStatus,
    },
    setup() {
        const route = useRoute()

        onMounted(() => {
            characters.fetchCharacter(+route.params.id)
        })

        const character = computed(() => characters.character)

        const description = computed(() => {
            if (!character.value) return
            const c = character.value
            return `
            This is ${c.name} from Rick and Morty's series.
            This character is currently ${c.status} and has appeared in ${c.episode.length} ${
                c.episode.length === 1 ? 'episode' : 'episodes'
            }. They belong to the species of ${c.species} and originate from ${
                c.origin.name
            }. Their current location is the ${c.location.name}.
            `
        })

        return {
            characters,
            character,
            description,
        }
    },
})
</script>

<template>
    <div>
        <router-link :to="{ name: 'characters' }">
            <a-button @click="$router.go(-1)"> Go back </a-button>
        </router-link>

        <div v-if="characters.isLoading">Loading...</div>
        <div v-else-if="!character">Not found</div>
        <div v-else>
            <div
                class="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-5"
            >
                <div class="flex border-b border-gray-200 mb-5 justify-between items-center pb-3">
                    <character-status :status="character.status" />
                    <p class="mb-0 font-normal text-gray-700 dark:text-gray-400">
                        created at: {{ character.created.slice(0, 10) }}
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <figure class="col-span-1 flex items-center justify-center">
                        <img class="object-cover rounded bg-center" :src="character.image" />
                    </figure>
                    <div class="flex flex-col p-4 leading-normal col-span-1 md:col-span-2">
                        <h5
                            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        >
                            {{ character.name }}
                        </h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>

            <div
                class="mt-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-5"
            >
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Details
                </h5>
                <!-- todo: make component -->
                <div class="divide-y divide-slate-200">
                    <div class="py-1 flex justify-between">
                        <span>Status:</span> {{ character.status }}
                    </div>
                    <div class="py-1 flex justify-between">
                        <span>Gender:</span> {{ character.gender }}
                    </div>
                    <div class="py-1 flex justify-between">
                        <span>Episodes:</span> {{ character.episode.length }}
                    </div>
                    <div class="py-1 flex justify-between">
                        <span>Species:</span> {{ character.species }}
                    </div>
                    <div class="py-1 flex justify-between">
                        <span>Origin:</span> {{ character.origin.name }}
                    </div>
                    <div class="py-1 flex justify-between">
                        <span>Location:</span> {{ character.location.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
