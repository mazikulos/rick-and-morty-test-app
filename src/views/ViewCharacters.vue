<script lang="ts">
import { onMounted, defineComponent, watch } from 'vue'
import { useCharactersStore } from '@/stores/characters'
import { useRouter } from 'vue-router'
import CharactersList from '@/components/characters/CharactersList.vue'
import { debounce } from 'lodash'

const characters = useCharactersStore()

export default defineComponent({
    name: 'ViewCharacters',
    components: {
        CharactersList,
    },
    setup() {
        const router = useRouter()

        onMounted(() => {
            characters.fetchCharacters()
        })

        function changePage(page: number) {
            if (!characters.pagination) return
            characters.pagination.currentPage = page
            characters.fetchCharacters()
        }

        function goToCharacter(id: number) {
            router.push({ name: 'character', params: { id: id.toString() } })
        }

        const debouncedSearch = debounce(()=> {
            characters.fetchCharacters()
        }, 500)

        watch(
            () => characters.query,
            () => {
                if (characters.pagination) characters.pagination.currentPage = 1
                if (Object.values(characters.query).every((v) => !v)) {
                    characters.fetchCharacters()
                } else {
                    debouncedSearch()
                }
            }, {
                deep: true,
                immediate: false,
            }
        )

        return {
            characters,
            changePage,
            goToCharacter,
        }
    },
})
</script>

<template>
    <main>
        <form @submit.prevent class="w-full mb-6 flex flex-col">
            <div class="flex flex-wrap -mx-3 gap-3 md:gap-0">
                <div class="w-full md:w-1/2 px-3">
                    <a-input
                        :inputClass="'w-full'"
                        placeholder="Name"
                        v-model="characters.query.name"
                    />
                </div>

                <div class="w-full md:w-1/2 px-3">
                    <a-select
                        placeholder="Status"
                        :options="characters.statusOptions"
                        :initOption="'any'"
                        v-model="characters.query.status"
                    />
                </div>
            </div>
            <p
                class="ml-auto text-red-500 text-xs mt-3 cursor-pointer underline"
                v-if="characters.query.name || characters.query.status"
                @click="characters.resetQuery()"
            >
                Reset form
            </p>
        </form>

        <div v-if="characters.isLoading">Loading...</div>
        <div v-else-if="!characters.list.length">No results</div>
        <div v-else>
            <characters-list
                :list="characters.list"
                @onClick="goToCharacter($event)"
            ></characters-list>
            <o-pagination
                v-if="characters.pagination"
                class="ml-auto my-6"
                :pagination="characters.pagination"
                @onPageChange="changePage($event)"
            ></o-pagination>
        </div>
    </main>
</template>
