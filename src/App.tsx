import { FC } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Header from './components/layouts/headers/Header'
import { dialogSlice, store } from './store'
function App() {
  const dialogs = useSelector((state: { dialogs: FC<{ name?: string }>[] }) => state.dialogs)
  const { add, remove } = dialogSlice.actions;
  return (
    <div className="App">
      <button onClick={() => store.dispatch(add(Header))}>add dialog</button>
      <button onClick={() => store.dispatch(remove())}>remove dialog</button>
      {dialogs.map((D, i) => (<D key={i} name={`header ${i + 1}`} />))}
    </div>
  )
}

export default App
