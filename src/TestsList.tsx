
function TestList() {
  const tests = [
    { id: 1, name: 'Test de Matemáticas' },
    { id: 2, name: 'Test de Historia' },
    { id: 3, name: 'Test de Bananas' },
  ]


  return (
    <div>
      <h3 className="existing-tests-label">Haz uno de los tests ya existentes</h3>
      <div className="tests-list">
        {tests.map(test => (
          <div className="test-card" key={test.id}>
            <span className="test-name">{test.name}</span>
            <div className="test-actions">
              <button className="download-btn">descargar</button>
              <button className="delete-btn">x</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default TestList
