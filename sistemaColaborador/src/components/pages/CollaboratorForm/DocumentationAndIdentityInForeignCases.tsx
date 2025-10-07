import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Inputs from "../../shared/Inputs";

interface DocumentationAndIdentityInForeignCases {
    rneNumber: string;
    rneOrgIssuer: string;
    rneIssueDate: string;
    residenceCountryForeign: string;
    foreignResident: string;
    foreignClassification: string;
    marriedToBrazillian: string;
    hasBrazillianChildren: string;
    brazilArrivalDate: string;
    naturalizationNumber: string;
    naturalizationDate: string;
}

const inicialDocumentationAndIdentityInForeignCases: DocumentationAndIdentityInForeignCases = {
    rneNumber: "",
    rneOrgIssuer: "",
    rneIssueDate: "",
    residenceCountryForeign: "",
    foreignResident: "",
    foreignClassification: "",
    marriedToBrazillian: "",
    hasBrazillianChildren: "",
    brazilArrivalDate: "",
    naturalizationNumber: "",
    naturalizationDate: ""
}

function validarRNE(rne: string): boolean {
    // Remove caracteres não numéricos
    const rneLimpo = rne.replace(/\D/g, '');

    // Verifica se o RNE tem 9 dígitos
    if (rneLimpo.length !== 9) {
        return false;
    }

    // Separa os dígitos
    const digitos = rneLimpo.split('').map(Number);
    const digitoVerificador = digitos.pop(); // Remove o último dígito (verificador)

    // Pesos para cálculo
    const pesos = [2, 3, 4, 5, 6, 7, 8, 9];

    // Calcula a soma dos produtos dos dígitos pelos pesos
    const soma = digitos.reduce((acc, digito, index) => {
        return acc + digito * pesos[index];
    }, 0);

    // Calcula o dígito verificador esperado
    const resto = soma % 11;
    let digitoEsperado: number | string;
    if (resto === 0) {
        digitoEsperado = 0;
    } else if (resto === 1) {
        digitoEsperado = 'X'; // Caso especial
    } else {
        digitoEsperado = 11 - resto;
    }

    // Compara o dígito verificador calculado com o fornecido
    return digitoEsperado === digitoVerificador;
}
export default function DocumentationAndIdentityInForeignCases() {
    const navigate = useNavigate()

    const [DocumentationAndIdentityInForeignCases, setDocumentationAndIdentityInForeignCases] = useState<DocumentationAndIdentityInForeignCases>(inicialDocumentationAndIdentityInForeignCases)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const storedContactInformation = {
            foreignResident: localStorage.getItem("foreignResident") || "",
            rneOrgIssuer: localStorage.getItem("rneOrgIssuer") || "",
            rneIssueDate: localStorage.getItem("rneIssueDate") || "",
            residenceCountryForeign: localStorage.getItem("residenceCountryForeign") || "",
            rneNumber: localStorage.getItem("rneNumber") || "",
            foreignClassification: localStorage.getItem("foreignRforeignClassificationesident") || "",
            marriedToBrazillian: localStorage.getItem("marriedToBrazillian") || "",
            hasBrazillianChildren: localStorage.getItem("hasBrazillianChildren") || "",
            brazilArrivalDate: localStorage.getItem("brazilArrivalDate") || "",
            naturalizationNumber: localStorage.getItem("naturalizationNumber") || "",
            naturalizationDate: localStorage.getItem("naturalizationDate") || "",
        };
        setDocumentationAndIdentityInForeignCases(storedContactInformation);
    }, []);


    const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setDocumentationAndIdentityInForeignCases((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }


    const [redident, setResident] = useState(false)
    useEffect(() => {
        if (DocumentationAndIdentityInForeignCases.foreignResident == '1') {
            setResident(true)
        } else {
            setResident(false)
        }
    }, [DocumentationAndIdentityInForeignCases.foreignResident])


    const DocumentationAndIdentityInForeignCasesSubmit = (e: any) => {
        e.preventDefault()



        const validationErrors: { [key: string]: string } = {};

        setErrors({});


        if (!DocumentationAndIdentityInForeignCases.foreignResident) {
            validationErrors.foreignResident = "Campo obrigatório."
        }
        if (DocumentationAndIdentityInForeignCases.foreignResident === '1') {
            let rneOK = validarRNE(DocumentationAndIdentityInForeignCases.rneNumber)
            if (!rneOK) {
                validationErrors.rneNumber = "Insira um número válido."
            }
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({})


        localStorage.setItem('foreignResident', DocumentationAndIdentityInForeignCases.foreignResident);
        localStorage.setItem('rneNumber', DocumentationAndIdentityInForeignCases.rneNumber);
        localStorage.setItem('rneOrgIssuer', DocumentationAndIdentityInForeignCases.rneOrgIssuer);
        localStorage.setItem('rneIssueDate', DocumentationAndIdentityInForeignCases.rneIssueDate);
        localStorage.setItem('residenceCountryForeign', DocumentationAndIdentityInForeignCases.residenceCountryForeign);
        localStorage.setItem('foreignClassification', DocumentationAndIdentityInForeignCases.foreignClassification);
        localStorage.setItem('marriedToBrazillian', DocumentationAndIdentityInForeignCases.marriedToBrazillian);
        localStorage.setItem('hasBrazillianChildren', DocumentationAndIdentityInForeignCases.hasBrazillianChildren);
        localStorage.setItem('brazilArrivalDate', DocumentationAndIdentityInForeignCases.brazilArrivalDate);
        localStorage.setItem('naturalizationNumber', DocumentationAndIdentityInForeignCases.naturalizationNumber);
        localStorage.setItem('naturalizationDate', DocumentationAndIdentityInForeignCases.naturalizationDate);




        navigate('/informacoes-de-contato')
    }

    return (
        <>
            <div className="bg-gray-300 w-full items-center content-center self-center">
                <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">
                    <h1 className="text-2xl text-center bg-gray-400 font-mono font-semibold rounded-t-xl p-2">Documentação e Identidade Em Caso de Estrangeiro</h1>
                    <form onSubmit={DocumentationAndIdentityInForeignCasesSubmit}>

                        <div className="m-3 border p-2 rounded-lg flex flex-col">
                            <label htmlFor="foreignResident" className="font-semibold">Residente no Exterior? *</label>
                            <select
                                className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                name="foreignResident"
                                value={DocumentationAndIdentityInForeignCases.foreignResident}
                                onChange={handleFieldsChange}
                            >
                                <option value="">Selecione uma Opção</option>
                                <option value="1">SIM</option>
                                <option value="2">NÃO</option>
                            </select>
                            {errors.foreignResident && <span className="errorMessage">{errors.foreignResident}</span>}

                        </div>
                        {redident && (
                            <>
                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="rneNumber" className="font-semibold">Número RNE</label>
                                    <input
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="rneNumber"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.rneNumber}
                                        onChange={handleFieldsChange}

                                    />
                                    {errors.rneNumber && <span className="errorMessage">{errors.rneNumber}</span>}
                                </div>


                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="rneOrgIssuer" className="font-semibold">Orgão Emissor RNE</label>
                                    <Inputs
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="rneOrgIssuer"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.rneOrgIssuer}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="rneIssueDate" className="font-semibold">Data Expedição do RNE</label>
                                    <input
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="rneIssueDate"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        value={DocumentationAndIdentityInForeignCases.rneIssueDate}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="residenceCountryForeign" className="font-semibold">País de Residência Exterior</label>
                                    <Inputs
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="residenceCountryForeign"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.residenceCountryForeign}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="foreignClassification" className="font-semibold">Classificação Estrangeiro</label>
                                    <Inputs
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="foreignClassification"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.foreignClassification}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="marriedToBrazillian" className="font-semibold">Casado(a) com Brasileiro(a)?</label>
                                    <Inputs
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="marriedToBrazillian"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.marriedToBrazillian}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="hasBrazillianChildren" className="font-semibold">Tem Filhos Brasileiros?
                                    </label>
                                    <Inputs
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="hasBrazillianChildren"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.hasBrazillianChildren}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="brazilArrivalDate" className="font-semibold">Data de Chegada ao Brasil</label>
                                    <input
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="brazilArrivalDate"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        value={DocumentationAndIdentityInForeignCases.brazilArrivalDate}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="naturalizationNumber" className="font-semibold">Número de Naturalização</label>
                                    <input
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="naturalizationNumber"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.naturalizationNumber}
                                        onChange={handleFieldsChange}
                                    />
                                </div>

                                <div className="m-3 border p-2 rounded-lg flex flex-col">
                                    <label htmlFor="naturalizationDate" className="font-semibold">Data de Naturalização</label>
                                    <Inputs
                                        className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                        name="naturalizationDate"
                                        type="text"
                                        value={DocumentationAndIdentityInForeignCases.naturalizationDate}
                                        onChange={handleFieldsChange}
                                    />
                                </div>
                            </>
                        )}



                        <div className="flex justify-between p-3">


                            <button type="button"
                                onClick={() => navigate('/informacaoes-de-endereco')}
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
    )
}