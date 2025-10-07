import { useState, useEffect } from "react";
import Inputs from "../../shared/Inputs";
import { useNavigate } from "react-router-dom";

interface ContactInformation {
    landlineDdd: string;
    landline: string;
    phoneDdd: string;
    phone: string;
    emailMail: string;
    emailAlternative: string;
}

const inicialContactInformation = {
    landlineDdd: "",
    landline: "",
    phoneDdd: "",
    phone: "",
    emailMail: "",
    emailAlternative: "",
};

export default function ContactInformation() {
    const navigate = useNavigate();
    const [ContactInformation, setContactInformation] = useState<ContactInformation>(inicialContactInformation);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // UseEffect pra preencher os campos se tiver coisa no localStorage (coisa boammmmh)
    useEffect(() => {
        const storedContactInformation = {
            landlineDdd: localStorage.getItem("landlineDdd") || "",
            landline: localStorage.getItem("landline") || "",
            phoneDdd: localStorage.getItem("phoneDdd") || "",
            phone: localStorage.getItem("phone") || "",
            emailMail: localStorage.getItem("emailMain") || "",
            emailAlternative: localStorage.getItem("emailAlternative") || "",
        };
        setContactInformation(storedContactInformation);
    }, []);

    const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let newValue = value

        switch (name) {
            case 'phoneDdd': newValue = newValue.slice(0, 3);
                break;
            case 'landlineDdd': newValue = newValue.slice(0, 3);
                break;
            case 'phone': newValue = newValue.slice(0, 15);
                break;
            case 'landline': newValue = newValue.slice(0, 15);
                break;
        }

        setContactInformation((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const ContactInformationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors: { [key: string]: string } = {};

        if (!ContactInformation.phoneDdd) validationErrors.phoneDdd = "Campo obrigatório";
        if (!ContactInformation.phone) validationErrors.phone = "Campo obrigatório";
        if (!ContactInformation.emailMail) validationErrors.emailMail = "Campo obrigatório"

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        localStorage.setItem("phoneDdd", ContactInformation.phoneDdd);
        localStorage.setItem("phone", ContactInformation.phone);
        localStorage.setItem("landlineDdd", ContactInformation.landlineDdd);
        localStorage.setItem("landline", ContactInformation.landline);
        localStorage.setItem("emailMain", ContactInformation.emailMail);
        localStorage.setItem("emailAlternative", ContactInformation.emailAlternative);

        navigate("/situacoes-de-trabalho-e-condicoes-especiais");
    };

    return (
        <div className="bg-gray-300 w-full items-center content-center self-center">
            <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">
                <h1 className="text-2xl text-center bg-gray-400 font-mono font-semibold rounded-t-xl p-2">Informações de Contato</h1>
                <form onSubmit={ContactInformationSubmit}>
                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="phoneDdd" className="fontsemibold">DDD Celular *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="phoneDdd"
                            type="text"
                            value={ContactInformation.phoneDdd}
                            onChange={handleFieldsChange}
                        />
                        {errors.phoneDdd && <span className="errorMessage">{errors.phoneDdd}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="phone" className="fontsemibold">Celular *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="phone"
                            type="text"
                            value={ContactInformation.phone}
                            onChange={handleFieldsChange}
                        />
                        {errors.phone && <span className="errorMessage">{errors.phone}</span>}
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="landlineDdd" className="fontsemibold">DDD Telefone</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="landlineDdd"
                            type="text"
                            value={ContactInformation.landlineDdd}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="landline" className="fontsemibold">Telefone</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="landline"
                            type="text"
                            value={ContactInformation.landline}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="emailMail" className="fontsemibold">Email Principal *</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="emailMail"
                            type="text"
                            value={ContactInformation.emailMail}
                            onChange={handleFieldsChange}
                        />
                        {errors.emailMail && <span className="errorMessage">{errors.emailMail}</span>}

                    </div>

                    <div className="m-3 border p-2 rounded-lg flex flex-col">
                        <label htmlFor="emailAlternative" className="fontsemibold">Email Alternativo</label>
                        <Inputs
                            className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500"
                            name="emailAlternative"
                            type="text"
                            value={ContactInformation.emailAlternative}
                            onChange={handleFieldsChange}
                        />
                    </div>

                    <div className="flex justify-between p-3">
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                onClick={() => navigate('/documentacao-e-identidade-em-caso-de-estrangeiro')}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Anterior
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
