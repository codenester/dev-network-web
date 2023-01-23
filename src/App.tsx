// import { useContext, useEffect, useState } from 'react'
import { FC } from 'react';
import './App.css'
import Header from './components/layouts/headers/Header'
import { viewSlice, viewStore } from './store'
import { useDispatch, useSelector, useStore } from 'react-redux';
function App() {
  // viewStore.subscribe(() => console.log(viewStore.getState()))
  // const store = useStore()
  const selector = useSelector((state: { dialogs: FC<{ name?: string }>[] }) => state.dialogs)
  const { add, remove } = viewSlice.actions;
  return (
    <div className="App">
      <button onClick={() => viewStore.dispatch(add(Header))}>add dialog</button>
      <button onClick={() => viewStore.dispatch(remove())}>remove dialog</button>
      {selector.map((S, i: number) => (<S key={i} name={`header ${i + 1}`} />))}
    </div>
  )
}

export default App
