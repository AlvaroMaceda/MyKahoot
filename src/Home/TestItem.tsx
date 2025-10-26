type TestItemProps = {
  id: string,
  name: string,
  onDownload?: () => void,
  onDelete?: () => void,
}

function TestItem({ name, onDownload, onDelete }: TestItemProps) {
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

export default TestItem
