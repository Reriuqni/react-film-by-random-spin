import { useEffect, useState } from "react"
import { Movie } from "../types"
import { useFetch } from "./useFetch"

export const useSpin = () => {
    const { data } = useFetch<any>('./movies_list.json')

    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        data && setMovies(data?.movies_list || [])
    }, [data])

    return {
        movies
    }
}