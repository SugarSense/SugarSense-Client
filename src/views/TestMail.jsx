import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

function TestMail() {
  const { user } = useAuth();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    switch (e.target.name) {
      case "to":
        setTo(e.target.value);
        break;
      case "subject":
        setSubject(e.target.value);
        break;
      case "message":
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      to,
      subject,
      message,
    };
    try {
      const res = await axios.post(`/${user._id}/send-email`, data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(to);
  console.log(subject);
  console.log(message);
  console.log(user._id);

  return (
    <div>
      <h1>Envoyer un email</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="to">À :</label>
          <input
            type="email"
            id="to"
            name="to"
            value={to}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Sujet :</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default TestMail;
