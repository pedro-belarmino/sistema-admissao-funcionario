import { useNavigate } from "react-router-dom";
import Inputs from "../../components/shared/Inputs";
import { MouseEventHandler, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../shareUrl";
import { Snackbar, Alert } from "@mui/material";

export default function ProfileCrate() {

    const url = `${baseUrl}profile`;
    const [description, setDescription] = useState<string>('');

    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [validateSnackbar, setValidateSnackbar] = useState(false)
    const [successSnackbar, setSuccessSnackbar] = useState(false)

    const handleClose = () => {
        setErrorSnackbar(false);
        setValidateSnackbar(false);
        setSuccessSnackbar(false);
    };


    const navigate = useNavigate()


    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (description == null || description == "") {
        }
        setDescription(e.target.value)
    }

    const send: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        if (!description) {
            setValidateSnackbar(true)
            return;
        }

        try {
            await axios.post(url, {
                data: {
                    description: description,
                }
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'opbase-id': localStorage.getItem('operationalBase')
                    }
                }
            );
            setDescription('');
            setSuccessSnackbar(true)
        }
        catch (error: any) {
            setErrorSnackbar(true)
        }
    }

    const searchNavigate = () => {
        navigate('/perfil-lista')
    }

    return (
        <div className="p-8">
            <h1 className="flex text-xl font-bold pb-5 dark:text-slate-200">Criar Perfil</h1>
            <div className="flex w-10">

                <button type="button"
                    className="text-white bg-blue-700 flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={searchNavigate}>
                    <svg className="h-5 w-5 mr-2 text-slate-100" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
                    Pesquisar
                </button>
            </div>
            <div className="flex">
                <label htmlFor="descricao" className="dark:text-slate-200">Descrição do perfil *</label>
            </div>

            <div className="flex">
                <Inputs type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={description}
                    onChange={handleDescription}
                    className='my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:bg-[#3E5875] dark:text-black' />
            </div>
            <div className="flex">
                <label className="inline-flex items-center cursor-default">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 pr-3">Status</span>
                    <input type="checkbox" value="" className="sr-only peer" disabled checked></input>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300"></div>

                </label>
            </div>
            <br />
            <button
                type="submit"
                className="flex text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={send}>
                <svg
                    className="h-5 w-5 mr-2 text-slate-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                </svg>
                Salvar
            </button>

            <Snackbar open={errorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Erro ao tentar salvar o perfil
                </Alert>
            </Snackbar>

            <Snackbar open={validateSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Insira uma descrição
                </Alert>
            </Snackbar>

            <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Perfil criado com sucesso!
                </Alert>
            </Snackbar>
        </div>
    )
}