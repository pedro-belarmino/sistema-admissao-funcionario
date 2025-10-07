import axios from "axios";
import { baseUrl } from "../../../../shareUrl";
import { useEffect, useState } from "react";
import HiringRegisterForms from "../HigingRegister/HiringRegisterForms";
import Loading from "../../shared/Loading";

const URL_GET_LIST = `${baseUrl}employee/access/list?rejected=true&opBaseIds=${localStorage.getItem('operationalBase')}`;

interface HiringList {
    registrationId: string;
    status: string;
    templateId: string;
    accessId: string;
    employeeName: string;
}


export default function EditHiringRegister() {

    const [hiringList, setHiringList] = useState<HiringList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionRegistrationId, setSessionRegistrationId] = useState<string>('')
    const [notToEdit, setNotToEdit] = useState(false)


    useEffect(() => {
        const fetchList = async () => {
            setLoading(true)
            setError(null)
            try {

                const response = await axios.get(URL_GET_LIST, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'user-id': localStorage.getItem('userId')
                    }
                });
                setHiringList(response.data.data);
                if (Array.isArray(response.data.data) && response.data.data.length === 0) {
                    setNotToEdit(true)
                }
            } catch (error) {
                console.error("Erro ao buscar a lista:", error);
                setError("Erro ao buscar a lista de processos.")
            } finally {
                setLoading(false)
            }
        };


        fetchList();
        sessionStorage.removeItem('REGISTRATION_ID')
    }, []);

    if (loading) return <Loading />
    if (error) return (
        <>
            <div className="">
                <div className="flex flex-col bg-red-400 p-10 place-self-center rounded-xl">
                    <p className="font-bold flex justify-center text-xl ">ERRO AO BUSCAR PROCESSOS</p>
                    <div className="flex justify-center">
                        <svg className="h-10 w-10 "
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
            </div>
        </>
    )
    if (notToEdit) {
        return (
            <>
                <p className="font-semibold text-xl bg-[#3e5875] text-white w-6/12 place-self-center rounded-xl border p-2 border-[#2c3c4e]">Não há processos pendentes para a edição nesta base operacional.</p>
            </>
        )
    }

    return (
        <>
            <div className="flex place-content-center">
            </div>
            <div className="m-5">
                <div className=" bg-gray-200 w-full dark:bg-gray-800 pt-5 pb-5 rounded-xl divide-x divide-gray-600 dark:divide-gray-100 flex shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="w-full m-6">
                        <div className="pt-6">
                            <table className="w-18/12 place-self-center max-w-full dark:text-white">
                                <thead>
                                    <tr className="bg-[#3e5875] text-white">
                                        <th className="text-start p-1 border-gray-900 border w-2/12">ID do template</th>
                                        <th className="text-start p-1 border-gray-900 border w-2/12">ID da contratação</th>
                                        <th className="text-start p-1 border-gray-900 border w-7/12">Nome do funcionário</th>
                                        <th className="text-start p-1 border-gray-900 border w-1/12">Acessar</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-700">
                                    {hiringList.map((item) => (
                                        <tr key={item.accessId}>
                                            <td className="p-1 border border-gray-400 dark:border-gray-600">{item.templateId}</td>
                                            <td className="p-1 border border-gray-400 dark:border-gray-600">{item.accessId}</td>
                                            <td className="p-1 border border-gray-400 dark:border-gray-600 text-start text-sm">{item.employeeName}</td>
                                            <td className="p-1 border border-gray-400 dark:border-gray-600">
                                                <button onClick={() => {
                                                    setSessionRegistrationId(item.accessId)

                                                }}>
                                                    <svg className="h-6 w-6 text-slate-900"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx="12" cy="12" r="9" />
                                                        <line x1="8" y1="12" x2="12" y2="16" />
                                                        <line x1="12" y1="8" x2="12" y2="16" />
                                                        <line x1="16" y1="12" x2="12" y2="16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <HiringRegisterForms accessId={sessionRegistrationId} />

                    </div>
                </div>
            </div>
        </>
    )
}