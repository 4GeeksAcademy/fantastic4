import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import locations from "../../json/location.json";
import { HidePassword } from "../component/hidePassword";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/login");
    }
  }, [shouldNavigate]);

  async function signup(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const password = data.get("password");
    const { signup } = actions;
    let resp = await signup(first_name, last_name, email, password);
    setShouldNavigate(true);
    console.log(resp);
  }

  return (
    <div id="signup-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h1>BIENVENIDOS</h1>
        <form className="pe-3" onSubmit={signup} id="puppySignup">
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="inputName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="inputLastName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail1" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <select
              defaultValue="0"
              onChange={(e) => console.log(e.target.value)}>
              <option value="0" disabled>
                Seleccione una opcion
              </option>
              {locations.map((location, index) => {
                return (
                  <option value={location.es_name} key={index}>
                    {location.es_name}
                  </option>
                );
              })}
            </select>
          </div>
          <HidePassword />
          <button id="btn-signup" type="submit" className="btn">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
Signup.propTypes = {
  match: PropTypes.object,
};
