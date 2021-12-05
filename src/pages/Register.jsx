import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Register({ history }) {
  return (
    <div className="register">
      <div className="register__svg">
        <img src="image/login_svg.svg" alt="login illustration" />
      </div>
      <div>
        <h1 className="register__title">
          <span>
            <img src="image/user_icon.png" alt="user icon" />
          </span>
          Créer mon compte
        </h1>
        <Formik
          initialValues={{
            email: "",
            nom: "",
            prenom: "",
            password: "",
            passwordConfirm: "",
            genre: null,
            age: null,
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
            if (!values.nom) {
              errors.nom = "Le nom est requis";
            }
            if (!values.prenom) {
              errors.prenom = "Le prénom est requis";
            }
            if (!values.password || !values.passwordConfirm) {
              errors.password = "Le mot de passe est requis";
              errors.passwordConfirm = "Le mot de passe est requis";
            }
            if (values.password !== values.passwordConfirm) {
              errors.password = "Les mot de passe ne correspondent pas";
              errors.passwordConfirm = "Les mot de passe ne correspondent pas";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await axios
              .post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
                email: values.email,
                firstname: values.prenom,
                lastname: values.nom,
                password: values.password,
                genre: values.genre,
                age: values.age,
              })
              .then(async (res) => {
                setSubmitting(false);
                toast.success(res.data.message);
                history.push("/connexion");
              })
              .catch((err) => {
                toast.error(err.response.data.message ?? err);
              });
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
            <form onSubmit={handleSubmit} className="register__form">
              <div className="register__form_group">
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
              <div className="register__form_group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nom}
                  className={errors.nom ? "input-error" : ""}
                />
                <div className="error">
                  {errors.nom && touched.nom && errors.nom}
                </div>
              </div>
              <div className="register__form_group">
                <label htmlFor="prenom">Prenom</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prenom}
                  className={errors.prenom ? "input-error" : ""}
                />
                <div className="error">
                  {errors.prenom && touched.prenom && errors.prenom}
                </div>
              </div>
              <div className="register__form_group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={errors.password ? "input-error" : ""}
                />
                <div className="error">
                  {errors.password && touched.password && errors.password}
                </div>
              </div>
              <div className="register__form_group">
                <label htmlFor="passwordConfirm">Confirmer mot de passe</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                  className={errors.passwordConfirm ? "input-error" : ""}
                />
                <div className="error">
                  {errors.passwordConfirm &&
                    touched.passwordConfirm &&
                    errors.passwordConfirm}
                </div>
              </div>
              <div className="register__form_group">
                <label htmlFor="genre">Genre</label>
                <select
                  name="genre"
                  id="genre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.genre}
                  className={errors.genre ? "input-error" : ""}
                >
                  <option value="" disabled selected>
                    - Choisir -
                  </option>

                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
                <div className="error">
                  {errors.genre && touched.genre && errors.genre}
                </div>
              </div>
              <div className="register__form_group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  className={errors.age ? "input-error" : ""}
                />
                <div className="error">
                  {errors.age && touched.age && errors.age}
                </div>
              </div>
              <div className="register__form_button">
                <input
                  type="submit"
                  value="Créer mon compte"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
