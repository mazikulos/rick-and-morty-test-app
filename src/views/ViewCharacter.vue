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
            console.log(window.history)
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
    <main>
        <router-link :to="{ name: 'characters' }">
            <a-button @click="$router.go(-1)"> Go back </a-button>
        </router-link>

        <div v-if="characters.isLoading">Loading...</div>
        <div v-else-if="!character">Not found</div>
        <div v-else>
            <div
                class="flex flex-col bg-white border border-gray-200 rounded-lg shadow p-5"
            >
                <div class="flex border-b border-gray-200 mb-5 justify-between items-center pb-3">
                    <character-status :status="character.status" />
                    <p class="mb-0 font-normal text-gray-700 ">
                        created at: {{ character.created.slice(0, 10) }}
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <figure class="col-span-1 flex items-center justify-center">
                        <img class="object-cover rounded bg-center" :src="character.image" />
                    </figure>
                    <div class="flex flex-col p-4 leading-normal col-span-1 md:col-span-2">
                        <h5
                            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
                        >
                            {{ character.name }}
                        </h5>
                        <p class="mb-3 font-normal text-gray-700 ">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>

            <div
                class="mt-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow p-5"
            >
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    Details
                </h5>
                <!-- todo: make component -->
                <div class="divide-y divide-slate-200">
                    <div class="py-1 gap-x-2 flex justify-between">
                        <span>Status:</span>
                        <span class="text-right">{{ character.status }}</span>
                    </div>
                    <div class="py-1 gap-x-2 flex justify-between">
                        <span>Gender:</span>
                        <span class="text-right">{{ character.gender }}</span>
                    </div>
                    <div class="py-1 gap-x-2 flex justify-between">
                        <span>Episodes:</span>
                        <span class="text-right">{{ character.episode.length }}</span>
                    </div>
                    <div class="py-1 gap-x-2 flex justify-between">
                        <span>Species:</span>
                        <span class="text-right">{{ character.species }}</span>
                    </div>
                    <div class="py-1 gap-x-2 flex justify-between">
                        <span>Origin:</span>
                        <span class="text-right">{{ character.origin.name }}</span>
                    </div>
                    <div class="py-1 gap-x-2 flex justify-between">
                        <span>Location:</span>
                        <span class="text-right">{{ character.location.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
