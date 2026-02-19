import React from 'react'

const Header = () => {
  return (
    <header style={ styles.header }>
        <h2>쇼핑몰 사이트</h2>
    </header>
  )
}
// 스타일을 객체로 정의하여 적용하기
const styles = {
    header: {
        padding : "20px",
        backgroundColor : "cornflowerblue",
        color : "white"
    }
}

export default Header