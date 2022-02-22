import { useState, useEffect } from 'react'; //Hooks
import Paciente from "./Paciente";

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {
    

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen ">

            {/* Mostrar textos en forma condicional*/}
            {pacientes.length ? (
                <>
                    <h2 className="font-black text-2xl text-center">Listado de pacientes</h2>
                    <p className="text-lg mt-5 text-center mb-10">
                        Administra tus {""}
                        <span className="text-indigo-700 font-bold ">pacientes y citas</span>
                    </p>

                    {pacientes.map( (paciente) => (
                        <Paciente 
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminarPaciente={eliminarPaciente}
                        />
                    
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-2xl text-center">No hay pacientes</h2>
                    <p className="text-lg mt-5 text-center mb-10">
                        Comienza agregando pacientes {""}
                        <span className="text-indigo-700 font-bold ">y aparecerán aquí</span>
                    </p>
                </>
            )}


        </div>
    )
}

export default ListadoPacientes;
