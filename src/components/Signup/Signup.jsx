import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "../../redux/operations";

// MUI
import {
  Avatar,
  CssBaseline,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styles from "./Signup.module.css";

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Введіть ім'я"),
  email: Yup.string().email().required("Введіть адресу електронної пошти"),
  password: Yup.string().min(6).max(10).required("Введіть пароль"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function Signup({ changeItem }) {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      favorites: [],
    };

    dispatch(signup({ ...newUser }));
    resetForm();
    changeItem(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        component={"section"}
        container
        sx={{
          width: "100%",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            my: 4,
            mx: 4,
            gap: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Реєстрація
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <label>
                Ім'я
                <Field
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Ім'я"
                />
                <ErrorMessage name="email">
                  {(message) => <p className={styles.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <label>
                Email
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
              <label>
                Пароль
                <Field
                  className={styles.input}
                  type="text"
                  name="password"
                  placeholder="Пароль"
                />
                <ErrorMessage name="password">
                  {(message) => <p className={styles.errorText}>{message}</p>}
                </ErrorMessage>
              </label>
              <button className={styles.submitBtn} type="submit">
                Зареєструватися
              </button>
            </Form>
          </Formik>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
