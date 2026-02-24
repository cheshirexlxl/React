import React from 'react'

const SkeletonCard = () => {
  return (
    <li className="todoItem skeleton-item">
        <div className="item">
            <div className="skeleton skeleton-circle"></div>
            <div className="skeleton skeleton-text"></div>
        </div>
        <div className="item">
            <div className="skeleton skeleton-btn"></div>
        </div>
    </li>
  )
}

export default SkeletonCard