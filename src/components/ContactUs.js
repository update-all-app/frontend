import React, { useState } from 'react';
import Input from '../subcomponents/Input';
import TextArea from '../subcomponents/TextArea';
import Submit from '../subcomponents/Submit';
import { validateEmail } from '../helpers/functions';
import { Title } from '../subcomponents/Title';

export default function ContactUs(props) {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  const maxCharacters = 2000;

  const [questionErrors, setQuestionErrors] = useState([
    `${maxCharacters} characters remaining`
  ]);

  const updateEmail = (input) => {
    setEmail(input);
    if (input.length === 0) {
      setEmailErrors([]);
    } else {
      const validEmail = validateEmail(input);
      if (!validEmail) {
        setEmailErrors(['Invalid Email']);
      } else {
        setEmailErrors([]);
      }
    }
  };

  const updateQuestion = (input) => {
    const characters = input.length;
    if (characters <= maxCharacters) {
      setQuestion(input);
      setQuestionErrors([
        `${maxCharacters - characters}/${maxCharacters} characters remaining`
      ]);
    }
  };

  const sendQuestion = () => {
    const validEmail = validateEmail(email);
    const questionPopulated = question.length > 0;
    if (!validEmail && questionPopulated) {
      setFormErrors(['Invalid email entered']);
    } else if (!validEmail && !questionPopulated) {
      setFormErrors(['Invalid email entered', 'You must enter a question']);
    } else if (!questionPopulated) {
      setFormErrors(['You must enter a question']);
    } else {
      setFormErrors([]);
      alert('Message fake sent');
      //TODO: Send form
    }
  };

  return (
    <>
      <Title text='Contact Us' />

      <p>Ask a question. Report a bug. Say hi.</p>
      <div className='py-4 w-96'>
        <Input
          placeholder={'Email'}
          value={email}
          onChange={updateEmail}
          errors={emailErrors}
        />
      </div>
      <div>
        <TextArea
          value={question}
          onChange={updateQuestion}
          errors={questionErrors}
        />
      </div>
      <div className='my-10 border-2 w-160 p-4'>
        <p>Add file drop here</p>
      </div>
      <div className='mb-10 w-160 flex flex-col items-start'>
        <Submit value={'Send'} onClick={sendQuestion} errors={formErrors} />
      </div>
    </>
  );
}
