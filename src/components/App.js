import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setQuestions] = useState("List");

  return (
    <main>
      <AdminNavBar onChangePage={setQuestions} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />} 
    </main>
  );
}

export default App;