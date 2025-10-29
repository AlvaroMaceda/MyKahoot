import './Loading.css'

function Loading({visible}: {visible: boolean}) {
  if (!visible) return null
  return (
    <div className='loading-overlay'>
      <div className='loading-spinner'>Loading...</div>
    </div>
  )
}

export default Loading
