import React from "react";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="login">
        <div className="login__svg">
          <img src="image/login_svg.svg" alt="login illustration" />
        </div>
        <div>
          <h1 className="login__title">
            <span>
              <img src="image/user_icon.png" alt="user icon" />
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
            onSubmit={async (values, { setSubmitting }) => {
              await fetch("http://localhost:3001/api/users/login", {
                method: 'post',
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              })
                .then(async (res) => {
                  const message = await res.json().then(i => i.message)
                  if(res.ok){
                    toast.success(message);
                    values.email = "";
                    values.password = "";
                  }else{
                    toast.error(message)
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
              setSubmitting(false);
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
