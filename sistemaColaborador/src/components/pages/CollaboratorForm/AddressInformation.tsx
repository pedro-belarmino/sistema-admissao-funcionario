import { useEffect, useState } from "react";
import Inputs from "../../shared/Inputs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../shareUrl";
import FilterableSelect from "../../shared/FilterableSelect";


interface FieldsAddressInformation {
    addressType: string;
    logradouroType: string;
    logradouroDescription: string;
    logradouroNumber: string;
    employeeAddress: string;
    employeeNeighborhood: string;
    employeeState: string;
    employeeMunicipe: string;
    addressComplement: string;
    cep: string;
    issuerCountryCode: string;
    issuerCountryDescription: string;
}

const inicialFieldsAddressInformation: FieldsAddressInformation = {
    addressType: "",
    logradouroType: "",
    logradouroDescription: "",
    logradouroNumber: "",
    employeeAddress: "",
    employeeNeighborhood: "",
    employeeState: "",
    employeeMunicipe: "",
    addressComplement: "",
    cep: "",
    issuerCountryCode: "",
    issuerCountryDescription: "",

}


export default function AddressInformation() {

    const navigate = useNavigate()
    const [FieldsAddressInformation, setFieldsAddressInformation] = useState<FieldsAddressInformation>(inicialFieldsAddressInformation)

    const [data2, setData2] = useState<{ [key: string]: Array<{ data: string; description?: string; }> }>({});
    const [data3, setData3] = useState<{ [key: string]: Array<{ data: string; description?: string; }> }>({});
    const [data4, setData4] = useState<{ [key: string]: Array<{ data: string; description?: string; }> }>({});


    const fecth = async () => {
        try {
            const response = await axios.get(`${baseUrl}employee/page/microservice/fetch-data`, {
                headers: {
                    'session-token': `${localStorage.getItem('sessionToken')}`,
                    "access-id": localStorage.getItem('accessId')
                },
            })
            const responseData2 = response.data.data.logradouroData;
            const responseData3 = response.data.data.municipeData;
            const responseData4 = response.data.data.issuerCountryCode


            setData2(responseData2)
            setData3(responseData3)
            setData4(responseData4)
        } catch (error: any) {
            console.log(error)
        }

    }

    useEffect(() => {
        fecth();

        const storedContactInformation = {
            addressType: localStorage.getItem("addressType") || "",
            logradouroType: localStorage.getItem("logradouroType") || "",
            logradouroDescription: localStorage.getItem("logradouroDescription") || "",
            logradouroNumber: localStorage.getItem("logradouroNumber") || "",
            employeeAddress: localStorage.getItem("employeeAddress") || "",
            employeeNeighborhood: localStorage.getItem("employeeNeighborhood") || "",
            employeeState: localStorage.getItem("employeeState") || "",
            employeeMunicipe: localStorage.getItem("employeeMunicipe") || "",
            addressComplement: localStorage.getItem("addressComplement") || "",
            cep: localStorage.getItem("cep") || "",
            issuerCountryCode: localStorage.getItem("issuerCountryCode") || "",
            issuerCountryDescription: localStorage.getItem("issuerCountryDescription") || "",
        };
        setFieldsAddressInformation(storedContactInformation);
    }, []);

    const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let newValue = value;
        if (name === 'logradouroNumber') {
            newValue = value.replace(/[^\d]/g, '').slice(0, 8);
        }
        if (name === 'cep') {
            newValue = value.replace(/[^\d]/g, '').slice(0, 8);
        }

        setFieldsAddressInformation((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    }


    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const AddressInformationSubmit = (e: any) => {
        e.preventDefault()


        const validationErrors: { [key: string]: string } = {};

        setErrors({});

        if (!FieldsAddressInformation.addressType) validationErrors.addressType = 'Campo obrigatório.';
        if (!FieldsAddressInformation.logradouroType) validationErrors.logradouroType = 'Campo obrigatório.';
        if (!FieldsAddressInformation.employeeNeighborhood) validationErrors.employeeNeighborhood = 'Campo obrigatório.';
        if (!FieldsAddressInformation.employeeState) validationErrors.employeeState = 'Campo obrigatório.';
        if (!FieldsAddressInformation.employeeMunicipe) validationErrors.employeeMunicipe = 'Campo obrigatório.';
        if (!FieldsAddressInformation.cep) validationErrors.cep = 'Campo obrigatório.';
        if (!FieldsAddressInformation.issuerCountryCode) validationErrors.issuerCountryCode = 'Campo obrigatório.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({})

        if (!FieldsAddressInformation.logradouroNumber) {
            setFieldsAddressInformation((prevState) => ({
                ...prevState,
                logradouroNumber: '0'
            }))
        }
        localStorage.setItem("addressType", FieldsAddressInformation.addressType);
        localStorage.setItem("logradouroType", FieldsAddressInformation.logradouroType);
        localStorage.setItem("logradouroDescription", FieldsAddressInformation.logradouroDescription);
        localStorage.setItem("logradouroNumber", FieldsAddressInformation.logradouroNumber);
        localStorage.setItem("employeeAddress", FieldsAddressInformation.employeeAddress);
        localStorage.setItem("employeeNeighborhood", FieldsAddressInformation.employeeNeighborhood);
        localStorage.setItem("employeeState", FieldsAddressInformation.employeeState);
        localStorage.setItem("employeeMunicipe", FieldsAddressInformation.employeeMunicipe);
        localStorage.setItem("addressComplement", FieldsAddressInformation.addressComplement);
        localStorage.setItem("cep", FieldsAddressInformation.cep);
        localStorage.setItem("issuerCountryCode", FieldsAddressInformation.issuerCountryCode);

        navigate('/documentacao-e-identidade-em-caso-de-estrangeiro')

    }

    const handleSelectChangeLogradouroType = (selectedOption: { description: string; data: string; }) => {
        setFieldsAddressInformation((prevState) => ({
            ...prevState,
            logradouroType: selectedOption.data,
            logradouroDescription: selectedOption.description
        }));
    };

    const handleSelectChangeEmployeeMunicipe = (selectedOption: { extraInformation: string; description: string }) => {
        setFieldsAddressInformation((prevState) => ({
            ...prevState,
            employeeMunicipe: selectedOption.description,
            employeeState: selectedOption.extraInformation,

        }));
    };

    const handleSelectChangeissuerCountryCode = (selectedOption: { data: string; description: string }) => {
        setFieldsAddressInformation((prevState) => ({
            ...prevState,
            issuerCountryCode: selectedOption.data,
            issuerCountryDescription: selectedOption.description

        }));
    };



    return <>
        <div className="bg-gray-300 w-full items-center content-center self-center">
            <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">

                <h1 className="text-2xl text-center bg-gray-400 font-mono font-semibold rounded-t-xl p-2">Informações de Endereço</h1>

                <form onSubmit={AddressInformationSubmit}>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="addressType" className="fontsemibold">Tipo de Endereço *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="addressType"
                            value={FieldsAddressInformation.addressType}
                            onChange={handleFieldsChange}
                        >
                            <option value="">Selecione uma Opção:</option>
                            <option value="1">Comercial</option>
                            <option value="2">Residencial</option>
                        </select>
                        {errors.addressType && <span className="errorMessage">{errors.addressType}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="logradouroType" className="fontsemibold">Tipo de Rua *</label>

                        <FilterableSelect
                            options={Object.values(data2).flat()}
                            onChange={(selectedOption: any) => handleSelectChangeLogradouroType(selectedOption)}
                            value={FieldsAddressInformation.logradouroDescription}
                            placeholder="Selecione"
                        />
                        {errors.logradouroType && <span className="errorMessage">{errors.logradouroType}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeAddress" className="fontsemibold">Endereço do Funcionário *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeAddress"
                            type="text"
                            value={FieldsAddressInformation.employeeAddress}
                            onChange={handleFieldsChange}
                        />
                        {errors.employeeAddress && <span className="errorMessage">{errors.employeeAddress}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="logradouroNumber" className="fontsemibold">Numero</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="logradouroNumber"
                            type="text"
                            value={FieldsAddressInformation.logradouroNumber}
                            onChange={handleFieldsChange}
                        />
                    </div>


                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeNeighborhood" className="fontsemibold">Bairro *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeNeighborhood"
                            type="text"
                            value={FieldsAddressInformation.employeeNeighborhood}
                            onChange={handleFieldsChange}
                        />
                        {errors.employeeNeighborhood && <span className="errorMessage">{errors.employeeNeighborhood}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeMunicipe" className="fontsemibold">Município *</label>
                        <FilterableSelect
                            options={Object.values(data3).flat()}
                            onChange={(selectedOption: any) => handleSelectChangeEmployeeMunicipe(selectedOption)}
                            value={FieldsAddressInformation.employeeMunicipe}
                            placeholder="Selecione"
                        />
                        {errors.employeeMunicipe && <span className="errorMessage">{errors.employeeMunicipe}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="employeeState" className="fontsemibold">Estado *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="employeeState"
                            type="text"
                            value={FieldsAddressInformation.employeeState}
                            readOnly
                        />
                        {errors.employeeState && <span className="errorMessage">{errors.employeeState}</span>}
                    </div>


                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="addressComplement" className="fontsemibold">Complemento</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="addressComplement"
                            type="text"
                            value={FieldsAddressInformation.addressComplement}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="cep" className="fontsemibold">CEP *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="cep"
                            type="text"
                            value={FieldsAddressInformation.cep}
                            onChange={handleFieldsChange}
                        />
                        {errors.cep && <span className="errorMessage">{errors.cep}</span>}
                    </div>


                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="issuerCountryCode" className="fontsemibold">País de Emissão *</label>
                        <FilterableSelect
                            options={Object.values(data4).flat()}
                            onChange={(selectedOption: any) => handleSelectChangeissuerCountryCode(selectedOption)}
                            value={FieldsAddressInformation.issuerCountryDescription}
                            placeholder="Selecione"
                        />
                        {errors.issuerCountryCode && <span className="errorMessage">{errors.issuerCountryCode}</span>}
                    </div>


                    <div className="flex justify-between p-3">


                        <button type="button"
                            onClick={() => navigate('/documentacao-e-identidade')}
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