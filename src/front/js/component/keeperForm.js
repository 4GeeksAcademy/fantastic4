import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const KeeperForm = ({ }) => {
  const { store, actions } = useContext(Context)
  //Calendar use
  const [value, setValue] = useState([]);
  const [isRange, setisRange] = useState(false)
  const [times, setTimes] = useState([])
  const [secondTimes, setsecondTimes] = useState([])
  const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const [disabledCalendar, setdisabledCalendar] = useState([0, 1, 2, 3, 4, 5, 6])
  const [hour, setHour] = useState("")
  const [maxDate, setmaxDate] = useState(new Date(new Date().getTime() + (366 * 24 * 60 * 60 * 1000)))
  const [finalHour, setfinalHour] = useState("")
  const [edit, setEdit] = useState(true) //Editar los campos de horas
  const params = useParams();

  function getDate() {
    let today = new Date()
    return today
  }
  function setTime(time) {
    setHour(time)
    let date = new Date(`20 December 2019 ${time}`) //Dummy date info to strip time from it
    date.setHours(date.getHours() + 1)
    date = date.getHours().toString() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes().toString()
    setfinalHour(date)
  }
  function setRange(service) {
    setValue([])
    setTimes([])
    setdisabledCalendar([])
    if (service == "Cuidador(a) de mascotas") {
      setisRange(true)
    }
    else {
      setisRange(false)
    }
  }
  async function getSlots(date) {
    setValue(date)
    setHour("")
    setfinalHour("")
    setTimes([])
    if (isRange) {
      setEdit(true) //Editar los campos de horas
      pickMultipleHours(date)
      return;
    };
    let new_date = date[0].getFullYear().toString() + "-" + (date[0].getMonth() + 1).toString() + "-" + date[0].getDate().toString()
    let slots = await actions.getdailySlots(store.currentUser.id, new_date)
    setTimes(slots)
  }
  async function pickMultipleHours(date) {
    if (date[0] != null && date[1] == null) {
      document.getElementById("datesText1").textContent = "Escoge las horas despues de escoger tus fechas"
      document.getElementById("datesText2").textContent = "Escoge las horas despues de escoger tus fechas"
      //This is the state when the user has clicked the first date and we have to set the calendar to only be able to be clicked at the following days without conflicts
      setTimes([])
      return;
    }
    let first_date = date[0].getFullYear().toString() + "-" + (date[0].getMonth() + 1).toString() + "-" + date[0].getDate().toString()
    let second_date = date[1].getFullYear().toString() + "-" + (date[1].getMonth() + 1).toString() + "-" + date[1].getDate().toString()
    let slots = await actions.getrangeSlots(store.currentUser.id, first_date, second_date)
    setTimes(slots[0])
    setsecondTimes(slots[1])
    if (slots[0].length == 0 && slots[1].length == 0){
      document.getElementById("datesText1").textContent = "No hay disponibilidad para estas fechas"
      document.getElementById("datesText2").textContent = "No hay disponibilidad para estas fechas"
      setEdit(true)
    }
    else {
      setEdit(false)
      document.getElementById("datesText1").textContent = ""
      document.getElementById("datesText2").textContent = "" 
    }//Editar los campos de horas
  }
  return (
    <div className="container pb-4 text-start" id="calendar">
      <h2><strong>Reservar</strong></h2>
      <div className="row gap-2">
        {/* Dos columnas principales */}
        <div className="col px-0">
          <h2 className="input-group-text">Servicios</h2>
          {/* Escogencia de servicios */}
          {Array.isArray(store.currentUser.services) ? store.currentUser.services.map((service, index) => {
            return (
              <div className="form-check form-check-inline" key={index}>
                <input href="#calendar" className="form-check-input" type="radio" name="inlineRadioOptions" onChange={() => setRange(service)} id={"option" + index} value={service} />
                <label className="form-check-label" htmlFor={"option" + index}>{service}</label>
              </div>
            )
          }) : ""}
          <h2 className="input-group-text mt-2">Disponibilidad</h2>
          <Calendar onChange={(date) => getSlots(date)} minDate={new Date()} maxDate={maxDate} allowPartialRange={true}
            tileDisabled={({ date }) => disabledCalendar.includes(date.getDay())} selectRange={isRange}
            returnValue="range" value={value} locale="es" />
          {/* Aqui irian las horas del calendario si fueran en la columna 1*/}
        </div>
        <div className="col">
          {/* Horas a escoger, se esconde si escoges el rol de cuidador */}
          {(value.length > 1 && isRange == false) ?
            <div className="mb-2">
              <h2 className="input-group-text">Horas disponibles</h2>
              {(times.length > 0) ?
                <div className="d-flex flex-row flex-wrap gap-2">
                  {(times.map((time, index) => {
                    return (
                      <a key={index} href="#Reserva" className="btn btn-outline-dark" onClick={() => setTime(time)}>{time}</a>
                    )
                  }))}
                </div>
                : "No hay disponibilidad para este día"}
            </div>
            : ""}
          <div className="row">
            <h2 className="input-group-text">Reserva</h2>
          </div>
          <div className="d-block">
            <small>Tarifa</small>
            <p>{(store.currentUser.hourly_pay ? "$" + store.currentUser.hourly_pay + "/hora" :
              "Sin tarifa establecida por " + store.currentUser.first_name)}</p>
          </div>
          <div className="row mb-2">
            {value.map((date, index) => {
              return (
                <div key={index} id="Reserva">
                  <strong>
                    {((index == 0) ?
                      <div className="mb-3">
                        <label htmlFor="basic-url" className="form-label">Fecha de inicio</label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon3">
                            {days[date.getDay()] + " " + date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString() + " " + hour}
                          </span>
                          {(isRange?
                            <select className="form-select" id="startHour" disabled={edit}>
                            {times.map((time, index) =>
                              <option key={index} value={time}>{time}</option>
                            )}
                          </select>
                            :"")}
                        </div>
                        {(isRange?<div className="form-text" id="datesText1">Escoge las fechas despues de escoger las horas</div>:"")}
                      </div>
                      :
                      <div className="mb-3">
                        <label htmlFor="basic-url" className="form-label">Fecha final</label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon3">
                            {(date == null ? "Escoger fecha final" : (`${days[date.getDay()] + " " + date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString() + " " + finalHour}`))}
                          </span>
                          {(isRange?
                            <select className="form-select" id="endHour" disabled={edit}>
                            {secondTimes.map((time, index) =>
                              <option key={index} value={time}>{time}</option>
                            )}
                          </select>
                            :"")}
                        </div>
                        {(isRange?<div className="form-text" id="datesText2">Escoge las fechas despues de escoger las horas</div>:"")}
                      </div>
                    )}
                  </strong>
                </div>
              )
            })}
          </div>
          {(value.length > 1 ?
            <Link to={`/checkout/keeper/${store.currentUser.id}`}>
              <button className="btn btn-outline-dark btn-lg" role="button">Reservar</button>
            </Link> : "")}
        </div>
      </div>
    </div>
  );
};

