import { useEffect, useState } from "react";
import Inputs from "../../shared/Inputs"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../shareUrl";
import FilterableSelect from "../../shared/FilterableSelect";


interface FieldsPersonalIdentification {
    employeeFullName: string;
    employeeNickname: string;
    nameSocial: string;
    nameMother: string;
    nameFather: string;
    employeeSex: string;
    employeeBirthday: string;
    employeeMaritalStatus: string;
    employeeEthnicity: string;
    employeeNationality: string;
    brazillianExteriorBorn: string;
    employeeNaturality: string;
    bornMunicipeCode: string;
    bornMunicipe: string;
}

const inicialFieldsPersonalIdentification: FieldsPersonalIdentification = {
    employeeFullName: "",
    employeeNickname: "",
    nameSocial: "",
    nameMother: "",
    nameFather: "",
    employeeSex: "",
    employeeBirthday: "",
    employeeMaritalStatus: "",
    employeeEthnicity: "",
    employeeNationality: "",
    brazillianExteriorBorn: "",
    employeeNaturality: "",
    bornMunicipeCode: "",
    bornMunicipe: "",

}

export function PersoalIdentification() {
    const navigate = useNavigate();
    const [FieldsPersonalIdentification, setFieldsPersonalIdentification] = useState<FieldsPersonalIdentification>(inicialFieldsPersonalIdentification)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [data, setData] = useState<{ [key: string]: Array<{ data: string; description?: string; }> }>({});



    useEffect(() => {
        const storedContactInformation = {
            employeeFullName: localStorage.getItem("employeeFullName") || "",
            employeeNickname: localStorage.getItem("employeeNickname") || "",
            nameSocial: localStorage.getItem("nameSocial") || "",
            nameMother: localStorage.getItem("nameMother") || "",
            nameFather: localStorage.getItem("nameFather") || "",
            employeeSex: localStorage.getItem("employeeSex") || "",
            employeeBirthday: localStorage.getItem("employeeBirthday") || "",
            employeeMaritalStatus: localStorage.getItem("employeeMaritalStatus") || "",
            employeeEthnicity: localStorage.getItem("employeeEthnicity") || "",
            employeeNationality: localStorage.getItem("employeeNationality") || "",
            brazillianExteriorBorn: localStorage.getItem("brazillianExteriorBorn") || "",
            employeeNaturality: localStorage.getItem("employeeNaturality") || "",
            bornMunicipeCode: localStorage.getItem("bornMunicipeCode") || "",
            bornMunicipe: localStorage.getItem("bornMunicipe") || "",
        };
        setFieldsPersonalIdentification(storedContactInformation);
        return setFieldsPersonalIdentification(storedContactInformation);
    }, []);


    useEffect(() => {

        const fecth = async () => {
            try {
                const response = await axios.get(`${baseUrl}employee/page/microservice/fetch-data`, {
                    headers: {
                        'session-token': `${localStorage.getItem('sessionToken')}`,
                        "access-id": localStorage.getItem('accessId')
                    },
                })
                const reponseData = response.data.data.municipeData;
                setData(reponseData)
                return reponseData;
            } catch (error: any) {
                console.log(error)
            }
        }

        const fetchAccessData = async () => {
            try {
                const response = await axios.get(`${baseUrl}employee/page/fetch-access-data`, {
                    headers: {
                        'session-token': `${localStorage.getItem('sessionToken')}`,
                        "access-id": localStorage.getItem('accessId')
                    },
                })
                console.log(response.data.data.name)
                const name = response.data.data.name
                const isFirstJob = response.data.data.isFirstJob
                localStorage.setItem('isFirstJob', isFirstJob)
                setFieldsPersonalIdentification((prevState) => ({
                    ...prevState,
                    employeeFullName: name
                }))
            } catch (error) {
                console.log(error)
            }
        }

        fecth();
        fetchAccessData()

        if (localStorage.getItem('reload')) { //ver se der problema, volta pra sessão
            location.reload()
            localStorage.removeItem('reload')
        } else {
            return;
        }
    }, [])


    const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFieldsPersonalIdentification((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const personalIdentificationSubmit = (e: any) => {
        e.preventDefault()

        const validationErrors: { [key: string]: string } = {};

        setErrors({});

        if (!FieldsPersonalIdentification.employeeFullName) validationErrors.employeeFullName = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.nameMother) validationErrors.nameMother = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.employeeSex) validationErrors.employeeSex = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.employeeMaritalStatus) validationErrors.employeeMaritalStatus = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.employeeBirthday) validationErrors.employeeBirthday = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.employeeEthnicity) validationErrors.employeeEthnicity = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.employeeNaturality) validationErrors.employeeNaturality = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.employeeNationality) validationErrors.employeeNationality = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.brazillianExteriorBorn) validationErrors.brazillianExteriorBorn = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.bornMunicipeCode) validationErrors.bornMunicipeCode = 'Campo obrigatório.';
        if (!FieldsPersonalIdentification.bornMunicipe) validationErrors.bornMunicipe = 'Campo obrigatório.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        localStorage.setItem('employeeFullName', FieldsPersonalIdentification.employeeFullName);
        localStorage.setItem('employeeNickname', FieldsPersonalIdentification.employeeNickname);
        localStorage.setItem('nameSocial', FieldsPersonalIdentification.nameSocial);
        localStorage.setItem('nameMother', FieldsPersonalIdentification.nameMother);
        localStorage.setItem('nameFather', FieldsPersonalIdentification.nameFather);
        localStorage.setItem('employeeSex', FieldsPersonalIdentification.employeeSex);
        localStorage.setItem('employeeBirthday', FieldsPersonalIdentification.employeeBirthday);
        localStorage.setItem('employeeMaritalStatus', FieldsPersonalIdentification.employeeMaritalStatus);
        localStorage.setItem('employeeEthnicity', FieldsPersonalIdentification.employeeEthnicity);
        localStorage.setItem('employeeNationality', FieldsPersonalIdentification.employeeNationality);
        localStorage.setItem('brazillianExteriorBorn', FieldsPersonalIdentification.brazillianExteriorBorn);
        localStorage.setItem('employeeNaturality', FieldsPersonalIdentification.employeeNaturality);
        localStorage.setItem('bornMunicipeCode', FieldsPersonalIdentification.bornMunicipe);
        localStorage.setItem('bornMunicipe', FieldsPersonalIdentification.bornMunicipeCode);

        navigate('/documentacao-e-identidade')



    }


    const handleSelectChange = (selectedOption: { data: string; description: string; extraInformation: string }) => {
        setFieldsPersonalIdentification((prevState) => ({
            ...prevState,
            bornMunicipeCode: selectedOption.description,
            bornMunicipe: selectedOption.data,
            employeeNaturality: selectedOption.extraInformation
        }));
    };


    return <>
        <div className="bg-gray-300 w-full items-center content-center self-center">
            <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">

                <h1 className="text-2xl text-center bg-gray-400 font-mono rounded-t-xl font-semibold p-2">Identificação Pessoal</h1>

                <form onSubmit={personalIdentificationSubmit}>
                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeFullName" className="font-semibold">Nome Completo *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeFullName"
                            type="text"
                            value={FieldsPersonalIdentification.employeeFullName}
                            readOnly
                        />
                        {errors.employeeFullName && <span className="errorMessage">{errors.employeeFullName}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeNickname" className="font-semibold">Apelido</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeNickname"
                            type="text"
                            value={FieldsPersonalIdentification.employeeNickname}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="nameSocial" className="font-semibold">Nome Social</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="nameSocial"
                            type="text"
                            value={FieldsPersonalIdentification.nameSocial}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="nameMother" className="font-semibold">Nome da Mãe *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="nameMother"
                            type="text"
                            value={FieldsPersonalIdentification.nameMother}
                            onChange={handleFieldsChange}
                        />
                        {errors.nameMother && <span className="errorMessage">{errors.nameMother}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="nameFather" className="font-semibold">Nome do Pai </label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="nameFather"
                            type="text"
                            value={FieldsPersonalIdentification.nameFather}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeSex" className="font-semibold">Sexo *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeSex"
                            value={FieldsPersonalIdentification.employeeSex}
                            onChange={handleFieldsChange}
                        >
                            <option value="" className="text-gray-400">Selecione uma opção:</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="X">Outro</option>
                            <option value="X">Não Informar</option>
                        </select>
                        {errors.employeeSex && <span className="errorMessage">{errors.employeeSex}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeBirthday" className="font-semibold">Data de Nascimento *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeBirthday"
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            value={FieldsPersonalIdentification.employeeBirthday}
                            onChange={handleFieldsChange}
                        />
                        {errors.employeeBirthday && <span className="errorMessage">{errors.employeeBirthday}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeMaritalStatus" className="font-semibold">Estado Civil *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeMaritalStatus"
                            value={FieldsPersonalIdentification.employeeMaritalStatus}
                            onChange={handleFieldsChange}
                        >
                            <option value="" className="text-gray-400">Selecione uma opção:</option>
                            <option value="1">Solteiro</option>
                            <option value="2">Casado</option>
                            <option value="3">Divorciado</option>
                            <option value="4">Viuvo</option>
                        </select>
                        {errors.employeeMaritalStatus && <span className="errorMessage">{errors.employeeMaritalStatus}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeEthnicity" className="font-semibold">Raça / Cor *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeEthnicity"
                            value={FieldsPersonalIdentification.employeeEthnicity}
                            onChange={handleFieldsChange}
                        >
                            <option value="" className="text-gray-400">Selecione uma opção:</option>
                            <option value="4">Preto</option>
                            <option value="8">Pardo</option>
                            <option value="2">Branco</option>
                            <option value="6">Amarelo</option>
                            <option value="1">Indigena</option>
                            <option value="9">Não informar</option>
                        </select>
                        {errors.employeeEthnicity && <span className="errorMessage">{errors.employeeEthnicity}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeNationality" className="font-semibold">Nacionalidade *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeNationality"
                            value={FieldsPersonalIdentification.employeeNationality}
                            onChange={handleFieldsChange}
                        >
                            <option value="" className="text-gray-400">Selecione uma opção:</option>
                            <option value="1">Brasileiro</option>
                            <option value="2">Estrangeiro</option>
                            <option value="3">Naturalizado</option>
                        </select>
                        {errors.employeeNationality && <span className="errorMessage">{errors.employeeNationality}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="brazillianExteriorBorn" className="font-semibold">Brasileiro Nascido no Exterior? *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="brazillianExteriorBorn"
                            value={FieldsPersonalIdentification.brazillianExteriorBorn}
                            onChange={handleFieldsChange}
                        >
                            <option value="">Selecione uma opção:</option>
                            <option value="N">Não</option>
                            <option value="S">Sim</option>
                        </select>
                        {errors.brazillianExteriorBorn && <span className="errorMessage">{errors.brazillianExteriorBorn}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="bornMunicipeCode" className="font-semibold">Municipio de Nascimento *</label>
                        <FilterableSelect
                            options={Object.values(data).flat()}
                            onChange={(selectedOption: any) => handleSelectChange(selectedOption)}
                            value={FieldsPersonalIdentification.bornMunicipeCode}
                            placeholder="Selecione o município"
                        />

                        {errors.bornMunicipeCode && <span className="errorMessage">{errors.bornMunicipeCode}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="bornMunicipe" className="font-semibold">Código Municipio de Nascimento *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="bornMunicipe"
                            type="text"
                            value={FieldsPersonalIdentification.bornMunicipe}
                            readOnly
                        />
                        {errors.bornMunicipe && <span className="errorMessage">{errors.bornMunicipe}</span>}


                    </div>


                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeNaturality" className="font-semibold">Naturalidade *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeNaturality"
                            value={FieldsPersonalIdentification.employeeNaturality}
                            readOnly
                        />

                        {errors.employeeNaturality && <span className="errorMessage">{errors.employeeNaturality}</span>}

                    </div>

                    <div className="flex justify-end">
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

