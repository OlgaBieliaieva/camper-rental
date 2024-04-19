import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { filter } from "../../redux/appSlice";
// Icons
import MapPinIcon from "../Icons/MapPinIcon";
import TransmissionIcon from "../Icons/TransmissionIcon";
import VanIcon from "../Icons/VanIcon";
import FullyIntIcon from "../Icons/FullyInt";
import AlcoveIcon from "../Icons/AlcoveIcon";
import ACIcon from "../Icons/ACIcon";
import ShowerIcon from "../Icons/ShowerIcon";
import KitchenIcon from "../Icons/KitchenIcon";
import FreezerIcon from "../Icons/FreezerIcon";
import TVIcon from "../Icons/TVIcon";
import MicrowaveIcon from "../Icons/MicrowaveIcon";

import styles from "./Filters.module.css";

const equipment = [
  {
    name: "airConditioner",
    content: "AC",
    icon: <ACIcon />,
  },
  {
    name: "shower",
    content: "Shower/WC",
    icon: <ShowerIcon className={styles.inputIcon} />,
  },
  {
    name: "kitchen",
    content: "Kitchen",
    icon: <KitchenIcon className={styles.inputIcon} />,
  },
  {
    name: "freezer",
    content: "Freezer",
    icon: <FreezerIcon className={styles.inputIcon} />,
  },
  {
    name: "microwave",
    content: "Microwave",
    icon: <MicrowaveIcon className={styles.inputIcon} />,
  },
  {
    name: "TV",
    content: "TV",
    icon: <TVIcon className={styles.inputIcon} />,
  },
];

const initialValues = {
  location: "",
  transmission: "",
  form: "",
  equipment: [],
};

export default function Filters({ createSearchParams, onPageChange }) {
  const dispatch = useDispatch();

  function handleSubmit(values) {
    const params = {};
    for (const key in values) {
      if (values[key].length > 0) {
        key !== "equipment"
          ? (params[key] = values[key])
          : (params.equipment = [...values.equipment]);
      }
    }
    console.log(values);
    console.log(params);
    createSearchParams({ ...params });
    dispatch(filter({ ...params }));
    onPageChange(1);
  }

  function filterReset() {
    createSearchParams({});
    dispatch(filter({}));
    onPageChange(1);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className={styles.form}>
          <label className={styles.inputLabel}>
            Location
            <Field className={styles.input} type="text" name="location" />
            <MapPinIcon className={styles.inputIcon} />
            <ErrorMessage name="email">
              {(message) => <p className={styles.errorText}>{message}</p>}
            </ErrorMessage>
          </label>
          <div className={styles.filterSectionWrapper}>
            <h3 className={styles.filterSectionTitle}>Vehicle transmission</h3>
            <hr />
            <div
              className={`${styles.formGroup}`}
              role="group"
              aria-labelledby="transmission-radio-group"
            >
              <label
                className={`${styles.radioLabel} ${
                  values.transmission === "manual" ? styles.active : ""
                }`}
              >
                <Field
                  className={`${styles.hidden}`}
                  type="radio"
                  name="transmission"
                  value="manual"
                />
                <TransmissionIcon className={styles.inputIcon} />
                Manual
              </label>
              <label
                className={`${styles.radioLabel} ${
                  values.transmission === "automatic" ? styles.active : ""
                }`}
              >
                <Field
                  className={`${styles.hidden}`}
                  type="radio"
                  name="transmission"
                  value="automatic"
                />
                <TransmissionIcon className={styles.inputIcon} />
                Automatic
              </label>
            </div>
          </div>
          <div className={styles.filterSectionWrapper}>
            <h3 className={styles.filterSectionTitle}>Vehicle type</h3>
            <hr />
            <div
              className={`${styles.formGroup}`}
              role="group"
              aria-labelledby="type-radio-group"
            >
              <label
                className={`${styles.radioLabel} ${
                  values.form === "van" ? styles.active : ""
                }`}
              >
                <Field
                  className={`${styles.hidden}`}
                  type="radio"
                  name="form"
                  value="van"
                />
                <VanIcon
                  viewBox="0 0 40 28"
                  width={40}
                  className={styles.typeIcon}
                />
                Van
              </label>
              <label
                className={`${styles.radioLabel} ${
                  values.form === "fullyIntegrated" ? styles.active : ""
                }`}
              >
                <Field
                  className={`${styles.hidden}`}
                  type="radio"
                  name="form"
                  value="fullyIntegrated"
                />
                <FullyIntIcon viewBox="0 0 40 28" className={styles.typeIcon} />
                Fully integrated
              </label>
              <label
                className={`${styles.radioLabel} ${
                  values.form === "alcove" ? styles.active : ""
                }`}
              >
                <Field
                  className={`${styles.hidden}`}
                  type="radio"
                  name="form"
                  value="alcove"
                />
                <AlcoveIcon viewBox="0 0 40 28" className={styles.typeIcon} />
                Alcove
              </label>
            </div>
          </div>
          <div className={styles.filterSectionWrapper}>
            <h3 className={styles.filterSectionTitle}>Vehicle equipment</h3>
            <hr />
            <div
              className={`${styles.formGroup}`}
              role="group"
              aria-labelledby="equipment-checkbox-group"
            >
              {equipment.map((item, index) => (
                <label
                  key={index}
                  className={`${styles.checkboxLabel} ${
                    values.equipment.includes(item.name) ? styles.active : ""
                  }`}
                >
                  <Field
                    className={`${styles.hidden}`}
                    type="checkbox"
                    name="equipment"
                    value={item.name}
                  />
                  {item.icon}
                  {item.content}
                </label>
              ))}
            </div>
          </div>
          <button className={styles.submitBtn} type="submit">
            Search
          </button>
          <button
            className={styles.resetBtn}
            type="reset"
            onClick={filterReset}
          >
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}
