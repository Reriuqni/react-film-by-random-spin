import { useEffect, useState } from "react"

interface State<T> {
    data?: T,
    error?: Error,
    loading?: boolean,
}

export const useFetch = <T = unknown>(url: string): State<T> => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(_ => _.json())
            .then(_ => setData(_))
            .catch(_ => setError(_))
            .finally(() => setLoading(false))
    }, [url])

    return {
        data,
        error,
        loading,
    }
}