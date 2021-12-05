import React, { useContext, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { userIdContext } from "../AppContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const NewBid = () => {
  const history = useHistory();
  const { userId } = useContext(userIdContext);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = (e) => {
    const files = e.target.files[0];
    if (files) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImage(files);
    } else {
      setImagePreview(null);
      setImage("");
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        startPrice: 0,
        expireAt: "",
        image: "",
        content: "",
        userId: userId,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Le titre est requis";
        } else if (values.startPrice === 0) {
          errors.startPrice = "Vous devez saisir un prix de départ";
        } else if (!values.expireAt) {
          errors.expireAt = "Vous devez choisir une date d'expiration";
        } else if (!values.content) {
          errors.content = "Une description est nécessaire";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("name", values.title);
        formData.append("startPrice", values.startPrice);
        formData.append("expireAt", values.expireAt);
        formData.append("content", values.content);
        formData.append("image", image, image.name);
        await axios
          .post(`http://localhost:3001/api/offers/create`, formData, {
            withCredentials: true,
          })
          .then((res) => {
            history.push("/mon-compte");
            toast.success(res.data.message);
          })
          .catch((err) => console.log(err));
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
        <div className="container">
          <h2>Déposer une annonce</h2>
          <form action="#" className="new__bid" onSubmit={handleSubmit}>
            <div className="grid">
              <div className="grid__group">
                <label htmlFor="title">Titre de l'annonce:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  className={errors.title ? "input-error" : ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="error">
                  {errors.title && touched.title && errors.title}
                </div>
              </div>
              <div className="grid__group">
                <label htmlFor="startPrice">Prix de départ:</label>
                <input
                  type="number"
                  id="startPrice"
                  name="startPrice"
                  value={values.startPrice}
                  className={errors.startPrice ? "input-error" : ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <div className="error">
                  {errors.startPrice && touched.startPrice && errors.startPrice}
                </div>
              </div>
              <div className="grid__group">
                <label htmlFor="expireAt">Date d'expiration:</label>
                <input
                  type="datetime-local"
                  id="expireAt"
                  name="expireAt"
                  className={errors.expireAt ? "input-error" : ""}
                  value={values.expireAt}
                  onChange={handleChange}
                />
                <div className="error">
                  {errors.expireAt && touched.expireAt && errors.expireAt}
                </div>
              </div>
              <div className="grid__group">
                <label htmlFor="titre">Image:</label>
                <input
                  type="file"
                  id="image"
                  value={values.email}
                  className={errors.image ? "input-error" : ""}
                  onChange={handleFileUpload}
                />
                <div className="error">
                  {errors.image && touched.image && errors.image}
                </div>
              </div>
              <div className={`grid__group ${imagePreview && "preview_image"}`}>
                <p>Aperçu de l'image :</p>
                <div style={{ overflow: "hidden" }}>
                  <div className={`image ${imagePreview && "preview_image"}`}>
                    {imagePreview && <img src={imagePreview} alt={""} />}
                  </div>
                </div>
              </div>
              <div className="grid__group">
                <label htmlFor="titre">Description:</label>
                <textarea
                  id="content"
                  rows={10}
                  value={values.content}
                  className={errors.content ? "input-error" : ""}
                  onChange={handleChange}
                />
                <div className="error">
                  {errors.content && touched.content && errors.content}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-small btn-primary"
              disabled={isSubmitting}
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};
export default NewBid;
