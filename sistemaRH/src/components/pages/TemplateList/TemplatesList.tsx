import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../shareUrl";
import Background from "../../../components/shared/Background";
import Button from "../../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import SelectOperationalBase from "../../shared/SelectOperationalBase";

interface ShowTemplates {
    templateName: string;
    templateId: number;
    departmentCode: string;
    departmentDescription: string;
    branchCode: string;
    branchDescription: string;
    centerCost: string;
    centerCostDescription: string;
    salary: string;
    sindicalContribution: string;
    hasPericulosity: string;
    hasInsalubrity: string;
    operationalBaseId: string;
    operationalBaseName: string;
}

const TemplatesList: React.FC = () => {

    const navigate = useNavigate()
    const URL = `${baseUrl}template/list?opBaseIds=${localStorage.getItem('operationalBase')}`

    const [templates, setTemplates] = useState<ShowTemplates[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTemplate = async () => {
        try {
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'user-id': localStorage.getItem('userId')
                }
            });
            setTemplates(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar templates.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplate();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="font-semibold text-center mb-4 dark:text-white">Carregando templates...</h1>
                <img src="src/assets/images/loadingGif.gif" alt="loading" className="h-24 w-24" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col p-16">
                <p className="font-bold flex justify-center text-3xl text-slate-800 dark:text-slate-300">{error}</p>
                <div className="flex justify-center">
                    <svg className="h-32 w-32 text-slate-700 dark:text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                </div>
            </div>
        );
    }

    const createNavigate = () => {
        navigate('/base-operacional', {
            state: {
                page: 'template'
            }
        })
    }

    const templateNavigate = (id: number, opBaseId: string) => {
        navigate('/template-vaga', { state: { templateClick: id, baseOperationalClick: opBaseId } });
    }

    const verifyInsalubrity = (hasInsalubrity: string) => {
        if (hasInsalubrity !== '1') {
            return 'Sim'
        } else {
            return 'Não'
        }
    }

    const verifyPericulosity = (hasPericulosity: string) => {
        if (hasPericulosity !== '1') {
            return 'Sim'
        } else {
            return 'Não'
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <h1 className="flex text-xl font-bold dark:text-white">Lista Templates</h1>
                <SelectOperationalBase />
            </div>
            <Button
                type="button"
                onClick={createNavigate}
                className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Criar
            </Button>
            <Background className="">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full">
                    <table>
                        <thead>
                            <tr className="bg-[#3e5875] text-white">
                                <th className="contentUsersTableH w-1/12 text-center">Id</th>
                                <th className="contentUsersTableH w-3/12 text-center">Nome</th>
                                <th className="contentUsersTableH w-2/12 text-center">Departamento</th>
                                <th className="contentUsersTableH w-2/12 text-center">Filial</th>
                                <th className="contentUsersTableH w-1/12 text-center">Insalubridade</th>
                                <th className="contentUsersTableH w-1/12 text-center">Periculosidade</th>
                                <th className="contentUsersTableH w-1/12 text-center">Base Operacional</th>
                                <th className="contentUsersTableH w-1/12 text-center">Acessar</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-slate-800 dark:text-white">
                            {templates.map((template) => (
                                <tr key={template.templateId} className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-100">
                                    <td className="contentUsersTableB">{template.templateId}</td>
                                    <td className="contentUsersTableB text-left">{template.templateName}</td>
                                    <td className="contentUsersTableB">{template.departmentDescription}</td>
                                    <td className="contentUsersTableB">{template.branchDescription}</td>
                                    <td className="contentUsersTableB">{verifyInsalubrity(template.hasInsalubrity)}</td>
                                    <td className="contentUsersTableB">{verifyPericulosity(template.hasPericulosity)}</td>
                                    <td className="contentUsersTableB">{template.operationalBaseName}</td>
                                    <td className="contentUsersTableB">
                                        <Button type='button' onClick={() => templateNavigate(template.templateId, template.operationalBaseId)}>
                                            <svg className="h-5 w-5 text-slate-700 dark:text-slate-300"
                                                fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                                />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </Background>
        </div>
    )
}


export default TemplatesList;