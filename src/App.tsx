// import { useContext, useEffect, useState } from 'react'
import './App.css'
// import Header from './components/layouts/headers/Header'
// import { viewStore } from './context/store';
// import { viewSlice } from './context/store';
function App() {
  // viewStore.subscribe(() => console.log(viewStore.getState()))
  // const { add, remove } = viewSlice.actions;
  return (
    <div className="App">
      {/* <button onClick={() => viewStore.dispatch(add(viewStore.getState()))}>add dialog</button>
      <button onClick={() => viewStore.dispatch(remove(viewStore.getState()))}>remove dialog</button> */}
      {/* {viewStore.getState().map((D: any, i: number) => (<D key={i} name={`Header ${i + 1}`} />))} */}
    </div>
  )
}

export default App
