import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = () => {
  //GET request to our server to fetch transactions the update our state
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((res) => res.json())
      .then((questions) => {
        console.log(questions);
        setQuestions(questions);
      });
  }, []);

  //Remove a resource from the question's list passing an id as key
  const deleteHandler = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((quiz) => quiz.id !== id);
        setQuestions(updatedQuestions);
      });
  };

  //making partial changes to an existing resource
  const patchHandler = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updatedQuestions.id) return updatedQuestion;
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  };

  //map each question to to the QuestionItem component for rendering to take place
  const Qlist = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      deleteQuestion={deleteHandler}
      patchQuestion={patchHandler}
    />
  ));

  return (
    <div>
      <section>
        <h1>Quiz Questions</h1>
        <ul>
          <ul>
            {/* display QuestionItem components here after fetching */}
            {Qlist}
          </ul>
        </ul>
      </section>
    </div>
  );
};

export default QuestionList;