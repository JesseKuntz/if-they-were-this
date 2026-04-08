import PropTypes from 'prop-types';

function GenerateQuizzesButton({ fetchQuizzes, size }) {
  return (
    <button
      className="main-button"
      onClick={() => fetchQuizzes(size)}
    >
      {size}
    </button>
  );
}

GenerateQuizzesButton.propTypes = {
  fetchQuizzes: PropTypes.func,
  size: PropTypes.number,
};

export default GenerateQuizzesButton;
