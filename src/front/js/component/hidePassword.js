import React, { useState } from "react";
import "../../styles/signup.css";

export const HidePassword = () => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="mb-6">
      <label htmlFor="inputPassword" className="form-label">
        Contraseña
      </label>
      <div>
        <div className="input-group mb-6 form-control p-0">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              value={showPassword}
              aria-label="Checkbox for showing password"
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="password"
            id="inputPassword"
          /><a className="btn btn-primary" role="button" data-bs-toggle="button"><i className="fa-solid fa-eye"></i></a>
        </div>
      </div>
    </div>
  );
};
