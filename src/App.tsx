// import { useContext, useEffect, useState } from 'react'
// import { FC } from 'react';
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Header from './components/layouts/headers/Header'
import { viewSlice, viewStore } from './store'
function App() {
  const dialogs = useSelector((state: { dialogs: FC<{ name?: string }>[] }) => state.dialogs)
  const { add, remove } = viewSlice.actions;
  return (
    <div className="App">
      <button onClick={() => viewStore.dispatch(add(Header))}>add dialog</button>
      <button onClick={() => viewStore.dispatch(remove())}>remove dialog</button>
      {dialogs.map((D, i) => (<D key={i} name={`header ${i + 1}`} />))}
    </div>
  )
}

export default App
