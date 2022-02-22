import { useState, useEffect } from 'react'; //Hooks
import Error from './Error';


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");

    //Mensaje de error
    const [error, setError] = useState(false);

    //UseEffect
    useEffect(() => {
       if(Object.keys(paciente).length > 0 ){
             setNombre(paciente.nombre)
             setPropietario(paciente.propietario)
             setEmail(paciente.email)
             setFecha(paciente.fecha)
             setSintomas(paciente.sintomas)
       }
    }, [paciente])
    

    //Generar ID
    const generarId = () =>{
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        
        return random + fecha;
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        //Validación del formulario
        if ( [nombre, propietario, email, fecha, sintomas].includes("") ) {
            console.log("campo vacio");
            setError(true);
            return; //Reemplaza al else para poder volver a false
        }
        setError(false);

        //Objeto del paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        if(paciente.id){
            //Editando el registro
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
            setPacientes(pacientesActualizados);
            setPaciente({}); //Limpia el state una vez actualizado

        }else{
            //Nuevo registro 
            //Devuelve un array nuevo con el nuevo paciente (Spread operator)
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
            
            
        }
        
        
        //Reinicio del formulario
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
    }
    
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-2xl text-center">Seguimiento de pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añadir pacientes y {""}
                <span className="text-indigo-700 font-bold ">administrarlos</span>  
            </p>

            <form
                onSubmit={handleSubmit} 
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 hover:shadow-lg transition-all "
            >
                {error &&  <Error />}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre de la mascota
                    </label>
                    <input
                        id="mascota" 
                        type="text" 
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={nombre}
                        onChange={ (event) => setNombre(event.target.value) } //Permite cargar el contenido que carga el usuario en la variable nombre
                    />
                </div>{/* Cierre - Nombre Mascota */}

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre del propietario
                    </label>
                    <input
                        id="propietario" 
                        type="text" 
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={propietario}
                        onChange={ (event) => setPropietario(event.target.value) }
                    />
                </div>{/* Cierre - Nombre Propietario */}

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email" 
                        type="email" 
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={email}
                        onChange={ (event) => setEmail(event.target.value) }
                    />
                </div>{/* Cierre - Email */}

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta" 
                        type="date" 
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={fecha}
                        onChange={ (event) => setFecha(event.target.value) }
                    />
                </div>{/* Cierre - Alta */}

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea 
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 rounded-md"
                        value={sintomas}
                        onChange={ (event) => setSintomas(event.target.value) }
                    />
                </div>{/* Cierre - Alta */}

                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
                    value={ paciente.id ? "Editar paciente" : "Agregar paciente"}
                />{/* Cierre - Enviar */}
            </form>{/* Cierre - Formulario Pacientes */}
        </div>
    )
}

export default Formulario;

