import React, { Component } from 'react';

class LifecycleClass extends Component {
  constructor(props) {
    super(props);
    console.log('constructor: 컴포넌트가 생성 중입니다.');
    
    // 🧊 state 초기화
    this.state = {
      data: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps: nextProps와 prevState를 받습니다. 상태를 업데이트하려면 객체를 반환하고, 그렇지 않으면 null을 반환합니다.');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount: 컴포넌트가 DOM에 마운트되었습니다.');
    // 비동기 작업, 데이터 가져오기 등을 수행합니다.
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate: 컴포넌트가 다시 렌더링되기 전에 호출됩니다. 불리언 값을 반환합니다.');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate: 가상 DOM에서 실제 DOM으로 변경 사항이 반영되기 전에 호출됩니다.');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate: 컴포넌트가 DOM에서 업데이트된 후에 호출됩니다.');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: 컴포넌트가 DOM에서 제거되기 전에 호출됩니다.');
  }

  fetchData() {
    // 비동기 작업을 시뮬레이션합니다.
    setTimeout(() => {
      console.log('데이터를 성공적으로 가져왔습니다!');
      this.setState({ data: '가져온 데이터' });
    }, 2000);
  }

  render() {
    console.log('render: 컴포넌트를 렌더링 중입니다.');
    return (
      <div>
        <h1>컴포넌트 생명주기 예제</h1>
        <p>데이터: {this.state.data}</p>
      </div>
    );
  }
}

export default LifecycleClass;