import { useNavigate } from "react-router-dom";
import Inputs from "../../shared/Inputs"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../shareUrl";
import FilterableSelect from "../../shared/FilterableSelect";

interface FieldsDocumentationAndIdentity {
    pis: string;
    rg: string;
    rgIssueDate: string;
    rgUf: string;
    idDocOrgIssuer: string;
    rgOrgExpedition: string;
    rgOrgIssuer: string;
    rgOrgIssuerDescription: string;
    professionalCard: string;
    professionalCardSerial: string;
    professionalCardUf: string;
    ctpsIssueDate: string;
    militaryServiceCard: string;
    voterTitle: string;
    voterZone: string;
    voterSection: string;
}

const inicialFieldsDocumentationAndIdentity: FieldsDocumentationAndIdentity = {
    pis: "",
    rg: "",
    rgIssueDate: "",
    rgUf: "",
    idDocOrgIssuer: "",
    rgOrgExpedition: "",
    rgOrgIssuer: "",
    rgOrgIssuerDescription: '',
    professionalCard: "",
    professionalCardSerial: "",
    professionalCardUf: "",
    ctpsIssueDate: "",
    militaryServiceCard: "",
    voterTitle: "",
    voterZone: "",
    voterSection: "",


}

export default function DocumentationAndIdentity() {

    const navigate = useNavigate();
    const [FieldsDocumentationAndIdentity, setFieldsDocumentationAndIdentity] = useState<FieldsDocumentationAndIdentity>(inicialFieldsDocumentationAndIdentity)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [data, setData] = useState<{ [key: string]: Array<{ data: string; description?: string; }> }>({});

    const [loading, setLoading] = useState(false)

    const fecth = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}employee/page/microservice/fetch-data`, {
                headers: {
                    'session-token': `${localStorage.getItem('sessionToken')}`,
                    "access-id": localStorage.getItem('accessId')
                },
            })
            const reponseData = response.data.data.rgIssuerOrgData;
            setData(reponseData)
        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const storedDocumentationAndIdentity = {
            pis: localStorage.getItem("pis") || "",
            rg: localStorage.getItem("rg") || "",
            rgIssueDate: localStorage.getItem("rgIssueDate") || "",
            rgUf: localStorage.getItem("rgUf") || "",
            idDocOrgIssuer: localStorage.getItem("idDocOrgIssuer") || "",
            rgOrgExpedition: localStorage.getItem("rgOrgExpedition") || "",
            rgOrgIssuer: localStorage.getItem("rgOrgIssuer") || "",
            rgOrgIssuerDescription: localStorage.getItem('rgOrgIssuerDescription') || '',
            professionalCard: localStorage.getItem("professionalCard") || "",
            professionalCardSerial: localStorage.getItem("professionalCardSerial") || "",
            professionalCardUf: localStorage.getItem("professionalCardUf") || "",
            ctpsIssueDate: localStorage.getItem("ctpsIssueDate") || "",
            militaryServiceCard: localStorage.getItem("militaryServiceCard") || "",
            voterTitle: localStorage.getItem("voterTitle") || "",
            voterZone: localStorage.getItem("voterZone") || "",
            voterSection: localStorage.getItem("voterSection") || "",
        };
        setFieldsDocumentationAndIdentity(storedDocumentationAndIdentity);
        fecth()
    }, []);


    const formatRG = (value: string) => {
        const numericRGValue = value.replace(/\D/g, '').slice(0, 9);
        return numericRGValue
            .replace(/(\d{2})(\d)/, '$1.$2') // XX.
            .replace(/(\d{3})(\d)/, '$1.$2') // XX.XXX.
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // XX.XXX.XXX-X
    };
    // function formatPIS(pis: string): string {
    //     const numericPis = pis.replace(/\D/g, '').slice(0, 11);
    //     return numericPis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
    // }
    function formatCTPS(ctps: string): string {
        const numericCTPS = ctps.replace(/\D/g, '').slice(0, 8);
        return numericCTPS.replace(/([\d]{1})(\d{5})(\d{2})/, '$1-$2-$3');
    }


    const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let newValue = value

        switch (name) {
            case 'rg':
                newValue = formatRG(newValue);
                break;
            case 'pis':
                newValue = newValue.replace(/\D/g, '').slice(0, 20);
                // newValue = formatPIS(newValue);
                break;
            case 'professionalCard':
                newValue = formatCTPS(newValue);
                break;



            case 'rgOrgIssuer':
                newValue = newValue.slice(0, 15);
                break;
            case 'idDocOrgIssuer':
                newValue = newValue.slice(0, 15);
                break;
            case 'rgOrgExpedition':
                newValue = newValue.slice(0, 15);
                break;
            case 'professionalCardSerial':
                newValue = newValue.slice(0, 15);
                break;
            case 'militaryServiceCard':
                newValue = newValue.slice(0, 15);
                break;




            case 'voterTitle':
                newValue = newValue.slice(0, 12);
                break;
            case 'voterZone':
                newValue = newValue.slice(0, 4);
                break;
            case 'voterSection':
                newValue = newValue.slice(0, 4);
                break;
            default:
                break;
        }

        setFieldsDocumentationAndIdentity((prevState: any) =>
            prevState[name] !== newValue
                ? { ...prevState, [name]: newValue }
                : prevState
        );
    };


    function rgValidate(rg: string): boolean {
        const cleanedRG = rg.replace(/\D/g, '');

        if (cleanedRG.length !== 9) {
            return false;
        }

        const digits = cleanedRG.split('').map(Number);

        const weights = [2, 3, 4, 5, 6, 7, 8, 9];
        let sum = 0;

        for (let i = 0; i < 8; i++) {
            sum += digits[i] * weights[i];
        }

        const remainder = sum % 11;
        const calculatedDigit = remainder === 0 ? 0 : 11 - remainder;

        return calculatedDigit === digits[8];
    }
    // function pisValidate(pis: string): boolean {
    //     const cleanedPIS = pis.replace(/\D/g, '');

    //     if (cleanedPIS.length !== 11) {
    //         return false;
    //     }

    //     const digits = cleanedPIS.split('').map(Number);

    //     const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    //     let sum = 0;
    //     for (let i = 0; i < 10; i++) {
    //         sum += digits[i] * weights[i];
    //     }

    //     const remainder = sum % 11;
    //     const calculatedDigit = remainder < 2 ? 0 : 11 - remainder;

    //     return calculatedDigit === digits[10];
    // }
    function validateVoterTitle(titulo: string): boolean {
        // Remove caracteres não numéricos
        const cleanedTitulo = titulo.replace(/\D/g, '');

        if (cleanedTitulo.length !== 12) {
            return false;
        }

        const digits = cleanedTitulo.split('').map(Number);

        if (digits[8] === 0 && digits[9] === 0) {
        }

        const firstWeights = [2, 3, 4, 5, 6, 7, 8, 9];
        let sum = 0;
        for (let i = 0; i < 8; i++) {
            sum += digits[i] * firstWeights[i];
        }
        const firstRemainder = sum % 11;
        const firstDigit = firstRemainder === 10 ? 0 : firstRemainder;

        const secondWeights = [7, 8, 9];
        sum = 0;
        for (let i = 8; i < 11; i++) {
            sum += digits[i] * secondWeights[i - 8];
        }
        const secondRemainder = sum % 11;
        const secondDigit = secondRemainder === 10 ? 0 : secondRemainder;

        return firstDigit === digits[10] && secondDigit === digits[11];
    }



    const personalIdentificationSubmit = (e: any) => {
        e.preventDefault()


        let rgOK = rgValidate(FieldsDocumentationAndIdentity.rg)
        let pisOK = FieldsDocumentationAndIdentity.pis
        let voterTitleOK = validateVoterTitle(FieldsDocumentationAndIdentity.voterTitle)


        const validationErrors: { [key: string]: string } = {};

        setErrors({});

        if (localStorage.getItem('isFirstJob') === 'true' && !FieldsDocumentationAndIdentity.pis) validationErrors.pis = 'Campo obrigatório.';
        if (localStorage.getItem('employeeSex') === 'M' && !FieldsDocumentationAndIdentity.militaryServiceCard) validationErrors.militaryServiceCard = 'Campo obrigatorio.';
        if (!FieldsDocumentationAndIdentity.rg) validationErrors.rg = 'Campo obrigatório.';
        if (!rgOK) validationErrors.rg = 'Insira um RG válido.';
        if (localStorage.getItem('isFirstJob') === 'true' && !pisOK) validationErrors.pis = 'Insira um PIS válido.';
        if (!voterTitleOK) validationErrors.voterTitle = 'Insira um Título Eleitoral válido.';

        if (!FieldsDocumentationAndIdentity.rgIssueDate) validationErrors.rgIssueDate = 'Campo obrigatório.';
        if (!FieldsDocumentationAndIdentity.rgUf) validationErrors.rgUf = 'Campo obrigatório.';
        if (!FieldsDocumentationAndIdentity.professionalCardUf) validationErrors.professionalCardUf = 'Campo obrigatório.';
        if (!FieldsDocumentationAndIdentity.ctpsIssueDate) validationErrors.ctpsIssueDate = 'Campo obrigatório.';
        if (!FieldsDocumentationAndIdentity.voterTitle) validationErrors.voterTitle = 'Campo obrigatório.';
        if (!FieldsDocumentationAndIdentity.voterZone) validationErrors.voterZone = 'Campo obrigatório.';
        if (!FieldsDocumentationAndIdentity.voterSection) validationErrors.voterSection = 'Campo obrigatório.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});


        localStorage.setItem('pis', FieldsDocumentationAndIdentity.pis);
        localStorage.setItem('rg', FieldsDocumentationAndIdentity.rg.replace(/\D/g, ''));
        localStorage.setItem('rgIssueDate', FieldsDocumentationAndIdentity.rgIssueDate);
        localStorage.setItem('rgUf', FieldsDocumentationAndIdentity.rgUf);
        localStorage.setItem('idDocOrgIssuer', FieldsDocumentationAndIdentity.idDocOrgIssuer);
        localStorage.setItem('rgOrgExpedition', FieldsDocumentationAndIdentity.rgOrgExpedition);
        localStorage.setItem('rgOrgIssuerDescription', FieldsDocumentationAndIdentity.rgOrgIssuerDescription);
        localStorage.setItem('rgOrgIssuer', FieldsDocumentationAndIdentity.rgOrgIssuer);
        localStorage.setItem('professionalCard', FieldsDocumentationAndIdentity.professionalCard);
        localStorage.setItem('professionalCardSerial', FieldsDocumentationAndIdentity.professionalCardSerial);
        localStorage.setItem('professionalCardUf', FieldsDocumentationAndIdentity.professionalCardUf);
        localStorage.setItem('ctpsIssueDate', FieldsDocumentationAndIdentity.ctpsIssueDate);
        localStorage.setItem('militaryServiceCard', FieldsDocumentationAndIdentity.militaryServiceCard);
        localStorage.setItem('voterTitle', FieldsDocumentationAndIdentity.voterTitle);
        localStorage.setItem('voterZone', FieldsDocumentationAndIdentity.voterZone);
        localStorage.setItem('voterSection', FieldsDocumentationAndIdentity.voterSection);

        navigate('/informacaoes-de-endereco')
    }

    const handleSelectChange = (selectedOption: { data: string; description: string }) => {
        setFieldsDocumentationAndIdentity((prevState) => ({
            ...prevState,
            rgOrgIssuer: selectedOption.data,
            rgOrgIssuerDescription: selectedOption.description
        }));
    };

    if (loading) {
        return (
            <><div className="flex w-full h-full flex-col bg-white">
                <img className="w-96 flex place-self-center" src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952fqw5spmwizwrvbw09ansom8dfhudre5s8h1h11ee&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" />
                <p className="place-self-center text-2xl font-semibold">Carregando informações...</p>
            </div>
            </>
        )
    }

    return <>
        <div className="bg-gray-300 w-full items-center content-center self-center">
            <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">

                <h1 className="text-2xl text-center bg-gray-400 font-mono font-semibold rounded-t-xl p-2">Documentação e Identidade</h1>

                <form onSubmit={personalIdentificationSubmit}>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="pis" className="font-semibold">Número P.I.S. *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="pis"
                            type="text"
                            value={FieldsDocumentationAndIdentity.pis}
                            onChange={handleFieldsChange}
                        />
                        {errors.pis && <span className="errorMessage">{errors.pis}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="rg" className="font-semibold">RG - Registro Geral *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="rg"
                            type="text"
                            value={FieldsDocumentationAndIdentity.rg}
                            onChange={handleFieldsChange}
                        />
                        {errors.rg && <span className="errorMessage">{errors.rg}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="rgIssueDate" className="font-semibold">Data de Emissão do RG *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="rgIssueDate"
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            value={FieldsDocumentationAndIdentity.rgIssueDate}
                            onChange={handleFieldsChange}
                        />
                        {errors.rgIssueDate && <span className="errorMessage">{errors.rgIssueDate}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="rgUf" className="font-semibold">UF do RG *</label>
                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="rgUf"
                            value={FieldsDocumentationAndIdentity.rgUf}
                            onChange={handleFieldsChange}
                        >
                            <option value="">Selecione uma opção:</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                        </select>
                        {errors.rgUf && <span className="errorMessage">{errors.rgUf}</span>}

                    </div>
                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="rgOrgIssuer" className="font-semibold">Orgão Emissor do RG *</label>
                        <FilterableSelect
                            options={Object.values(data).flat()}
                            onChange={(selectedOption: any) => handleSelectChange(selectedOption)}
                            value={FieldsDocumentationAndIdentity.rgOrgIssuerDescription}
                            placeholder="Selecione o orgão"
                        />
                        {errors.rgUf && <span className="errorMessage">{errors.rgUf}</span>}
                    </div>


                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="rgOrgExpedition" className="font-semibold">Orgão Expeditor do RG </label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="rgOrgExpedition"
                            type="text"
                            value={FieldsDocumentationAndIdentity.rgOrgExpedition}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="idDocOrgIssuer" className="font-semibold">Orgão Emissor do Documento de Identidade </label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="idDocOrgIssuer"
                            type="text"
                            value={FieldsDocumentationAndIdentity.idDocOrgIssuer}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="professionalCard" className="font-semibold">Carteira Profissional </label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="professionalCard"
                            type="text"
                            value={FieldsDocumentationAndIdentity.professionalCard}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="professionalCardSerial" className="font-semibold">Série da Carteira Profissonal </label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="professionalCardSerial"
                            type="text"
                            value={FieldsDocumentationAndIdentity.professionalCardSerial}
                            onChange={handleFieldsChange}
                        />
                    </div>



                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="professionalCardUf" className="font-semibold">UF da Carteira Profissional*</label>

                        <select
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="professionalCardUf"
                            value={FieldsDocumentationAndIdentity.professionalCardUf}
                            onChange={handleFieldsChange}
                        >
                            <option value="">Selecione uma opção:</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                        </select>
                        {errors.professionalCardUf && <span className="errorMessage">{errors.professionalCardUf}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="ctpsIssueDate" className="font-semibold">Data de Emissão da Carteira Profissional *</label>
                        <input
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="ctpsIssueDate"
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            value={FieldsDocumentationAndIdentity.ctpsIssueDate}
                            onChange={handleFieldsChange}
                        />
                        {errors.ctpsIssueDate && <span className="errorMessage">{errors.ctpsIssueDate}</span>}
                    </div>

                    {localStorage.getItem('employeeSex') === 'M' && (
                        <div className="m-3 border p-2 rounded-lg flex flex-col">
                            <label htmlFor="militaryServiceCard" className="font-semibold">Carteira de Reservista*</label>
                            <Inputs
                                className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                                name="militaryServiceCard"
                                type="text"
                                value={FieldsDocumentationAndIdentity.militaryServiceCard}
                                onChange={handleFieldsChange}
                            />
                            {errors.militaryServiceCard && <span className="errorMessage">{errors.militaryServiceCard}</span>}

                        </div>
                    )}


                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="voterTitle" className="font-semibold">Título Eleitoral *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="voterTitle"
                            type="text"
                            value={FieldsDocumentationAndIdentity.voterTitle}
                            onChange={handleFieldsChange}
                        />
                        {errors.voterTitle && <span className="errorMessage">{errors.voterTitle}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="voterZone" className="font-semibold">Zona Eleitoral *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="voterZone"
                            type="text"
                            value={FieldsDocumentationAndIdentity.voterZone}
                            onChange={handleFieldsChange}
                        />
                        {errors.voterZone && <span className="errorMessage">{errors.voterZone}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="voterSection" className="font-semibold">Seção Eleitoral *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="voterSection"
                            type="text"
                            value={FieldsDocumentationAndIdentity.voterSection}
                            onChange={handleFieldsChange}
                        />
                        {errors.voterSection && <span className="errorMessage">{errors.voterSection}</span>}
                    </div>



                    <div className="flex justify-between p-3">


                        <button type="button"
                            onClick={() => navigate('/identificacao-pessoal')}
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