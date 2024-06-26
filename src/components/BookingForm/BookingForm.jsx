import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Report } from "notiflix/build/notiflix-report-aio";
import styles from "./BookingForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Введіть ім'я"),
  email: Yup.string().email().required("Введіть адресу електронної пошти"),
  startDate: Yup.date().required("Оберіть дату"),
  endDate: Yup.date().required("Оберіть дату"),
  comment: Yup.string(),
});

const initialValues = {
  name: "",
  email: "",
  startDate: "",
  endDate: "",
  comment: "",
};

export default function BookingForm({ product, onClose }) {
  function handleSubmit(values, { resetForm }) {
    Report.success(
      `Congratulations, ${values.name}! `,
      `You have booked ${product.name}. Details sent to email ${values.email}`,
      "Okay"
    );
    resetForm();
    onClose();
  }
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>Book your campervan now</h3>
        <p>Stay connected! We are always ready to help you.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label>
            <Field
              className={styles.input}
              type="text"
              name="name"
              placeholder="Ім'я"
            />
            <ErrorMessage name="name">
              {(message) => <p className={styles.errorText}>{message}</p>}
            </ErrorMessage>
          </label>
          <label>
            <Field
              className={styles.input}
              type="text"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email">
              {(message) => <p className={styles.errorText}>{message}</p>}
            </ErrorMessage>
          </label>
          <label className={styles.formLabel}>
            <Field name="startDate" className={styles.formInput}>
              {({ field, form }) => (
                <DatePicker
                  {...field}
                  id="startDate"
                  placeholderText="Start date"
                  dateFormat="dd.MM.yyyy"
                  minDate={Date.now()}
                  selected={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                  style={{ width: "100%" }}
                />
              )}
            </Field>

            <ErrorMessage name="startDate">
              {(message) => <p className={styles.errorText}>{message}</p>}
            </ErrorMessage>
          </label>
          <label className={styles.formLabel}>
            <Field name="endDate" className={styles.formInput}>
              {({ field, form }) => (
                <DatePicker
                  {...field}
                  id="endDate"
                  placeholderText="End date"
                  dateFormat="dd.MM.yyyy"
                  minDate={Date.now()}
                  selected={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                />
              )}
            </Field>

            <ErrorMessage name="endDate">
              {(message) => <p className={styles.errorText}>{message}</p>}
            </ErrorMessage>
          </label>
          <label>
            <Field
              className={`${styles.input} ${styles.textarea}`}
              as="textarea"
              rows={5}
              name="comment"
              placeholder="Comment"
            />
            <ErrorMessage name="comment">
              {(message) => <p className={styles.errorText}>{message}</p>}
            </ErrorMessage>
          </label>
          <button className={styles.submitBtn} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </section>
  );
}
