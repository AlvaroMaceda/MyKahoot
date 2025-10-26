type QuizListItemProps = {
  id: string,
  name: string,
  onDownload?: () => void,
  onDelete?: () => void,
}

function QuizListItem({ name, onDownload, onDelete }: QuizListItemProps) {
  return (
    <div className="test-card">
      <span className="test-name">{name}</span>
      <div className="test-actions">
        <button className="download-btn" onClick={onDownload}>descargar</button>
        <button className="delete-btn" onClick={onDelete}>x</button>
      </div>
    </div>
  )
}

export default QuizListItem
