import React, { useEffect, useRef } from 'react'
import Card from './Card'
import SkeletonCard from './SkeletonCard'

const List = ({ todoList, onToggle, onRemove, loading }) => {

  // 🔗 스크롤 컨테이너 참고
  const todoListRef = useRef(null)
  const prevScrollTop = useRef(0) // 이전 스크롤 위치 저장

  // ✨ 스크롤 이벤트 핸들러
  const handleScroll = () => {

    const { scrollHeight, scrollTop, clientHeight } = todoListRef.current

    // 이전 스크롤보다 현재 스크롤 위치가 더 크면, 스크롤 아래 ⬇
    const isScrollDown = scrollTop > prevScrollTop.current
    // 이전 스크롤 위치 업데이트
    prevScrollTop.current = scrollTop

    // 스크롤 맨 마지막 도달
    if( isScrollDown && clientHeight + scrollTop >= scrollHeight - 1 ) {
      alert('스크롤 맨 마지막 입니다.')
    }
  }

  useEffect(() => {
    const todoListElement = todoListRef.current
    // 스크롤 이벤트 등록
    if( todoListElement ) {
      todoListElement.addEventListener('scroll', handleScroll) 
    }
    return () => {
      // 스크롤 이벤트 제거
      if( todoListElement ) {
        todoListElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (   
    <div className='todoList' ref={todoListRef}>
      {
        loading
        ? 
        (
          // 마운팅 전 - 스켈레톤 카드 3개
          <ul className="initial-list">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </ul>
        )
        :
        todoList.length > 0 
        ? 
        (      
          // 데이터가 있을 때
          <ul className="initial-list">
            {
              todoList.map((todo) => (
                <Card 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={onToggle} 
                  onRemove={onRemove}
                />
              ))
            }
          </ul>
        )  
        :
        (    
          // 데이터가 없을 때 표시
          <div className="empty-state">
            <div className="empty-message">
              <h3>할 일이 없습니다.</h3>
              <p>새로운 할 일을 추가해보세요!</p>
            </div>
          </div>   
        )
      }
    </div>
  )
}

export default List