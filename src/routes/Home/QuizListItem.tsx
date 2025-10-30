import './QuizListItem.css'

import type { TestId } from '../../types/quiz'

type QuizListItemProps = {
  id: TestId,
  name: string,
  onStart?: (id: TestId) => void,
  onDownload?: (id: TestId) => void,
  onDelete?: (id: TestId) => void,
}

function QuizListItem({ id, name, onStart, onDownload, onDelete }: QuizListItemProps) {
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
      <span className='test-name'>{name}</span>
      <div className='test-actions'>
        <button className='download-btn' onClick={handleDownloadClick}>descargar</button>
        <button className='delete-btn' onClick={handleDeleteClick}>x</button>
      </div>
    </div>
  )
}

export default QuizListItem
