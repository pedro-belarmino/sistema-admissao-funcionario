import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function VisualizationTable() {

    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state || {};
    const processId = id.id || '0'

    useEffect(() => {
        console.log(processId)
    }, [])

    return <>
        <div className="p-9">
            <div className="flex justify-between m-5">
                <p className="font-semibold flex text-2xl text-start">Visualização Completa do Processo</p>
                <Button variant="contained" onClick={() => navigate('/home')}>Voltar à Home</Button>
            </div>

            <Paper elevation={3} className="p-5">

                <Paper>
                    <p className="text-xl text-gray-800 flex font-semibold p-5">Template</p>
                    <div className="bg-gray-300 p-5 w-11/12 place-self-center">
                        <div className="divide-y divide-slate-400 divide-opacity-30 dark:divide-opacity-20 dark:divide-slate-600">


                            <div className="p-2 flex justify-around w-full">
                                <TextField
                                    label="Nome do Template"
                                    variant="outlined"
                                    className="w-5/12"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />
                                <TextField
                                    label="ID do Template"
                                    variant="outlined"
                                    className="w-2/12"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />
                                <TextField
                                    label="Data de Criação"
                                    variant="outlined"
                                    className="w-3/12"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />
                            </div>

                            <div className="pt-5 pb-5 flex flex-col justify-around w-full">

                                <div>
                                    <p className="text-start text-lg text-gray-600 font-semibold">Dados Organizacionais</p>
                                </div>

                                <div className="p-2 flex justify-around w-full">
                                    <TextField
                                        label="Centro de Custo"
                                        variant="outlined"
                                        className="w-5/12"
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Departamento"
                                        variant="outlined"
                                        className="w-5/12"
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </div>
                                <div className="p-2 flex justify-around w-full">
                                    <TextField
                                        label="Cargo"
                                        variant="outlined"
                                        className="w-5/12"
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Função"
                                        variant="outlined"
                                        className="w-5/12"
                                        slotProps={{
                                            input: {
                                                readOnly: true,
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </Paper>
            </Paper>

        </div>
    </>
}