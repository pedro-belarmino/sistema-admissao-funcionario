import { Button, Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import Background from "../components/shared/Background";
import { useState } from "react";
import { baseUrl } from "../../shareUrl";
import axios from "axios";

export default function SendEmail() {

    const [email, setEmail] = useState<string>('')
    const [openWrong, setOpenWrong] = useState(false);
    const [openValidate, setOpenValidate] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const validate = async () => {

        if (!email) {
            setOpenValidate(true);

        } else {

            try {
                const response = axios.post(`${baseUrl}user/password-recovery/send-email`, {
                    data: {
                        email: email
                    }
                })
                if ((await response).status === 200) {
                    setOpenSuccess(true)
                    setEmail('')
                }
            } catch (error: any) {
                if (error.response.status === 404) {
                    setOpenWrong(true)
                }
            }

        }
    }

    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenWrong(false);
        setOpenValidate(false);
        setOpenSuccess(false);
    };

    return (
        <>
            <div>
                <div className="flex justify-center">
                    <svg className="h-8 w-8 mb-4 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <h1 className="text-2xl font-semibold mb-4">Redefina sua Senha:</h1>
                </div>

                <Background>
                    <div className="bg-gray-300 p-8 rounded-2xl border border-gray-400">

                        <div className="mb-10">
                            <label>Digite seu e-mail cadastrado:</label>
                            <input type="text" onChange={handleEmail} value={email} className="inputHiringForm" placeholder="email@email.com" />
                        </div>

                        <Button onClick={validate} variant="contained">
                            Enviar
                            <svg className="h-5 w-5 ml-3 text-gray-100"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                                <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
                            </svg>
                        </Button>

                    </div>
                </Background>
                <Snackbar open={openWrong} autoHideDuration={2000} onClose={handleClose} >

                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Insira o e-mail correspondente ao seu acesso!
                    </Alert>

                </Snackbar>
                <Snackbar open={openValidate} autoHideDuration={2000} onClose={handleClose} >

                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Insira seu e-mail!
                    </Alert>

                </Snackbar>
                <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleClose} >

                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Verifique seu e-mail para dar seguimento ao processo!
                    </Alert>

                </Snackbar>
            </div >
        </>
    )
}