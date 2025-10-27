
function UploadQuiz() {
  return (
    <div>
      <h2 className="csv-label">Sube un fichero CSV:</h2>
      <input type="file" accept=".csv" className="csv-input" />
    </div>
  )
}

  export default UploadQuiz
