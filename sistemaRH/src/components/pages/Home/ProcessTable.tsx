import { useEffect, useState } from 'react';
import { baseUrl } from '../../../../shareUrl';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import React from 'react';
import SelectOperationalBase from '../../shared/SelectOperationalBase';
// import { useNavigate } from 'react-router-dom';

interface ProcessInformation {
    processStatus: any;
    accessId: unknown;
    operationalBaseId: string;
    templateId: unknown;
    epId: unknown;
    admissionDate: string;
    registrationId: string;
    status: string;
    employeeName: string;
    processStatusId: string;
    createdAt: string;
}


export default function ProcessTable() {

    // const navigate = useNavigate()

    const [list, setList] = useState<ProcessInformation[]>([]);
    const URL_PROCESS_LIST = `${baseUrl}employee/access/list?opBaseIds=${localStorage.getItem('operationalBase')}`
    const URL_SEND_TO_VALIDATION = `${baseUrl}employee/access/send-to-validation/`
    const [open, setOpen] = useState(false);
    const [accessLink, setAccessLink] = useState('');
    const [accessPassword, setAccessPassword] = useState('');
    const [cpfEmployee, setCpfEmployee] = useState('')
    const [rejectedMessage, setRegectedMessage] = useState('')
    const [accessId, setAccessId] = useState('')

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);

    }
    const handleCloseSnakcbar = () => {
        setLinkCopySnackbar(false)
        setPasswordCopySnackbar(false)
        setSendToValidationSnackbar(false)
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const id = open ? 'simple-popover' : undefined;

    const openPopOver = Boolean(anchorEl)


    const [statusToShowModal, setStatusToShowModal] = useState('')
    const [linkCopySnackbar, setLinkCopySnackbar] = useState(false)
    const [passwordCopySnackbar, setPasswordCopySnackbar] = useState(false)
    const [sendToValidationSnackbar, setSendToValidationSnackbar] = useState(false)


    const convertStatus = (name: string) => {
        switch (name) {
            case 'AWAITING_PRE_EMPLOYEE':
                return (
                    <div className='flex justify-between'>
                        <svg className="h-6 w-6 text-cyan-700 dark:text-cyan-300"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                        </svg>
                    </div>
                );
            case 'AWAITING_VALIDATION':
                return (
                    <svg className="h-6 place-self-center w-full text-yellow-600 dark:text-yellow-400"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                );
            case 'VALIDATED':
                return (
                    <svg className="h-6 w-full text-green-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M9 12l2 2l4 -4" />
                    </svg>
                );
            case 'REJECTED':
                return (
                    <svg className="h-6 w-6 text-red-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                );
            default:
                return '-';
        }
    };

    const showInformation = (accessId: any) => {
        setRegectedMessage('')
        try {
            axios.get(`${baseUrl}employee/access/${accessId.accessId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            }).then((response) => {
                setOpen(true);
                let tokenLink = response.data.data.preEmployee.token;
                // setAccessLink(`localhost:49169/login?token=` + tokenLink);
                setAccessLink(`https://ad-colaborador.dhml.prodevti.com.br/login?token=` + tokenLink);
                setAccessPassword(response.data.data.preEmployee.password);
                setCpfEmployee(response.data.data.employeeCpf)
                setRegectedMessage(response.data.data.processStatus.description)
                setStatusToShowModal(response.data.data.processStatus.status)
                setAccessId(response.data.data.accessId)
            })
        } catch (error) {
            console.log(error)
        }
    };

    const copyLink = (item: string, number: string) => {
        navigator.clipboard.writeText(item)
        if (number === '1') {
            setLinkCopySnackbar(true)
        } else {
            setPasswordCopySnackbar(true)
        }
    }
    const fetchProcess = async () => {
        try {
            const response = await axios.get(URL_PROCESS_LIST, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'user-id': localStorage.getItem('userId')
                }
            })
            if (Array.isArray(response.data.data)) {
                const updatedList = response.data.data.map((item: ProcessInformation) => ({
                    ...item,
                    realStatus: item.status ? convertStatus(item.status) : '-',
                }));

                setList(updatedList);
                console.log(list)
            } else {
                console.error("Os dados recebidos não estão no formato esperado.");
                setList([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProcess();
    }, []);

    const formatAdmissinDate = (dateString: string) => {
        const day = dateString.slice(6, 8)
        const month = dateString.slice(4, 6)
        const year = dateString.slice(0, 4)

        return `${day}/${month}/${year}`
    }
    function formatarCreatedData(dataString: string): string {
        const [data] = dataString.split(' ');

        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    const sendToValidation = async (accessId: string) => {
        try {
            await axios.put(`${URL_SEND_TO_VALIDATION}${accessId}`,
                null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                },
            });
            fetchProcess()
            setOpen(false)
            setSendToValidationSnackbar(true)


        } catch (error: any) {
            alert('Tivemos um erro com sua solicitação, procure o suporte.')
            console.log(error)
        }
    }


    // function toVisualization(id: string) {
    //     navigate('/visualizacao-de-processo', { state: { id: id } })
    // }



    return <div className="dark:text-white">
        <div className="flex p-4 flex-col">

            <div className='flex p-1 justify-between'>
                <div className='flex place-self-center'>
                    <svg className="h-9 w-9 mr-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="4" y="4" width="16" height="4" rx="1" />
                        <rect x="4" y="12" width="6" height="8" rx="1" />
                        <line x1="14" y1="12" x2="20" y2="12" />
                        <line x1="14" y1="16" x2="20" y2="16" />
                        <line x1="14" y1="20" x2="20" y2="20" />
                    </svg>
                    <p className="font-semibold text-3xl">Processos</p>
                </div>
                <div>
                    <SelectOperationalBase />
                </div>
            </div>

            <div className='mt-8'>

                <div className='flex pr-5 text-sm justify-around w-full'>
                    <div className='flex'>
                        <svg className="h-6 w-6 text-green-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <p className='font-semibold'>Validado</p>
                    </div>

                    <div className='flex ml-4'>
                        <svg className="h-6 w-6 text-yellow-500 dark:text-yellow-400"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="9" y1="12" x2="15" y2="12" />  <line x1="12" y1="9" x2="12" y2="15" />
                        </svg>
                        <p className='font-semibold'>Aguardando Validação</p>
                    </div>

                    <div className='flex'>
                        <svg className="h-6 w-6 text-cyan-700 dark:text-cyan-300"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <line x1="9" y1="12" x2="15" y2="12" />
                        </svg>
                        <p className='font-semibold'>Aguardando Informações do Colaborador</p>
                    </div>

                    <div className='flex'>
                        <svg className="h-6 w-6 text-gray-700 dark:text-gray-300"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="5" y="3" width="14" height="18" rx="2" />
                            <line x1="9" y1="7" x2="15" y2="7" />
                            <line x1="9" y1="11" x2="15" y2="11" />
                            <line x1="9" y1="15" x2="13" y2="15" />
                        </svg>
                        <p className='font-semibold'>Visualizar Acesso do Colaborador</p>
                    </div>

                    <div className='flex'>
                        <svg className="h-6 w-6 text-red-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                        </svg>
                        <p className='font-semibold'>Rejeitado</p>
                    </div>


                </div>
            </div>
        </div>

        <div className='place-items-center'>
            <table className='w-11/12'>
                <thead className='bg-[#3E5875] text-white'>
                    <tr>
                        <th className='border border-black w-1/12'>ID da contratação</th>
                        <th className='border border-black w-1/12'>Base Operacional</th>
                        <th className='border border-black w-1/12'>ID do Template</th>
                        <th className='border border-black w-5/12'>Nome do Funcionário</th>
                        <th className='border border-black w-1/12'>Data de Admissão</th>
                        <th className='border border-black w-1/12'>Data de Criação da Contratação</th>
                        <th className='border border-black w-1/12'>Status</th>
                        <th className='border border-black w-1/12'>Acessar</th>
                        {/* <th className='border border-black w-1/12'>Visualizar</th> */}
                    </tr>
                </thead>
                <tbody className='bg-slate-300 dark:bg-slate-700'>
                    {list.slice().reverse().map((item) => (
                        <tr key={String(item.accessId) || String(item.registrationId)}>
                            <td className='border border-gray-400 p-1 dark:border-gray-500'>{String(item?.accessId) || ""}</td>
                            <td className='border border-gray-400 p-1 dark:border-gray-500'>{String(item?.operationalBaseId) || ""}</td>
                            <td className='border border-gray-400 p-1 dark:border-gray-500'>{String(item?.templateId) || ""}</td>
                            <td className='border border-gray-400 p-1 dark:border-gray-500 text-start'>{item.employeeName}</td>
                            <td className='border border-gray-400 p-1 dark:border-gray-500'>{formatAdmissinDate(item.admissionDate)}</td>
                            <td className='border border-gray-400 p-1 dark:border-gray-500'>{formatarCreatedData(item?.createdAt) || ""}</td>
                            <td className='border border-gray-400 p-1 dark:border-gray-500'>
                                <div className='flex justify-around'>{convertStatus(item.processStatus.status)}
                                    {(item.processStatus.status === "AWAITING_PRE_EMPLOYEE" || item.processStatus.status === 'REJECTED') && (
                                        <button type='button' className='h-full' onClick={() => showInformation(item)}>
                                            <svg className="h-6 w-6 text-gray-700 dark:text-gray-300"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x="5" y="3" width="14" height="18" rx="2" />
                                                <line x1="9" y1="7" x2="15" y2="7" />
                                                <line x1="9" y1="11" x2="15" y2="11" />
                                                <line x1="9" y1="15" x2="13" y2="15" />
                                            </svg>
                                        </button>

                                    )}
                                </div>
                            </td>
                            {/* <td onClick={() => toVisualization(String(item?.accessId))} className='hover:bg-slate-200 border cursor-pointer border-gray-400 dark:border-gray-500'>
                                <div className='place-self-center'>
                                    <svg className="h-6 w-6 text-gray-700"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" stroke-Linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>

                                </div></td> */}

                            <td className=' border  border-gray-400 dark:border-gray-500'>
                                <div className='place-self-center p-1 cursor-pointer w-full text-center hover:bg-slate-200' onClick={() => window.open(`https://ad-colaborador.prod.prodevti.com.br/home?accessId=${item.accessId}`, '_blank')}>
                                    <svg className="h-5 w-5 text-gray-950 place-self-center"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="4" y1="6" x2="11" y2="6" />
                                        <line x1="4" y1="12" x2="11" y2="12" />
                                        <line x1="4" y1="18" x2="13" y2="18" />
                                        <polyline points="15 9 18 6 21 9" />
                                        <line x1="18" y1="6" x2="18" y2="18" />
                                    </svg>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


        <Popover
            id={id}
            open={openPopOver}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <div className='flex p-4' >
                <p className='font-semibold underline'>Comentário da Rejeição: </p>
                <p>{`${rejectedMessage}`}</p>
            </div>
        </Popover>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ width: 600 }} className='bg-gray-300 p-3 place-self-center m-20 rounded-2xl'>
                <div className="bg-gray-300 rounded-2xl flex flex-col items-center">
                    <div className='flex divide-x divide-gray-400'>
                        <div className='p-3'>
                            <div className='divide-y divide-gray-400 '>
                                <div className='p-4'>
                                    <p>CPF do Colaborador</p>
                                    <p>{cpfEmployee}</p>
                                </div>

                                <div className='p-4'>
                                    <p>Link de Acesso do Colaborador</p>
                                    <button onClick={() => copyLink(accessLink, '1')} className='text-blue-500'>
                                        <div className='flex'>
                                            <p>COPIAR</p>
                                            <svg className="h-5 w-5 text-blue-500"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x="8" y="8" width="12" height="12" rx="2" />
                                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                                <div className='p-4 hover:text-inherit'>
                                    <p>Senha de Acesso do Colaborador</p>
                                    <button onClick={() => copyLink(accessPassword, '2')} className='text-blue-500'>
                                        <div className='flex'>
                                            <p>COPIAR</p>
                                            <svg className="h-5 w-5 text-blue-500"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <rect x="8" y="8" width="12" height="12" rx="2" />
                                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {statusToShowModal === 'REJECTED' && (
                            <div className='flex flex-col justify-around divide-y divide-black'>
                                <div className='p-4'>
                                    <p>Comentário da Rejeição: {rejectedMessage}</p>
                                </div>
                                <div className='p-4 m-4 flex flex-col justify-around'>
                                    <p className='text-center pb-4'>Encaminhar processo para a validação:</p>
                                    <button onClick={() => sendToValidation(accessId)} className='text-white w-40 place-self-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Enviar</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </Box>
        </Modal>

        {/*Snackbar senha copiada*/}
        <Snackbar open={passwordCopySnackbar} autoHideDuration={2000} onClose={handleCloseSnakcbar}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="standard"
                sx={{ width: '100%' }}
            >
                Senha copiada para a Área de Transferência!
            </Alert>
        </Snackbar>

        {/*Snackbar link copiado*/}
        <Snackbar open={linkCopySnackbar} autoHideDuration={2000} onClose={handleCloseSnakcbar}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="standard"
                sx={{ width: '100%' }}
            >
                Link copiado para a Área de Transferência!
            </Alert>
        </Snackbar>

        {/*Snackbar eviado para validação*/}
        <Snackbar open={sendToValidationSnackbar} autoHideDuration={3000} onClose={handleCloseSnakcbar}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Processo enviado para validação!
            </Alert>
        </Snackbar>

    </div>
}