import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../shareUrl";
import Button from "../../components/shared/Button";
import axios from "axios";
import '../../index.css'
import SelectOperationalBase from "../../components/shared/SelectOperationalBase";


interface ProfileInterface {
    description: string;
}
interface ShowUsers {
    userId: number;
    name: string;
    description: string;
    email: string;
    status: boolean;
    cpf: string;
    profile: ProfileInterface;
}


export default function UserSearch() {
    const url = `${baseUrl}user/list?opBaseIds=${localStorage.getItem('operationalBase')}`;

    const [users, setUsers] = useState<ShowUsers[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase'),
                    'user-id': localStorage.getItem('userId')

                }
            });
            setUsers(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar usuários.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="font-semibold text-center mb-4">Carregando usuários...</h1>
                <img src="src/assets/images/loadingGif.gif" alt="loading" className="h-24 w-24" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col p-16">
                <p className="font-bold flex justify-center text-3xl text-slate-800">{error}</p>
                <div className="flex justify-center">
                    <svg className="h-32 w-32 text-slate-700"
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

    const formatCpf = (cpf: string): string => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const editingHandleButton = (id: number) => {
        navigate('/usuario-formulario', { state: { userId: id } });
    }


    const createNavigate = () => {
        navigate('/usuario-formulario')
    }

    return (
        <div className="p-8">
            <div className="flex justify-between p-4">
                <h1 className="flex text-2xl font-bold dark:text-white">Pesquisar Usuário</h1>
                <SelectOperationalBase />
            </div>
            <br />
            <div className="flex w-10">
                <Button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={createNavigate}>
                    Criar
                </Button>
                <Button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Pesquisar
                </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">

                <table className="w-full">
                    <thead>
                        <tr className="bg-[#3e5875] text-white">
                            <th className="contentUsersTableH w-1/12 text-center">Código</th>
                            <th className="contentUsersTableH w-3/12 text-center">Perfil</th>
                            <th className="contentUsersTableH w-2/12 text-start">CPF</th>
                            <th className="contentUsersTableH w-2/12 text-start">Nome</th>
                            <th className="contentUsersTableH w-1/12 text-start">Email</th>
                            <th className="contentUsersTableH w-1/12 text-center">Status</th>
                            <th className="contentUsersTableH w-1/12 text-center">Edição</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-white">
                        {users.map((user) => (
                            <tr key={user.userId} className="hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-100">
                                <td className="contentUsersTableB ">{user.userId}</td>
                                <td className="contentUsersTableB ">{user.profile?.description ? user.profile.description
                                    :
                                    <svg className="h-6 w-6 text-slate-900 dark:text-slate-50"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                }
                                </td>
                                <td className="contentUsersTableB text-start ">{formatCpf(user.cpf)}</td>
                                <td className="contentUsersTableB text-start ">{user.name}</td>
                                <td className="contentUsersTableB text-start ">{user.email}</td>
                                <td className="contentUsersTableB ">{user.status ?
                                    <svg
                                        className="h-6 w-6 text-green-500"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                        />
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                    :
                                    <svg className="h-6 w-6 text-red-500 "
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z" />
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M10 10l4 4m0 -4l-4 4" />
                                    </svg>
                                }
                                </td>
                                <td className="contentUsersTableB " >
                                    <Button
                                        type="button"
                                        onClick={() => editingHandleButton(user.userId)}>
                                        <svg className="h-4 w-4 text-slate-500 dark:text-slate-100"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>        </div>
    );
}
