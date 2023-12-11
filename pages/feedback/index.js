import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/feedback";

const Feedbackpage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackhandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.feedback);
        setFeedbackData(data.feedback);
      });
  };

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackhandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default Feedbackpage;
