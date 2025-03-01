import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import styles from './BookForm.module.css';
import DatePicker from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

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
      {({ values, setFieldValue }) => (
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
          <div className={styles.datePickerWrapper}>
            <DatePicker
              className={styles.field}
              selected={values.bookingDate}
              onChange={date => setFieldValue('bookingDate', date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Booking date"
              locale={enGB}
            />
          </div>
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
      )}
    </Formik>
  );
};

export default BookForm;
