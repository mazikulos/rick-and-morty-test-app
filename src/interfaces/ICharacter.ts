import { IPagination } from './IPagination'

export enum EStatus {
    Alive = 'alive',
    Dead = 'dead',
    Unknown = 'unknown',
}

export interface IQuery {
    name?: string
    status?: EStatus
}

interface ICharacterLocation {
    name: string
    url: string
}
interface ICharacterOrigin {
    name: string
    url: string
}

export interface ICharacter {
    id: number
    name: string
    status: EStatus
    species: string
    type: string
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
    origin: ICharacterOrigin
    location: ICharacterLocation
    image: string
    episode: string[]
    url: string
    created: string
}

export interface ICharacterList {
    list: ICharacter[]
}

export interface ICharactersResponse {
    info: IPagination
    results: ICharacter[]
}

export interface ICharacterState {
    list: ICharacter[]
    character: ICharacter | null
    isLoading: boolean
    pagination: IPagination | null
    statuses: typeof EStatus
    query: IQuery
}
