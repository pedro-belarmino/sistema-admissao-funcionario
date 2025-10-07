import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../shareUrl";
import Button from "../../components/shared/Button";
import axios from "axios";
import '../../index.css'

interface ShowProfiles {
    profileId: number;
    description: string;
    status: boolean;
}

export default function ProfileSearch() {
    const url = `${baseUrl}profile/list`;

    const [profiles, setProfiles] = useState<ShowProfiles[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'opbase-id': localStorage.getItem('operationalBase')
                    }
                });
            setProfiles(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Erro ao buscar perfis.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="font-semibold text-center mb-4">Carregando perfis...</h1>
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

    const editingHandleButton = (id: number) => {
        navigate('/editing-profile', { state: { profileId: id } });
    }

    const createNavigate = () => {
        navigate('/perfil-formulario')
    }
    const profileStatus = (status: boolean) => {
        if (status) { return 'Ativo' } else return 'Inativo'
    }

    return (
        <div className="p-8">
            <h1 className="flex text-xl font-bold dark:text-white">Pesquisar Perfil</h1><br />
            <div className="flex w-10">
                <Button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={createNavigate}>
                    Criar
                </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">

                <table className="w-full">
                    <thead>
                        <tr className="bg-[#3e5875] text-white">
                            <th className="contentUsersTableH w-1/12 text-center">Código</th>
                            <th className="contentUsersTableH w-8/12 text-start">Descrição</th>
                            <th className="contentUsersTableH w-1/12 text-center">Status</th>
                            <th className="contentUsersTableH w-1/12 text-center">Edição</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:text-white">
                        {profiles.map((profile) => (
                            <tr key={profile.profileId} className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-100">
                                <td className="contentUsersTableB ">{profile.profileId}</td>
                                <td className="contentUsersTableB text-start ">{profile.description}</td>
                                <td className="contentUsersTableB ">{profileStatus(profile.status)}</td>
                                <td className="contentUsersTableB " >
                                    <Button
                                        type="button"
                                        onClick={() => editingHandleButton(profile.profileId)}>
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
            </div>
        </div>
    );
}
