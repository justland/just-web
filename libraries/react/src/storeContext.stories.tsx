
import { createStore } from '@just-web/states'
import Modal from 'react-modal'
import { createStoreContext, useStoreContext } from '.'

export default {}

// https://leewarrick.com/blog/the-problem-with-context/
const CounterContext = createStoreContext<{ counter: number, message: string }>()

const AppProvider = (props) => {
  const store = createStore({ counter: 0, message: 'hello from context inside' })
  return <CounterContext.Provider value={store}  {...props} />
}

const CounterDisplay = () => {
  const [counter] = useStoreContext(CounterContext, s => s.counter)
  return <div>{counter}</div>
}

const CounterIncrement = () => {
  const [counter, setValue] = useStoreContext(
    CounterContext,
    s => s.counter,
    (s, v) => { s.counter = v }
  )
  return <>
    <div>counter value within increment component: {counter}</div>
    <button onClick={() => setValue(counter + 1)}>Invoke setValue</button>
  </>
}

function Message() {
  const [message] = useStoreContext(CounterContext, s => s.message)
  // the text will render to a random color for
  // each instance of the Message component
  const getColor = () => (Math.floor(Math.random() * 255))
  const style = {
    color: `rgb(${getColor()},${getColor()},${getColor()})`
  }
  return (
    <div>
      <h4 style={style}>{message}</h4>
    </div>
  )
}

export const UseContext = () => {
  return <div>
    <AppProvider>
      <h2>No renders! 😆</h2>
      <Message />
      <Message />
      <Message />
      <CounterDisplay />
      <CounterIncrement />
    </AppProvider>
  </div>
}

const ModalContext = createStoreContext<{ showModal: boolean }>()

const ModalApp = (props) => {
  const store = createStore({ showModal: false })
  return <ModalContext.Provider value={store} {...props} />
}

const SomeModal = () => {
  const [showModal, setShowModal] = useStoreContext(ModalContext, s => s.showModal, (s, v) => { s.showModal = v })
  return <>
    <div>After opening the modal, move away to another story. When you come back, the modal is no longer opened.</div>
    <button onClick={() => setShowModal(true)}>open modal</button>
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
      <div>I am a modal</div>
    </Modal>
  </>
}

export const SelfContainedModal = () => {
  return <ModalApp>
    <SomeModal />
  </ModalApp>
}
