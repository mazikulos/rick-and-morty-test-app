import { defineStore } from 'pinia'
import { EStatus, ICharactersResponse, ICharacter, ICharacterState } from '@/interfaces/ICharacter'
import axios from 'axios'

const axiosIns = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
})

export const useCharactersStore = defineStore('characters', {
    state: (): ICharacterState => ({
        list: [],
        character: null,
        isLoading: false,
        pagination: null,
        statuses: EStatus,
        query: {
            name: undefined,
            status: undefined,
        },
    }),
    getters: {
        statusOptions() {
            return Object.values(EStatus)
        },
    },
    actions: {
        async fetchCharacters(): Promise<void> {
            try {
                this.isLoading = true
                const { data } = await axiosIns<ICharactersResponse>('character', {
                    params: {
                        ...this.query,
                        page: this.pagination?.currentPage || 1,
                    },
                })
                this.list = data.results
                this.setPagination(data.info)
            } catch (error) {
                console.log(error)
                this.list = []
            } finally {
                this.isLoading = false
            }
        },
        async fetchCharacter(id: number): Promise<void> {
            try {
                this.isLoading = true
                const { data } = await axiosIns<ICharacter>(`/character/${id}`)
                this.character = data
            } catch (error) {
                console.log(error)
                this.character = null
            } finally {
                this.isLoading = false
            }
        },
        setPagination(pagination: ICharactersResponse['info']): void {
            let currentPage = 1
            if (pagination.next) {
                const url = new URL(pagination.next)
                currentPage = Number(url.searchParams.get('page')) - 1
            } else if (pagination.prev) {
                const url = new URL(pagination.prev)
                currentPage = Number(url.searchParams.get('page')) + 1
            }
            this.pagination = {
                ...pagination,
                currentPage,
            }
        },
        resetQuery(): void {
            if (this.pagination) this.pagination.currentPage = 1
            this.query = {
                name: undefined,
                status: undefined,
            }
        },
    },
})
