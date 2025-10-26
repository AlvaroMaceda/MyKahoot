import './App.css'

function App() {

  return (
    <div className="container">
      <h2 className="csv-label">Sube un fichero CSV:</h2>
      <input type="file" accept=".csv" className="csv-input" />

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
  );
}

const tests = [
  { id: 1, name: 'Test de patatas' },
  { id: 2, name: 'Test de chorizos' },
  { id: 3, name: 'Test de Bacalaos' },
];

export default App;
