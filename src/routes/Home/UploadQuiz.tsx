import { useState } from "react";
import Modal from "../../components/Modal";
import './UploadQuiz.css';

function UploadQuiz() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div id="upload-quiz-container">
      <h2 className="csv-label">Sube un fichero CSV</h2>
      <div className="upload">
        <input type="file" accept=".csv" className="csv-input" />
        <button className='help-btn' onClick={() => setShowHelp(true)}>formato</button>
      </div>
      <Modal open={showHelp} onClose={() => setShowHelp(false)}>
        <div className="help-text">
          <h3>Formato del fichero CSV</h3>
          <p>El formato es un CSV separado por comas con las siguientes columnas:</p>
          <pre>
            pregunta, respuesta_correcta, respuesta_incorrecta, respuesta_incorrecta, ...{"\n"}
            "¿Cuál es la capital de Francia?", "París", "Londres", "Berlín", "Madrid"{"\n"}
            "¿Cuánto es 2 + 2?", "4", "3", "5", "22", "55", "18"
          </pre>
        </div>
      </Modal>
    </div>
  );
}

export default UploadQuiz
