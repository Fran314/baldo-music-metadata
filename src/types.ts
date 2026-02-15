export interface BasicTags {
    title: string
    artist: string
    duration: number
}

export interface FullTags extends BasicTags {
    genre: string[]
    bpm: number
    structure: string
    quadre: string
}

export const isBasicTags = (tags: Partial<BasicTags>): tags is BasicTags => {
    if (typeof tags.title !== 'string') return false
    if (typeof tags.artist !== 'string') return false
    if (typeof tags.duration !== 'number') return false
    return true
}
export const basicTagsWithDefaults = (tags: Partial<BasicTags>): BasicTags => {
    return {
        title: tags.title ?? 'Unknown Title',
        artist: tags.artist ?? 'Unknown Artist',
        duration: tags.duration ?? 0,
    }
}

export const isFullTags = (tags: Partial<FullTags>): tags is FullTags => {
    if (!isBasicTags(tags as Partial<BasicTags>)) return false

    if (!Array.isArray(tags.genre)) return false
    if (tags.genre.some(g => typeof g !== 'string')) return false

    if (typeof tags.bpm !== 'number') return false
    if (typeof tags.structure !== 'string') return false
    if (typeof tags.quadre !== 'string') return false

    return true
}
export const fullTagsWithDefaults = (tags: Partial<FullTags>): FullTags => {
    return {
        ...basicTagsWithDefaults(tags),

        genre: tags.genre ?? [],
        bpm: tags.bpm ?? 0,
        structure: tags.structure ?? '',
        quadre: tags.quadre ?? '',
    }
}
