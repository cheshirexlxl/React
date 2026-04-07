import React from 'react'
import GuestbookItem from './GuestbookItem'

const GuestbookList = ({ list, onDelete }) => {
  if (!list || list.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 text-sm">
        아직 방명록이 없습니다. 첫 번째 방명록을 남겨보세요!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {list.map(item => (
        <GuestbookItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default GuestbookList