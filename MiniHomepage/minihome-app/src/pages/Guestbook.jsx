import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/common/Layout'
import GuestbookForm from '../components/Guestbook/GuestbookForm'
import GuestbookList from '../components/Guestbook/GuestbookList'
import * as auth from '../apis/auth'
import * as Swal from '../apis/alert'
import useOwner from '../hooks/useOwner'

const PAGE_SIZE = 10

const Guestbook = () => {
  const { owner } = useOwner()
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchList = async (currentPage = 1) => {
    if (!owner) return
    try {
      const response = await auth.getGuestbook(owner.id, currentPage, PAGE_SIZE)
      const data = response.data
      if (currentPage === 1) {
        setList(data)
      } else {
        setList(prev => [...prev, ...data])
      }
      setHasMore(data.length === PAGE_SIZE)
    } catch (e) {
      Swal.alert('오류', '방명록을 불러오지 못했습니다.', 'error')
    }
  }

  useEffect(() => {
    if (owner) fetchList(1)
  }, [owner])

  const handleCreate = async (form) => {
    try {
      await auth.createGuestbook({ ...form, ownerId: owner.id })
      Swal.alert('등록 완료', '방명록이 등록되었습니다.', 'success', () => {
        setPage(1)
        fetchList(1)
      })
    } catch (e) {
      Swal.alert('오류', '방명록 등록에 실패했습니다.', 'error')
    }
  }

  const handleDelete = async (id, password) => {
    try {
      await auth.deleteGuestbook(id, password)
      setList(prev => prev.filter(item => item.id !== id))
    } catch (e) {
      Swal.alert('삭제 실패', '비밀번호가 올바르지 않습니다.', 'error')
    }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchList(nextPage)
  }

  return (
    <Layout>
      <div className="container-sm py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">방명록</h2>
        <GuestbookForm onCreate={handleCreate} />
        <GuestbookList list={list} onDelete={handleDelete} />
        {hasMore && (
          <div className="text-center mt-6">
            <button
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={handleLoadMore}
            >
              더보기
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Guestbook