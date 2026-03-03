import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { boardsApi } from '../apis/boards'

const useBoard = (id) => {

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['board', id],
    queryFn: () => boardsApi.select(id).then((res) => res.data),
    // !! : id 가 falsy(null, undefiend 등) 일 때, 실행하지 않도록
    // id: null, !id = !(false) = true, !(!id) = !(true) = false
    enabled: !!id, // id가 있을 때만 실행
  })

  return {
    board: data?.board ?? null,
    fileList: data?.fileList ?? [],
    isLoading,
    isError,
    error,
    refetch
  }
}

export default useBoard