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
        setQuery(field: keyof typeof this.query, value: string): void {
            if (this.pagination) this.pagination.currentPage = 1

            if (field in this.query) {
                if (field === 'status') {
                    const enumValues = Object.values(EStatus) as string[]
                    if (enumValues.includes(value)) {
                        this.query[field] = value as EStatus
                    } else {
                        this.query[field] = undefined
                    }
                } else {
                    this.query[field] = value || undefined
                }
            }

            this.fetchCharacters()
        },

        setQueryStatus(value: string): void {
            console.log(value)
        },
        resetQuery(): void {
            if (this.pagination) this.pagination.currentPage = 1

            this.query = {
                name: undefined,
                status: undefined,
            }

            this.fetchCharacters()
        },
    },
})
