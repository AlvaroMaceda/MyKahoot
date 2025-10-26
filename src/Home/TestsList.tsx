import TestItem from "./TestItem"

function TestList() {
  const tests = [
    { id: '1', name: 'Test de Matemáticas' },
    { id: '2', name: 'Test de Historia' },
    { id: '3', name: 'Test de Bananas' },
  ]


  return (
    <div>
      <h3 className="existing-tests-label">Haz uno de los tests ya existentes</h3>
      <div className="tests-list">
        {tests.map(test => <TestItem key={test.id} id={test.id} name={test.name} />)}
      </div>
    </div>
  )
}


export default TestList
