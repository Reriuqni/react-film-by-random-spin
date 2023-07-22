import { Movie } from "@/app/logics/types"

interface FilmCardActionType {
    movie: Movie | null
}

export const FilmCardAction = ({ movie }: FilmCardActionType) => {
    return <>
        {movie && JSON.stringify(movie, null, 2)}
    </>
}