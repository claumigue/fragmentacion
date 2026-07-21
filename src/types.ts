export type Discipline = 'literatura' | 'cine' | 'musica' | 'visuales' | 'accent'

export interface TimelineEvent {
    id: string
    year: number
    discipline: Discipline
    emoji: string
    title: string
    creator: string
    desc: string
    quote: string
    cite: string
    tags: string[]
    link: string
}

export interface Connection {
    discipline: Discipline
    title: string
    desc: string
}
