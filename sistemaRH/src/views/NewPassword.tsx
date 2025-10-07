import { Alert, Button, Snackbar, SnackbarCloseReason, Link, Modal } from "@mui/material";
import Background from "../components/shared/Background";
import Inputs from "../components/shared/Inputs";
import { useEffect, useState } from "react";
import { baseUrl } from "../../shareUrl";
import axios from "axios";


export default function NewPassword() {

    const [password1, setPassword1] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [openEqual, setOpenEqual] = useState(false);
    const [openSize, setOpenSize] = useState(false);
    const [openValidate, setOpenValidate] = useState(false);
    const [token, setToken] = useState<string>('')
    const [errorScreen, setErrorScreen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [open401, setOpen401] = useState(false)

    const handleCloseModal = () => setOpenModal(false);

    const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword1(e.target.value)
    }

    const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.target.value)
    }

    const errorSet = () => {
        setErrorScreen(true)
    }

    useEffect(() => {
        const getUrl = window.location.href
        const getToken = new URL(getUrl)
        const tokenParam = getToken.searchParams.get('token')
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            errorSet()
        }
    }, [])


    const validateAnswer = async () => {
        if (!password1) {
            setOpenValidate(true)
        } else if (password1 !== password2) {
            setOpenEqual(true);
        } else if (password1.length < 8 || password1.length > 32) {
            setOpenSize(true);
        } else {
            try {

                const response = await axios.put(`${baseUrl}user/password-recovery/change-password`, {
                    data: {
                        newPassword: password1,
                        token: token
                    }
                })
                if (response.status === 200) {
                    setPassword1('')
                    setPassword2('')
                    setOpenModal(true)
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    setOpen401(true)
                } else {
                    console.log('API DESLIGADA?????????????????????????')
                }
            }
        }

    }


    const handleClose = ( //fechar snakbarrrr
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenEqual(false);
        setOpenSize(false);
        setOpenValidate(false);
        setOpen401(false);
    };

    if (errorScreen) {
        return (
            <div className="items-center justify-center flex flex-col">
                <p className="text-lg font-semibold">Tivemos um problema com a sua solicitação, tente novamente mais tarde ou contate o suporte!</p>
                <svg className="h-8 w-8 text-slate-900"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="10" x2="9.01" y2="10" />
                    <line x1="15" y1="10" x2="15.01" y2="10" />
                    <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
                </svg>

            </div>
        )
    }


    return (
        <div>
            <h1 className="text-2xl font-semibold m-4">Redefina sua Senha:</h1>
            <Background>
                <div className="bg-gray-300 p-8 rounded-2xl border border-gray-400">

                    <div className="mb-10">
                        <label>Digite sua nova senha:</label>
                        <input type="password" onChange={handlePassword1} value={password1} className="inputHiringForm" />
                    </div>

                    <div className="mb-10">
                        <label htmlFor="">Confirme sua nova senha:</label>
                        <Inputs type="password" onChange={handlePassword2} value={password2} className="inputHiringForm" />
                    </div>

                    <Button onClick={validateAnswer} variant="contained">Salvar</Button>
                    <br />
                    <div className="flex justify-end">
                        <Link href="/login" variant="body2">Voltar ao login</Link>
                    </div>
                </div>
            </Background>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex items-center justify-center"
            >
                <div className="bg-gray-300 p-8 rounded-2xl h-60 border border-gray-600">
                    <p className="font-bold text-xl mb-10">Senha atualizada com sucesso!</p>
                    <svg className="h-10 w-10 text-green-700 place-self-center mb-10"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2l4 -4" />
                    </svg>
                    <Link href="/login" variant="body1" className="flex justify-end">Retornar ao login</Link>
                </div>
            </Modal>

            <Snackbar open={openEqual} autoHideDuration={2000} onClose={handleClose} >

                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    As senhas não coincidem!
                </Alert>

            </Snackbar>
            <Snackbar open={openSize} autoHideDuration={2000} onClose={handleClose} >

                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Escolha uma senha entre 8 e 32 caracteres!
                </Alert>

            </Snackbar>
            <Snackbar open={openValidate} autoHideDuration={2000} onClose={handleClose} >

                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Insira uma senha!
                </Alert>

            </Snackbar>
            <Snackbar open={open401} autoHideDuration={5000} onClose={handleClose} >

                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Houve um erro de autorização na sua solicitação, tente reacessar seu link ou contate o suporte!
                </Alert>

            </Snackbar>
        </div>
    )
}