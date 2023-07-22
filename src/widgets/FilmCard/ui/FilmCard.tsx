import { Movie } from "@/app/logics/types"

export interface FilmCardType {
    movie: Movie | null,
}

export const FilmCard = ({ movie }: FilmCardType) => {
    return <>
        {movie && JSON.stringify(movie, null, 2)}
    </>
}