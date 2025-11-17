import './QuizListItem.css'

import type { TestId } from '../../types/quiz'

type QuizListItemProps = {
  id: TestId,
  name: string,
  order: number,
  onStart?: (id: TestId) => void,
  onDownload?: (id: TestId) => void,
  onDelete?: (id: TestId) => void,
  onMoveUp?: () => void,
  onMoveDown?: () => void,
}

function QuizListItem({ id, name, order, onStart, onDownload, onDelete, onMoveUp, onMoveDown }: QuizListItemProps) {
  function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation()
    onDelete?.(id)
  }

  function handleDownloadClick(e: React.MouseEvent) {
    e.stopPropagation()
    onDownload?.(id)
  }

  return (
    <div className='test-card' onClick={() => onStart?.(id)}>
      <span className='test-name'>{name} <small>(orden: {order})</small></span>
      <div className='test-actions'>
        <button className='download-btn' onClick={handleDownloadClick}>descargar</button>
        <button className='delete-btn' onClick={handleDeleteClick}>x</button>
        {onMoveUp && <button className='move-btn' onClick={e => { e.stopPropagation(); onMoveUp(); }}>↑</button>}
        {onMoveDown && <button className='move-btn' onClick={e => { e.stopPropagation(); onMoveDown(); }}>↓</button>}
      </div>
    </div>
  )
}

export default QuizListItem
