import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../../../shareUrl";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Modal } from "@mui/material";



const fileKeys = [
    'photo3x4File',
    'lastJobCoverLetterFile',
    'administrativeHealthExaminationFile',
    'rgFile',
    'cpfFile',
    'MilitaryDraftFile',
    'PisProofFile',
    'addressProofFile',
    'birthCertificateFile',
    'marriageCertificateFile',
    'vaccineCardFile',
    'covidVaccineCardFile',
    'courseCompetionCertificate_schoolTranscriptFile',
    'registrationStatement',
    'eSocialRegistrationQualification'
];

interface FileEntry {
    fileName: string;
    data: string;
}

export default function SendingDocuments() {
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: FileEntry[] }>({});
    const [error, setError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    // const [blockMessage, setBlockMessage] = useState<string>('');
    // const [errorBlockMessage, setErrorBlockMessage] = useState(false);
    // const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const URL_INFORMATIONS = `${baseUrl}employee/page`;
    const URL_FILES = `${baseUrl}attachment`;

    // const maritalStatus = localStorage.getItem('employeeMaritalStatus');

    const handleCloseModal = () => setOpenModal(false);
    const handleClose = () => {
        setError(false);
        //  setErrorBlockMessage(false);
    };

    useEffect(() => {
        const initialFiles: { [key: string]: FileEntry[] } = {};
        fileKeys.forEach(key => {
            const stored = localStorage.getItem(key);
            initialFiles[key] = stored ? JSON.parse(stored) : [];
        });
        setUploadedFiles(initialFiles);
    }, []);

    // const handleArquivoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, files } = e.target;
    //     if (!files || files.length === 0) return;

    //     const blockedExtensions = ['exe', 'bat', 'gif', 'HEIC', 'webp', 'heic', 'HEVC', 'hevc', 'svg'];

    //     for (const file of files) {
    //         const fileExtension = file.name.split('.').pop()?.toLowerCase();
    //         if (fileExtension && blockedExtensions.includes(fileExtension)) {
    //             setErrorBlockMessage(true);
    //             setBlockMessage(`Arquivos .${fileExtension} não são permitidos!`);
    //             e.target.value = '';
    //             return;
    //         }
    //     }

    //     setBlockMessage('');

    //     try {
    //         if (name === 'photo3x4File') {
    //             const file = files[0];
    //             const base64 = await readFileAsBase64(file);
    //             const newEntry: FileEntry = { fileName: file.name, data: base64 };

    //             localStorage.setItem(name, JSON.stringify([newEntry]));
    //             setUploadedFiles(prev => ({ ...prev, [name]: [newEntry] }));
    //         } else {
    //             const current = uploadedFiles[name] || [];
    //             const remaining = 4 - current.length;
    //             if (remaining <= 0) {
    //                 setErrorBlockMessage(true);
    //                 setBlockMessage('Máximo de 4 arquivos permitidos!');
    //                 e.target.value = '';
    //                 return;
    //             }

    //             const filesToAdd = Array.from(files).slice(0, remaining);
    //             const newEntries: FileEntry[] = await Promise.all(
    //                 filesToAdd.map(file =>
    //                     readFileAsBase64(file).then(base64 => ({
    //                         fileName: file.name,
    //                         data: base64
    //                     }))
    //                 )
    //             );

    //             const updated = [...current, ...newEntries];
    //             localStorage.setItem(name, JSON.stringify(updated));
    //             setUploadedFiles(prev => ({ ...prev, [name]: updated }));
    //         }
    //     } catch (error) {
    //         console.error('Error processing files:', error);
    //         setErrorBlockMessage(true);
    //         setBlockMessage('Erro ao processar arquivos');
    //     }
    //     e.target.value = '';
    // };

    // const readFileAsBase64 = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = () => resolve(reader.result as string);
    //         reader.onerror = reject;
    //         reader.readAsDataURL(file);
    //     });
    // };

    // const handleRemoveFile = (fileKey: string, index: number) => {
    //     const updated = uploadedFiles[fileKey].filter((_, i) => i !== index);
    //     localStorage.setItem(fileKey, JSON.stringify(updated));
    //     setUploadedFiles(prev => ({ ...prev, [fileKey]: updated }));
    // };


    const getFormData = (): Record<string, any> => {
        const keys = [
            'employeeFullName',
            'employeeNickname',
            'nameSocial',
            'nameMother',
            'nameFather',
            'employeeSex',
            'employeeBirthday',
            'employeeMaritalStatus',
            'employeeEthnicity',
            'employeeNationality',
            'brazillianExteriorBorn',
            'employeeNaturality',
            'employeeBornStateCode',
            'employeeBornState',
            'pis',
            'rg',
            'rgIssueDate',
            'rgUf',
            'idDocOrgIssuer',
            'rgOrgExpedition',
            'rgOrgIssuer',
            'professionalCard',
            'professionalCardSerial',
            'professionalCardUf',
            'ctpsIssueDate',
            'militaryServiceCard',
            'voterTitle',
            'voterZone',
            'voterSection',
            'addressType',
            'logradouroType',
            'logradouroDescription',
            'logradouroNumber',
            'employeeAddress',
            'employeeNeighborhood',
            'employeeState',
            'employeeMunicipe',
            'addressComplement',
            'cep',
            'issuerCountryCode',
            'rneNumber',
            'rneOrgIssuer',
            'rneIssueDate',
            'hasDisability',
            'residenceCountryForeign',
            'foreignResident',
            'foreignClassification',
            'marriedToBrazillian',
            'hasBrazillianChildren',
            'brazilArrivalDate',
            'naturalizationNumber',
            'naturalizationDate',
            'landlineDdd',
            'landline',
            'phoneDdd',
            'phone',
            'emailMain',
            'emailAlternative',
            'hasDability',
            'disabilityType',
            'disabilityComplements',
            'preEmployeeId',
            'bornMunicipeCode',
            'bornMunicipe'
        ];

        const data: Record<string, any> = {};
        keys.forEach(key => {
            data[key] = localStorage.getItem(key);
        });

        data.employeeAccessId = localStorage.getItem('accessId');
        return data;
    };

    function clearLocalStorageImages(keys: string[]): void {
        keys.forEach(key => {
            localStorage.removeItem(key);
        });
    }

    const saveProcess = async (): Promise<boolean> => {
        try {
            const accessId = localStorage.getItem('accessId');
            const token = localStorage.getItem('sessionToken');
            const response = await axios.post(
                `${baseUrl}employee/page/save-process`,
                null,
                {
                    headers: {
                        'session-token': token,
                        'access-id': accessId
                    }
                }
            );
            console.log('Processo salvo com sucesso:', response);
            return true;
        } catch (error: any) {
            console.error('Erro ao salvar o processo:', error);
            setError(true);
            clearLocalStorageImages(fileKeys);
            setOpenModal(false);
            return false;
        }
    };

    const saveProcessPut = async (): Promise<boolean> => {
        try {
            const accessId = localStorage.getItem('accessId');
            const token = localStorage.getItem('sessionToken');
            const response = await axios.put(
                `${baseUrl}employee/page/save-process`,
                {},
                {
                    headers: {
                        'session-token': token,
                        'access-id': accessId,
                    }
                }
            );
            console.log('Processo salvo com sucesso:', response);
            return true;
        } catch (error: any) {
            console.error('Erro ao salvar o processo:', error);
            setError(true);
            clearLocalStorageImages(fileKeys);
            setOpenModal(false);
            return false;
        }
    };

    const sendFiles = async (): Promise<boolean> => {
        const payloads = fileKeys.flatMap(key => {
            return (uploadedFiles[key] || []).map((file, index) => ({
                fileName: `${key}_${index + 1}`,
                fileExtension: getFileExtensionFromBase64(file.data),
                fileB64: file.data.split(',')[1]
            }));
        });

        try {
            const promises = payloads.map(payload =>
                axios.post(`${URL_FILES}`, { data: payload }, {
                    headers: {
                        'session-token': `${localStorage.getItem('sessionToken')}`,
                        "access-id": localStorage.getItem('accessId')
                    }
                })
            );
            await Promise.all(promises);
            return true;
        } catch (error) {
            console.error('Error sending files:', error);
            setError(true);
            clearLocalStorageImages(fileKeys);
            setOpenModal(false);
            return false;
        }
    };

    const getFileExtensionFromBase64 = (base64: string): string => {
        const match = base64.match(/^data:(.*?);base64,/);
        return match ? match[1].split('/')[1] : '';
    };

    const postForm = async (): Promise<boolean> => {
        try {
            const formData = getFormData();
            const token = localStorage.getItem('sessionToken');
            const response = await axios.post(URL_INFORMATIONS, {
                data: formData,
                token
            });
            console.log('Formulário enviado com sucesso (POST):', response.status);

            localStorage.setItem('employeePageId', response.data.data);
            return true;
        } catch (error: any) {
            console.error('Erro ao enviar o formulário (POST):', error.response?.data || error);
            setError(true);
            return false;
        }
    };

    const putForm = async (): Promise<boolean> => {
        try {
            const employeePageId = localStorage.getItem('employeePageId');
            const token = localStorage.getItem('sessionToken');
            const URL_INFORMATIONS_PUT = `${baseUrl}employee/page/${employeePageId}`;
            const formData = getFormData();

            const response = await axios.put(URL_INFORMATIONS_PUT, {
                data: formData,
                token
            });

            localStorage.setItem('employeePageId', response.data.data);
            return true;
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                console.warn('Conflito (409): possivelmente os arquivos já foram enviados.');
            } else {
                console.error('Erro ao atualizar o formulário (PUT):', error.response?.data || error);
                setError(true);
            }
            return false;
        }
    };

    const manage = async (): Promise<boolean> => {
        try {
            const hasInformation = localStorage.getItem('hasInformation') === 'true';
            const formSent = hasInformation ? await putForm() : await postForm();

            if (!formSent) {
                console.error('Erro ao enviar os dados do formulário.');
                return false;
            }

            const fileSent = await sendFiles();
            if (!fileSent) {
                console.error('Erro ao enviar os arquivos.');
                return false;
            }

            const putOrPost = hasInformation ? await saveProcessPut() : await saveProcess();

            if (!putOrPost) {
                console.error('Erro ao salvar o processo.');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro inesperado no fluxo de gerenciamento:', error);
            return false;
        }
    };

    const redirect = async () => {
        const ok = await manage();
        if (ok) {
            navigate('/feche-esta-aba');
        } else {
            setError(true);
        }
    };

    const validateImages = () => {
        //     const validationErrors: { [key: string]: string } = {};
        //     const put = localStorage.getItem("hasInformation");

        //     if (!put) {
        //         if (!uploadedFiles.photo3x4File?.length) validationErrors.photo3x4File = 'Campo obrigatório.';
        //         if (!uploadedFiles.cpfFile?.length) validationErrors.cpfFile = 'Campo obrigatório.';
        //         if (!uploadedFiles.administrativeHealthExaminationFile?.length) validationErrors.administrativeHealthExaminationFile = 'Campo obrigatório.';
        //         if (!uploadedFiles.addressProofFile?.length) validationErrors.addressProofFile = 'Campo obrigatório.';
        //         if (!uploadedFiles.PisProofFile?.length) validationErrors.PisProofFile = 'Campo obrigatório.';
        //         if (localStorage.getItem('employeeMaritalStatus') === '1' && !uploadedFiles.birthCertificateFile?.length) validationErrors.birthCertificateFile = 'Campo obrigatório.';
        //         if (localStorage.getItem('employeeMaritalStatus') === '2' && !uploadedFiles.marriageCertificateFile?.length) validationErrors.marriageCertificateFile = 'Campo obrigatório.';
        //         if (localStorage.getItem('employeeSex') === 'M' && !uploadedFiles.MilitaryDraftFile?.length) validationErrors.MilitaryDraftFile = 'Campo obrigatório.';
        //         if (!uploadedFiles.vaccineCardFile?.length) validationErrors.vaccineCardFile = 'Campo obrigatório.';
        //         if (!uploadedFiles.covidVaccineCardFile?.length) validationErrors.covidVaccineCardFile = 'Campo obrigatório.';
        //         if (!uploadedFiles.eSocialRegistrationQualification?.length) validationErrors.eSocialRegistrationQualification = 'Campo obrigatório.';
        //         if (!uploadedFiles.rgFile?.length) validationErrors.rgFile = 'Campo obrigatório.';
        //     }

        //     if (Object.keys(validationErrors).length > 0) {
        //         setErrors(validationErrors);
        //         return;
        //     }
        //     setErrors({});
        setOpenModal(true);
    };

    // const getLabel = (key: string): string => {
    //     const labels: Record<string, string> = {
    //         photo3x4File: 'Foto 3x4',
    //         lastJobCoverLetterFile: 'Carta de Apresentação do Último Emprego',
    //         administrativeHealthExaminationFile: 'Exame de Saúde Admissional',
    //         rgFile: 'RG',
    //         cpfFile: 'CPF',
    //         MilitaryDraftFile: 'Alistamento Militar',
    //         PisProofFile: 'Comprovante PIS',
    //         addressProofFile: 'Comprovante de Endereço',
    //         birthCertificateFile: 'Certidão de Nascimento',
    //         marriageCertificateFile: 'Certidão de Casamento',
    //         vaccineCardFile: 'Carteira de Vacinação',
    //         covidVaccineCardFile: 'Carteira de Vacinação COVID-19',
    //         courseCompetionCertificate_schoolTranscriptFile: 'Certificação de Conclusão de Curso / Histórico escolar',
    //         registrationStatement: 'Declaração de Matrícula (Em caso de Estagiário)',
    //         eSocialRegistrationQualification: 'Qualificação Cadastral do eSocial'
    //     };
    //     return labels[key] || key;
    // };


    // const isFieldVisible = (key: string) => {
    //     if (maritalStatus === '1' && key === 'marriageCertificateFile') {
    //         // Se for '1' (solteiro), não exibe o input de certidão de casamento
    //         return false;
    //     }
    //     if (maritalStatus === '2' && key === 'birthCertificateFile') {
    //         // Se for '2' (casado), não exibe o input de certidão de nascimento
    //         return false;
    //     }
    //     return true;
    // };


    return (
        <div className="bg-gray-300 w-full items-center content-center self-center">
            <div className="rounded-xl bg-white m-3 max-w-4xl w-full place-self-center">
                <h1 className="text-2xl text-center bg-gray-400 font-mono font-semibold rounded-t-xl p-2">
                    Confirmação de Envio:
                </h1>
                <div>
                    {/* {fileKeys.map(key => (
                        isFieldVisible(key) && (
                            <div key={key} className="m-3 border p-2 rounded-lg flex flex-col">
                                <label htmlFor={key} className="font-semibold">
                                    {getLabel(key)} {key !== 'lastJobCoverLetterFile' && key !== 'courseCompetionCertificate_schoolTranscriptFile' && key !== 'registrationStatement' ? '*' : ''}
                                </label>
                                <input
                                    className="bg-gray-100 text-sm w-11/12 p-1 m-2 border border-slate-500"
                                    name={key}
                                    type="file"
                                    onChange={handleArquivoChange}
                                    accept="image/*"
                                    multiple={key !== 'photo3x4File'}
                                />
                                {errors[key] && <span className="text-red-500 text-sm">{errors[key]}</span>}
                                <div className="text-sm text-gray-600">
                                    {uploadedFiles[key]?.map((file, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="bg-gray-300 m-1 p-1 rounded-lg">{file.fileName}</span>
                                            <button
                                                onClick={() => handleRemoveFile(key, index)}
                                                className="ml-2 p-2 rounded-xl hover:bg-gray-300"
                                            >
                                                <svg className="h-4 w-4 text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                                    <line x1="18" y1="9" x2="12" y2="15" />
                                                    <line x1="12" y1="9" x2="18" y2="15" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))} */}


                    <p className="p-9 font-bold text-xl text-center m-4 border shadow-xl rounded-xl bg-gray-100">Após o envio, seus dados serão encaminhados ao RH para análise, e você receberá um retorno em breve.</p>


                    <div className="flex justify-around">
                        <button type="button"
                            onClick={() => navigate('/situacoes-de-trabalho-e-condicoes-especiais')}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={validateImages}
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            <div className="flex flex-row">
                                <svg
                                    className="h-5 w-5 text-gray-100 mr-3"
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
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                open={openModal}
                onClose={handleCloseModal}>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center align-middle">
                    <div className="bg-slate-200 flex flex-col p-8 w-90 h-70 shadow-xl rounded-xl">
                        <button onClick={handleCloseModal} className="flex justify-end">
                            <svg className="h-5 w-5 text-slate-700"
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
                        </button>

                        <p className="font-bold text-xl pb-10">Confirmação</p>

                        <div>
                            <div className="pb-6 flex">
                                <p>Deseja Prosseguir?</p>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={redirect} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Sim
                                </button>

                                <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                    Não
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Ocorreu um erro, procure ajuda!
                </Alert>
            </Snackbar>

            {/* <Snackbar open={errorBlockMessage} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {blockMessage}
                </Alert>
            </Snackbar> */}
        </div>
    );
}