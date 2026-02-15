import * as mm from 'music-metadata'
import type { BasicTags, FullTags } from './types.js'

interface CommentData {
    structure?: string
    quadre?: string
}

const formatGenres = (genres: string[] | undefined): string[] | undefined => {
    if (!genres) return

    const flatmapped = genres.flatMap(g =>
        g.split(',').map(subG => subG.trim().toLowerCase()),
    )

    const unique = [...new Set(flatmapped)].sort()
    return unique
}
const parseComment = (comment: { text?: string }[] | undefined): CommentData => {
    if (!comment || comment.length === 0) return {}
    const text = comment[0].text
    if (!text) return {}
    try {
        const json = JSON.parse(text)
        return {
            structure: json.structure,
            quadre: json.quadre
        }
    } catch {
        return {}
    }
}

export async function readBasicTags(
    filepath: string,
): Promise<Partial<BasicTags>> {
    const metadata = await mm.parseFile(filepath)
    const tags = metadata.common

    return {
        title: tags.title,
        artist: tags.artist,
        duration: metadata.format.duration,
    }
}

export async function readTags(filepath: string): Promise<Partial<FullTags>> {
    const metadata = await mm.parseFile(filepath)
    const tags = metadata.common
    const { structure, quadre } = parseComment(tags.comment)

    return {
        title: tags.title,
        artist: tags.artist,
        duration: metadata.format.duration,

        genre: formatGenres(tags.genre),
        bpm: tags.bpm,
        structure: structure,
        quadre: quadre,
    }
}
