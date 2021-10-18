import React from 'react';

export default function Form(props) {
  const submit = (e) => {
    e.preventDefault();
    props.onSubmit();
  };

  return <form onSubmit={submit}>{props.children}</form>;
}
