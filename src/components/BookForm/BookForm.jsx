import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import styles from './BookForm.module.css';
import DatePicker from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';

const BookSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Must be a valid email!').required('Required'),
  bookingDate: Yup.date().nullable(),
  message: Yup.string().min(3, 'Too short').max(256, 'Too long'),
});

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
    toast.success('Message sent successfully!');
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={BookSchema}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <>
          <Toaster position="top-center" />
          <Form className={styles.form}>
            <Field
              className={styles.field}
              type="text"
              name="name"
              placeholder="Name* "
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
            <Field
              className={styles.field}
              type="email"
              name="email"
              placeholder="Email* "
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
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
              {touched.bookingDate && errors.bookingDate && (
                <div className={styles.error}>{errors.bookingDate}</div>
              )}
            </div>
            <Field
              as="textarea"
              className={styles.field1}
              name="comment"
              placeholder="Comment"
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={styles.error}
            />
            <button className={styles.btn} type="submit">
              Send
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default BookForm;
