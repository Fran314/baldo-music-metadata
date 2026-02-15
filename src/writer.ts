import NodeID3 from 'node-id3'
import type { FullTags } from './types.js'

export async function writeTags(
    filepath: string,
    tags: FullTags,
): Promise<boolean> {
    const id3Tags: NodeID3.Tags = {
        title: tags.title,
        artist: tags.artist,

        genre: tags.genre.join(', '),
        bpm: String(tags.bpm),
        comment: {
            language: 'eng',
            text: JSON.stringify({
                structure: tags.structure,
                quadre: tags.quadre,
            }),
        },
    }

    return await NodeID3.Promise.write(id3Tags, filepath)
}
