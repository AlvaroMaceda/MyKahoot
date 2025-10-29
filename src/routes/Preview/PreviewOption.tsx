function PreviewOption({ text, correct }: { text: string, correct: boolean }) {
  return (
    <div className={`quizpreview-option ${correct ? 'correct' : ''}`}>
      {text}
    </div>
  )
}

export default PreviewOption
