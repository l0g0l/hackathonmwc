import React from 'react';
import Button from '../Button/Button';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import './form.scss'


const Input = (props) => {
    // función para mostrar la contraseña
    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    // función para redirigir la página dinámicamente
    let history = useHistory();
    const sendDestination = () => {
        history.push(props.destination);
    }

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (e) => {

        sendDestination()

    }
// con el map creo el componente Form de manera dinámica según las necesidades que tenga en cada vista, pasándole por props cada uno de los elementos que voy a necesitar mostrar
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
            
                {props.fieldsDefinition.map((item) => {
                    return (
                        <div key={item.name} className={typeof item.div_className === "undefined" ? "textfield" : item.div_className}>

                            <label htmlFor="">{item.text}</label>
                            <input
                                type={typeof item.type === "undefined" ? "text" : item.type}
                                name={item.name}
                                className={typeof item.className === "undefined" ? "textfield-input" : item.className}
                                placeholder={item.placeholder}
                                id={typeof item.id === "undefined" ? "" : item.id}
                                {...register(item.name, item.validationOptions)}
                                autoComplete="off" />
                            {errors[item.name] && item.error_msg}

                            {item.showmostrar === true ? <span onClick={myFunction}>Mostrar</span> : ""}
                            {item.showaceptar === true ? <p>Acepto términos y condiciones</p> : ""}


                        </div>
                    )

                })}

                <div>

                    <Button txt={props.buttontxt} button_onclick={typeof props.button_onclick != "undefined" ? props.button_onclick : () => { }} />
                </div>

            </form>
        </>
    )
}

export default Input
