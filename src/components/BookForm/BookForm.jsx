import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import styles from './BookForm.module.css';

const initialValues = {
  name: '',
  email: '',
  bookingDate: '',
  comment: '',
};

const BookForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <Field
          className={styles.field}
          type="text"
          name="name"
          placeholder="Name* "
        />
        <Field
          className={styles.field}
          type="email"
          name="email"
          placeholder="Email* "
        />
        <Field
          className={styles.field}
          type="date"
          name="bookingDate"
          placeholder="Booking date"
        />
        <Field
          as="textarea"
          className={styles.field1}
          name="comment"
          placeholder="Comment"
        />
        <button className={styles.btn} type="submit">
          Send
        </button>
      </Form>
    </Formik>
  );
};

export default BookForm;
