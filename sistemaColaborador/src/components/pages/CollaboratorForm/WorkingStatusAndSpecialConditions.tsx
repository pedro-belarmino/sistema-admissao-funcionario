import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Inputs from "../../shared/Inputs";

interface WorkingStatusAndSpecialConditions {
    hasDisability: string;
    disabilityType: string;
    disabilityComplements: string;
}

const inicialWorkingStatusAndSpecialConditions = {
    hasDisability: "",
    disabilityType: "",
    disabilityComplements: "",

}

export default function WorkingStatusAndSpecialConditions() {

    const navigate = useNavigate()

    const [WorkingStatusAndSpecialConditions, setWorkingStatusAndSpecialConditions] = useState<WorkingStatusAndSpecialConditions>(inicialWorkingStatusAndSpecialConditions)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [disabledEmployee, setDisabledEmployee] = useState(false)

    useEffect(() => {
        if (WorkingStatusAndSpecialConditions.hasDisability == '1') {
            setDisabledEmployee(true)
        } else {
            setDisabledEmployee(false)
        }
    }, [WorkingStatusAndSpecialConditions.hasDisability])

    useEffect(() => {
        const storedContactInformation = {
            hasDisability: localStorage.getItem("hasDisability") || "",
            disabilityType: localStorage.getItem("disabilityType") || "",
            disabilityComplements: localStorage.getItem("disabilityComplements") || "",
        };
        setWorkingStatusAndSpecialConditions(storedContactInformation);
    }, []);

    const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setWorkingStatusAndSpecialConditions((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }


    const workingStatusAndSpecialConditionsSubmit = async (e: any) => {
        e.preventDefault()

        const validationErrors: { [key: string]: string } = {};
        setErrors({});

        if (WorkingStatusAndSpecialConditions.hasDisability == "") validationErrors.hasDisability = 'Campo Obrigatório';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        localStorage.setItem('hasDisability', WorkingStatusAndSpecialConditions.hasDisability);
        localStorage.setItem('disabilityType', WorkingStatusAndSpecialConditions.disabilityType);
        localStorage.setItem('disabilityComplements', WorkingStatusAndSpecialConditions.disabilityComplements);



        navigate('/envio-de-documentos')
    }

    return <>
        <div className="bg-gray-300 w-full items-center content-center self-center">
            <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">
                <h1 className="text-xl text-center bg-gray-400 font-mono font-semibold rounded-t-xl p-2">Situações de Trabalho e Condições Especiais</h1>

                <form onSubmit={workingStatusAndSpecialConditionsSubmit}>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="hasDisability" className="font-semibold">Possui Deficiência? *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="hasDisability"
                            value={WorkingStatusAndSpecialConditions.hasDisability}
                            onChange={handleFieldsChange}
                        >
                            <option value="">Selecione uma opção: </option>
                            <option value="1">SIM</option>
                            <option value="2">NÃO</option>
                        </select>
                        {errors.hasDisability && <span className="errorMessage">{errors.hasDisability}</span>}

                    </div>

                    {disabledEmployee && (

                        <>
                            <div className="m-3 border p-2 rounded-lg flex flex-col">
                                <label htmlFor="disabilityType" className="font-semibold">Tipo de Deficiência</label>
                                <select
                                    className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                    name="disabilityType"
                                    value={WorkingStatusAndSpecialConditions.disabilityType}
                                    onChange={handleFieldsChange}
                                >
                                    <option value="1">Física</option>
                                    <option value="2">Auditiva</option>
                                    <option value="3">Visual</option>
                                    <option value="4">Intelectual(Mental)</option>
                                    <option value="5">Multipla</option>
                                    <option value="6">Reabilitado</option>
                                </select>
                            </div>

                            <div className="m-3 border p-2 rounded-lg flex flex-col">
                                <label htmlFor="disabilityComplements" className="font-semibold">Observação Sobre Deficiência</label>
                                <Inputs
                                    className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                    name="disabilityComplements"
                                    type="text"
                                    value={WorkingStatusAndSpecialConditions.disabilityComplements}
                                    onChange={handleFieldsChange}
                                />
                            </div>
                        </>

                    )}

                    <div className="flex justify-between p-3">

                        <button type="button"
                            onClick={() => navigate('/informacoes-de-contato')}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Anterior
                        </button>


                        <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Próximo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}