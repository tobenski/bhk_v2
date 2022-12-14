import useSWR from 'swr'
import { baseApi } from '../Utils/api'

const useNews = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`${baseApi}newspost`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default useNews
