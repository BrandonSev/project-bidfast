import React from "react";
import {Formik} from "formik";
import {toast} from "react-toastify";
import axios from "axios";

function Login({history}) {
  return (
    <>
      <section className="login">
        <div className="login__svg">
          <img src="image/login_svg.svg" alt="login illustration"/>
        </div>
        <div>
          <h1 className="login__title">
            <span>
              <img src="image/user_icon.png" alt="user icon"/>
            </span>
            Espace Membre
          </h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email requis";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Email non valide";
              }
              if (!values.password) {
                errors.password = "Le mot de passe est requis";
              }
              return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
              await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
                email: values.email,
                password: values.password,
              }, {withCredentials: true})
                .then(async (res) => {
                  setSubmitting(false)
                  toast.success(res.data.message)
                  history.push('/')
                }).catch(err => {
                  toast.error(err.response.data.message ?? err)
                })
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
              <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__form_group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={errors.email ? "input-error" : ""}
                  />
                  <div className="error">
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className="login__form_group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password ? "input-error" : ""}
                    value={values.password}
                  />
                  <div className="error">
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <div className="login__form_button">
                  <input
                    type="submit"
                    value="Connexion"
                    className="btn btn-green"
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export default Login;
