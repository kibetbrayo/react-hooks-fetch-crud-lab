import React from "react";

function QuestionItem({ question, deleteQuestion, patchQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

//map each answer using index as key to uniquely show them as different options
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  //Perform delete of a single transaction based on thhe id given.
  function deleteHandler() {
    deleteQuestion(id)
  }

  //Listen to the event on change when it happens then trigger the patchHandler function
  function patchHandler(event){
    patchQuestion(id, parseInt(event.target.value)); //convert value from input to an integer then update questions state
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={patchHandler}>
          {options}
        </select>
      </label>
      <button onClick={deleteHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;