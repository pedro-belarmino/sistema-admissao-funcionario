import { useLocation, useNavigate } from "react-router-dom";
import Inputs from "../../shared/Inputs";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../shareUrl";
import loadingGif from '../../../assets/images/loadingGif.gif';


export default function EditingProfileForms() {

    const navigate = useNavigate()

    const location = useLocation();
    const { profileId } = location.state || {}
    const url = `${baseUrl}profile/${profileId}`;
    const URL_EDIT_PROFILE = `${baseUrl}profile/${profileId}`


    const [loading, setLoading] = useState<boolean>(false);
    const [errorLoading, setErrorLoading] = useState(false);
    const [profileStatus, setProfileStatus] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [profileID, setProfileId] = useState<string>('')

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);



    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'opbase-id': localStorage.getItem('operationalBase')
                    }
                });
                const description = response.data.data.description;
                const profileId = response.data.data.profileId;
                const status = response.data.data.status;

                setDescription(description);
                setProfileId(profileId);
                setProfileStatus(status);
                setErrorLoading(false);
            } catch (error) {
                setErrorLoading(true);
            }
        };
        fetchProfileData();
    }, []);


    function statusSwitch(): void {
        setProfileStatus(!profileStatus);
    }


    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!description) {
            setError('Descrição precisa ser informada!')
            return;
        }

        try {
            await axios.put(URL_EDIT_PROFILE, {
                data: {

                    description: description,
                    status: profileStatus,
                    profileId: profileId,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            });
            setSuccess('Perfil atualizado com sucesso!');
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (error: any) {
            if (error.status === 403) {
                setError('Você não tem permissão de alterar um perfil')
            } else {
                setError('Erro ao atualizar perfil.');

            }
            setLoading(false)
        }
    }


    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className="font-semibold text-center mb-4">Carregando usuários...</h1>
                <img src={loadingGif} alt="loading" className="h-24 w-24" />
            </div>
        );

    }

    if (errorLoading) {
        return (
            <div className="errorMessage">
                <div className="flex flex-col">
                    <p className="font-bold flex justify-center text-3xl text-slate-800">ERRO AO BUSCAR PERFIL</p>
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
            </div>
        );
    }

    const searchNavigate = () => {
        navigate('/perfil-lista')
    }

    const createNavigate = () => {
        navigate('/perfil-formulario')
    }

    return <div className="p-8">
        <h1 className="flex text-xl font-bold dark:text-slate-200">Editar Perfil</h1>
        <div className="flex w-10">

            <button type="button"
                onClick={createNavigate}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >
                Criar
            </button>

            <button type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={searchNavigate}>
                Pesquisar
            </button>
        </div>

        <div className=" flex">

            <div className="mt-8">
                <label className="flex" htmlFor="userCode">Código</label>
                <Inputs type="number"
                    readOnly={true}
                    value={profileID}
                    className="bg-gray-50 border border-gray-400 text-gray-500 text-sm rounded-lg block w-3/12 p-2.5 dark:bg-[#3E5875] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <div className="flex">
                    <label htmlFor="descricao" className="dark:text-slate-200">Descrição do perfil *</label>
                </div>

                <div className="flex">
                    <Inputs type="text"
                        name="descricao"
                        value={description}
                        onChange={handleDescription}
                        placeholder="Descrição"
                        className='my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:bg-[#3E5875] dark:text-black' />
                </div>

                <div className="flex">
                    <label className="inline-flex items-center cursor-default">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 pr-3">Status</span>
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={profileStatus}
                            onChange={statusSwitch}
                            id="toggle"
                        ></input>
                        <div
                            className="relative w-11 h-6 bg-gray-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500">
                        </div>
                    </label>
                </div>
                <button
                    type="submit"
                    className="flex mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSave}>
                    Salvar
                </button>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 w-96 py-3 rounded relative mb-4 dark:bg-red-200">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-green-400 border border-green-600 text-green-800 px-4 py-3 w-96 rounded relative mb-4 dark:bg-green-200">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
            </div>
        </div>
    </div>
}