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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
  }

  function handleProcessClick() {
    if (selectedFile) {
      const reader = new FileReader()
      dispatch(setLoading(true))
      try {
        reader.onload = async (event) => {
          try {
            const content = event.target?.result
            console.log(content)
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
          className='csv-input'
          type='file'
          accept='.csv'
          onChange={handleFileChange}
        />
        <button className='process-btn' onClick={handleProcessClick}>Procesar</button>
        <button className='help-btn' onClick={() => setShowHelp(true)}>formato</button>
      </div>
      <Modal open={showHelp} onClose={() => setShowHelp(false)}>
        <div className='help-text'>
          <h3>Formato del fichero CSV</h3>
          <p>El formato es un CSV separado por comas con las siguientes columnas. La primera línea será el título:</p>
          <pre>
            Título del test{'\n'}
            pregunta, respuesta_correcta, respuesta_incorrecta, respuesta_incorrecta, ...{'\n'}
          </pre>
          <p>Ejemplo:</p>
          <pre>
            Test de Geografía y Ciencia{'\n'}
            '¿Cuál es la capital de Francia?', 'París', 'Londres', 'Berlín', 'Madrid'{'\n'}
            '¿Cuánto es 2 + 2?', '4', '3', '5', '22', '55', '18'
          </pre>
        </div>
      </Modal>
    </div>
  )
}

export default UploadQuiz
