import './UploadQuiz.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

import Modal from '../../components/Modal'
import { setLoading, setError, setPreviewQuiz } from '../../redux/quizSlice'

import parseCSVQuiz from '../../lib/parse_quiz'

function UploadQuiz() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [showHelp, setShowHelp] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    setFileName(file ? file.name : "")
  }

  function handleProcessClick() {
    if (selectedFile) {
      const reader = new FileReader()
      dispatch(setLoading(true))
      try {
        reader.onload = async (event) => {
          try {
            const content = event.target?.result
            // Parse CSV quiz content
            const parsedQuiz = parseCSVQuiz(content as string)
            dispatch(setPreviewQuiz(parsedQuiz))
            navigate('/preview', { state: { csvContent: content } })
          } catch (error) {
            dispatch(setError(`Error parsing CSV file: ${error}`))
          } finally {
            dispatch(setLoading(false))
          }
        }
        reader.readAsText(selectedFile)

      } catch (error) {
        dispatch(setError(`Error parsing CSV file: ${error}`))

      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  return (
    <div id='upload-quiz-container'>
      <h2 className='csv-label'>Sube un fichero CSV</h2>
      <div className='upload'>
        <input
          id='csv-input-hidden'
          type='file'
          accept='.csv'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor='csv-input-hidden' className='csv-input-label'>
          {fileName ? `Archivo: ${fileName}` : 'Selecciona un archivo...'}
        </label>
        <button className='process-btn' onClick={handleProcessClick}>Procesar</button>
        <button className='help-btn' onClick={() => setShowHelp(true)}>formato</button>
      </div>
      <Modal open={showHelp} onClose={() => setShowHelp(false)}>
        <div className='help-text'>
          <h3>Formato del fichero CSV</h3>
          <p>El formato es un CSV separado por comas, con comillas dobles, con las siguientes columnas. La primera línea será el título:</p>
          <pre>
            Título del test{'\n'}
            pregunta, respuesta_correcta, respuesta_incorrecta, respuesta_incorrecta, ...{'\n'}
          </pre>
          <p>Ejemplo:</p>
          <pre>
            Test de Geografía y Ciencia{'\n'}
            "¿Cuál es la capital de Francia?", "París", "Londres", "Berlín", "Madrid"{'\n'}
            "¿Cuánto es 2 + 2?","4","3","5","22","55","18"
          </pre>
          <ul>
            <li>La primera línea contiene el título del test</li>
            <li>Cada línea siguiente representa una pregunta</li>
            <li>La primera columna es el texto de la pregunta</li>
            <li>La segunda columna es la respuesta correcta</li>
            <li>Las columnas siguientes son las respuestas incorrectas (al menos una)</li>
            <li>Las comillas dobles son obligatorias para textos que contienen comas</li>
            <li>No debes dejar espacios alrededor de las comas que separan las preguntas</li>
          </ul>
        </div>
      </Modal>
    </div>
  )
}

export default UploadQuiz
