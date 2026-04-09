import React from 'react'
import GuestbookItem from './GuestbookItem'

const GuestbookList = ({ list, totalCount, onDelete }) => {
    if (!list || list.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm text-center py-15 text-gray-400">
                <p className="text-4xl mb-4">📝</p>
                <p>아직 방명록이 없습니다.</p>
                <p className="text-sm mt-2">첫 방명록을 남겨주세요!</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className='text-gray-400 text-sm'>TOTAL. <span className='text-lg text-primary font-bold'>{totalCount}</span></div>
            {list.map(item => (
                <GuestbookItem key={item.id} item={item} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default GuestbookList