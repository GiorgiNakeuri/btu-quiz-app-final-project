export function ProgressBar({ questionIndex, questionAmount }) {
  return (
    <div className="progress-bar-wrapper">
      <div
        className="progress-bar"
        style={{ width: `${(questionIndex + 1 / questionAmount) * 100}%` }}
      />
    </div>
  );
}
