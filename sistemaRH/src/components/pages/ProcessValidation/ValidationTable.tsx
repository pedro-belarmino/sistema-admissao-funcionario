import axios from "axios";
import { useEffect, useState } from "react";
// import { useMemo} from "react";
import { baseUrl } from "../../../../shareUrl";
import Inputs from "../../shared/Inputs";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

const URL_GET_LIST = `${baseUrl}registration/list/filtered`;
const URL_GET = `${baseUrl}registration/`;
const URL_PUT = `${baseUrl}registration/update-status/`


interface HiringList {
    registrationId: string;
    status: string;
    templateId: string;
    accessId: string;
    employeeName: string;
}

interface HiringGet {
    userCreatedAt: string;
    userUpdatedAt: string;
    createdAt: string;
    updatedAt: string;
    registrationId: string;
    employeePageId: string;
    epId: string;
    employeeFullName: string;
    employeeNickname: string;
    nameSocial: string;
    nameMother: string;
    nameFather: string;
    employeeSex: string;
    employeeBirthday: string;
    employeeMaritalStatus: string;
    employeeEthnicity: string;
    employeeNationality: string;
    brazillianExteriorBorn: string;
    employeeNaturality: string;
    employeeBornStateCode: string;
    employeeBornState: string;
    pis: string;
    rg: string;
    rgIssueDate: string;
    rgUf: string;
    idDocOrgIssuer: string;
    rgOrgExpedition: string;
    rgOrgIssuer: string;
    rgComplement: string;
    professionalCard: string;
    professionalCardSerial: string;
    professionalCardUf: string;
    ctpsIssueDate: string;
    cnh: string;
    cnhOrgIssuer: string;
    cnhIssueDate: string;
    cnhExpiration: string;
    cnhCategory: string;
    cnhUf: string;
    militaryServiceCard: string;
    voterTitle: string;
    voterZone: string;
    voterSection: string;
    civilRegister: string;
    civilCertificateType: string;
    civilCertificateBook: string;
    civilCertificateUf: string;
    civilCertificateMunicipeCode: string;
    civilCertificateIssueDate: string;
    passportNumber: string;
    passportIssuer: string;
    passportIssueDate: string;
    passportExpiration: string;
    passportUf: string;
    ricNumber: string;
    ricIssuer: string;
    ricUf: string;
    ricMunicipeCode: string;
    ricExpeditionDate: string;
    addressType: string;
    logradouroType: string;
    logradouroNumber: string;
    employeeAddress: string;
    employeeNeighborhood: string;
    employeeState: string;
    employeeMunicipe: string;
    registerNumber: string;
    addressNumber: string;
    addressComplement: string;
    postalCode: string;
    cep: string;
    postalCodeCep: string;
    originCountryCode: string;
    issuerCountryCode: string;
    rneNumber: string;
    rneOrgIssuer: string;
    rneIssueDate: string;
    residenceCountryForeign: string;
    foreignResident: string;
    foreignClassification: string;
    marriedToBrazillian: string;
    hasBrazillianChildren: string;
    brazilArrivalDate: string;
    naturalizationNumber: string;
    naturalizationDate: string;
    landlineDdd: string;
    landline: string;
    phoneDdd: string;
    phone: string;
    emailMain: string;
    emailAlternative: string;
    hasDisability: string;
    disabilityType: string;
    esocialDisabilityType: string;
    disabilityComplements: string;
    brPdh: string;
    isRetired: string;
    raisDegreeCode: string;
    preEmployeeId: string;
    employeeAccessId: string;
    accessId: string;
    employeeName: string;
    receivesEmail: string;
    receivesEmailType: string;
    employeeCpf: string;
    admissionDate: string;
    admissionType: string;
    workContractType: string;
    experienceExpiration: string;
    experienceExpiration2: string;
    medicalExamExpiration: string;
    stabilityExpiration: string;
    contractTerminationExpiration: string;
    contractPartial: string;
    workshiftCode: string;
    workshiftDescription: string;
    workshiftStartSequence: string;
    appointmentRule: string;
    appointmentDescription: string;
    documentType: string;
    workRegimen: string;
    workJourneyType: string;
    workJourneyHourly: string;
    blockAdmission: string;
    workState: string;
    workMunicipality: string;
    workMunicipalityDescription: string;
    fgtsBankAgency: string;
    fgtsDepositAccount: string;
    fgtsDepositPercentage: string;
    salaryBankAgency: string;
    salaryAccountType: string;
    salaryDepositAccount: string;
    benefitDeliveryLocation: string;
    benefitDeliveryDescription: string;
    contributionAssistential: string;
    contributionConferative: string;
    sindicalMensality: string;
    sindicateCode: string;
    sindicateDescription: string;
    incomeTaxDependantNumber: string;
    medicalAssistanceType: string;
    medicalAssistanceCode: string;
    medicalAssistanceDependantNumber: string;
    dentalAssistanceType: string;
    dentalAssistanceCode: string;
    hasHealthInsurance: string;
    employeeCategory: string;
    raisLink: string;
    sefipCategory: string;
    esocialWorkCategory: string;
    previdentialRegimenType: string;
    advancePercentage: string;
    saturndayCompensation: string;
    bankHoursPage: string;
    bankHoursAccumulated: string;
    professionalCardUpdated: string;
    pisNumberUpdated: string;
    remunerationVariationDescription: string;
    disabilityQuota: string;
    templateId: string;
    templateName: string;
    branchCode: string;
    centerCostCode: string;
    centerCostDescription: string;
    functionCode: string;
    functionDescription: string;
    roleCode: string;
    roleDescription: string;
    hoursWeekly: string;
    hoursDaily: string;
    periculosityHours: string;
    paymentType: string;
    hasInsalubrity: string;
    insalubrityHours: string;
    departmentCode: string;
    departmentDescription: string;
    hoursMonthly: string;
    salary: string;
    salaryBaseDis: string;
    sindicalContribution: string;
    hasPericulosity: string;
    employeePage: any;
    access: any;
    template: any;
    page: any
}

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }


function formatPercentage(number: string): string {
    if (number === null || number === undefined) {
        throw new TypeError('O valor não pode ser nulo ou indefinido.');
        return ''
    }

    // Converte o valor para string
    const numberString = number.toString();

    // Substitui vírgula por ponto e converte para número
    const numberPercentage = parseFloat(numberString.replace(',', '.'));

    // Calcula a porcentagem e retorna como string
    const result = numberPercentage * 100;
    return `${result.toFixed(2)}%`; // Arredonda para 2 casas decimais
}
const formatPaymentType = (letter: string) => {
    if (letter === "M") {
        return "Pagamento Mensal"
    } else if (letter === "S") {
        return "Pagamento Semanal"
    } else return ""
}
const formatSindicalContribution = (letter: string) => {
    switch (letter) {
        case 'D': return 'FUNC. ADMITIDO MES ANTERIOR E DEVE PAGAR IMP.SINDICAL'
        case 'N': return 'FUNC. NAO PAGA IMPOSTO SINDICAL'
        case 'P': return 'FUNC. JA PAGOU IMP. SINDICAL NO ANO CORRENTE'
        case 'S': return 'FUNC PAGA IMPOSTO SINDICAL'
        case 'T': return 'FUNC. PAGA IMP. SINDICAL POREM SO 1 MES APOS ADMISSAO'
        default: return ''
    }
}
const formatHasInsalubrity = (number: string) => {
    switch (number) {
        case '1': return 'Não'
        case '2': return 'Mínima'
        case '3': return 'Média'
        case '4': return 'Máxima'
        default: return ''
    }
}
const formatNoYes = (number: string) => {
    if (number === '1') {
        return 'Não'
    } else if (number === '2') {
        return 'Sim'
    } else return ''
}
const formatReceivesEmail = (letter: string) => {
    if (letter === 'S') {
        return 'Sim'
    } else if (letter === 'N') {
        return 'Não'
    } else return ''
}
const formatReceivesEmailType = (number: string) => {
    switch (number) {
        case '1': return 'Cópias Eletrônicas'
        case '2': return 'Cópias em Papel'
        case '3': return 'Ambos'
        case '4': return 'Não Recebe'
        default: return ''
    }
}
const formatCPF = (number: string) => {
    const cpf = number.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
const formatDate = (number: string | null) => {
    if (number === '' || number === null) {
        return
    } else if (number.length === 8) {
        const date = number.replace(/[^\d]/g, "");
        return date.replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1");
    } else {
        return ''
    }
}
const formatWorkContractType = (number: string) => {
    switch (number) {
        case '1': return 'Indeterminado';
        case '2': return 'Determinado';
        case '3': return 'Intermitente';
        default: return ''
    }
}
const formatYesNo = (number: string) => {
    if (number === '1') {
        return 'Sim'
    } else if (number === '2') {
        return 'Não'
    } else return ''
}
const formatWorkRegimen = (number: string) => {
    if (number === '1') {
        return 'CLT'
    } else if (number === '2') {
        return 'Estatuário'
    } else return ''
}
const formatWorkJourneyType = (number: string) => {
    switch (number) {
        case '1': return 'Submetidos à Hora de Trabalho';
        case '2': return 'Atividade Externa Especificada';
        case '3': return 'FUnções Especificadas';
        case '4': return 'Teletrabalho';
        default: return '';
    }
}
const formatReverseData = (dataStr: string | null) => {
    if (dataStr === '' || dataStr === null) {
        return
    } else if (dataStr.length === 8) {
        const date = dataStr.replace(/[^\d]/g, "");
        return date.replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1");
    } else {
        return ''
    }
}
const formatDocumentType = (number: string) => {
    switch (number) {
        case '1': return 'Cópias eletronicas';
        case '2': return 'Cópias em papel';
        case '3': return 'Ambos';
        case '4': return 'Não recebe';
        default: return ''
    }
}
const formatPrevidentialRegimenType = (number: string) => {
    switch (number) {
        case '1': return 'RGPS - Reg. Geral Previdência Social';
        case '2': return 'RPPS - Reg. Próptio Previdência Social';
        case '3': return 'RPPE - Reg. Próptio Previdência Social Exterior';
        default: return '';
    }
}
const formatYesNoLetter = (letter: string) => {
    if (letter === 'S') {
        return 'SIM'
    } else if (letter == 'N') {
        return 'NÃO'
    } else return ''
}
const formatSex = (letter: string) => {
    if (letter === 'M') {
        return 'Masculino'
    } else if (letter === 'F') {
        return 'Feminino'
    } else return ''
}
const formatMaritalStatus = (number: string) => {
    switch (number) {
        case '1': return 'Solteiro';
        case '2': return 'Casado';
        case '3': return 'Divorciado'
        case '4': return 'Viuvo'
        default: ''
    }
}
const formatEthnicity = (number: string) => {
    switch (number) {
        case '1': return 'Indígena';
        case '2': return 'Branco';
        case '4': return 'Preto';
        case '6': return 'Amarelo';
        case '8': return 'Pardo';
        case '9': return 'Não Informar';
        default: ''
    }
}
const formatNationality = (number: string) => {
    switch (number) {
        case '1': return 'Brasileiro';
        case '2': return 'Estrangeiro';
        case '3': return 'Naturalizado';
        default: ''
    }
}
const formatState = (state: string | null): string => {
    if (!state) return "";

    const statesMap: Record<string, string> = {
        'SP': 'São Paulo',
        'RJ': 'Rio de Janeiro',
        'MG': 'Minas Gerais',
        'ES': 'Espírito Santo',
        'PR': 'Paraná',
        'SC': 'Santa Catarina',
        'RS': 'Rio Grande do Sul',
        'BA': 'Bahia',
        'PE': 'Pernambuco',
        'CE': 'Ceará',
        'GO': 'Goiás',
        'AM': 'Amazonas',
        'PA': 'Pará',
        'MT': 'Mato Grosso',
        'MS': 'Mato Grosso do Sul',
        'DF': 'Distrito Federal',
        'TO': 'Tocantins',
        'MA': 'Maranhão',
        'PI': 'Piauí',
        'RN': 'Rio Grande do Norte',
        'AL': 'Alagoas',
        'SE': 'Sergipe',
        'RO': 'Rondônia',
        'AC': 'Acre',
        'AP': 'Amapá',
        'RR': 'Roraima'
    };

    return statesMap[state.toUpperCase()] || 'Estado não encontrado';
};
const formatRG = (number: string) => {
    if (number.length == 9) {
        const date = number.replace(/[^\d]/g, "");
        return date.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-$4");
    } else return 'cu'
}
const formatSalaryBaseDis = (number: string) => {
    return `${number}%`
}
// function base64ToDataUrl(base64: string, mimeType: string = 'application/octet-stream'): string {
//     if (base64.startsWith('data:')) return base64;
//     const cleanBase64 = base64.replace(/^data:.*?;base64,/, '');
//     return `data:${mimeType};base64,${cleanBase64}`;
// }

export default function ValidationTable() {
    const [hiringList, setHiringList] = useState<HiringList[]>([]);
    const [hiringGet, setHiringGet] = useState<HiringGet | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [obs, setObs] = useState<string>('');
    const [sendError, setSendError] = useState<string>('');
    const [idSelected, setIdSelected] = useState<string>('');
    const [sucess, setSucess] = useState(false)
    const [modal, setModal] = useState(false)


    // const [militaryDraftFiles, setMilitaryDraftFiles] = useState<any[]>([]);
    // const [rgFiles, setRgFiles] = useState<any[]>([]);
    // const [photo3x4Files, setPhoto3x4Files] = useState<any[]>([]);
    // const [addressProofFiles, setAddressProofFiles] = useState<any[]>([]);
    // const [marriageCertificateFiles, setMarriageCertificateFiles] = useState<any[]>([]);
    // const [administrativeHealthExaminationFiles, setAdministrativeHealthExaminationFiles] = useState<any[]>([]);
    // const [registrationStatementFiles, setRegistrationStatementFiles] = useState<any[]>([]);
    // const [cpfFiles, setCpfFiles] = useState<any[]>([]);
    // const [lastJobCoverLetterFiles, setLastJobCoverLetterFiles] = useState<any[]>([]);
    // const [birthCertificateFileFiles, setBirthCertificateFileFiles] = useState<any[]>([]);
    // const [covidVaccineCardFiles, setCovidVaccineCardFiles] = useState<any[]>([]);
    // const [courseCompetionCertificate_schoolTranscriptFiles, setCourseCompetionCertificate_schoolTranscriptFiles] = useState<any[]>([]);
    // const [eSocialRegistrationQualificationFiles, setESocialRegistrationQualificationFiles] = useState<any[]>([]);
    // const [vaccineCardFiles, setVaccineCardFiles] = useState<any[]>([]);

    // const [value, setValue] = useState(0);

    // const [modalPreview, setModalPreview] = useState(false)
    // const [fullImage, setFullImage] = useState<string>('')

    // function handleClosePreview() {
    //     setModalPreview(false)
    // }

    // const allFiles = {
    //     militaryDraftFiles,
    //     rgFiles,
    //     photo3x4Files,
    //     addressProofFiles,
    //     marriageCertificateFiles,
    //     administrativeHealthExaminationFiles,
    //     registrationStatementFiles,
    //     cpfFiles,
    //     lastJobCoverLetterFiles,
    //     birthCertificateFileFiles,
    //     covidVaccineCardFiles,
    //     courseCompetionCertificate_schoolTranscriptFiles,
    //     eSocialRegistrationQualificationFiles,
    //     vaccineCardFiles
    // };

    // const fileCategories = [
    //     { key: 'photo3x4Files', label: 'Fotos 3x4', name: 'Foto 3x4' },
    //     { key: 'rgFiles', label: 'RG', name: 'Documento de Identidade' },
    //     { key: 'cpfFiles', label: 'CPF', name: 'CPF' },
    //     { key: 'addressProofFiles', label: 'Comprovante de Endereço', name: 'Comprovante' },
    //     { key: 'administrativeHealthExaminationFiles', label: 'Exame Saúde', name: 'Exame Médico' },
    //     { key: 'vaccineCardFiles', label: 'Carteira de Vacinação', name: 'Vacinação' },
    //     { key: 'covidVaccineCardFiles', label: 'Carteira Vacina COVID', name: 'Vacina COVID' },
    //     { key: 'birthCertificateFileFiles', label: 'Certidão de Nascimento', name: 'Certidão' },
    //     { key: 'marriageCertificateFiles', label: 'Certidão de Casamento', name: 'Certidão' },
    //     { key: 'militaryDraftFiles', label: 'Comprovante Militar', name: 'Documento Militar' },
    //     { key: 'lastJobCoverLetterFiles', label: 'Carta de Referência', name: 'Carta' },
    //     { key: 'registrationStatementFiles', label: 'Declaração Matrícula', name: 'Declaração' },
    //     { key: 'courseCompetionCertificateFiles', label: 'Certificado de Curso', name: 'Certificado' },
    //     { key: 'eSocialRegistrationQualificationFiles', label: 'Qualificação eSocial', name: 'eSocial' },
    // ];

    // const activeCategories = fileCategories.filter(
    //     category => allFiles[category.key as keyof typeof allFiles]?.length > 0
    // );

    const handleObs = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setObs(e.target.value)
        const inputValue = e.target.value;
        if (inputValue.length === 1) {
            setObs(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
        } else {
            setObs(inputValue);
        }
    }

    const fetchList = async () => {
        setLoading(true)
        setError(null)
        try {

            const response = await axios.get(URL_GET_LIST, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            });
            setHiringList(response.data.data);

        } catch (error) {
            console.error("Erro ao buscar a lista:", error);
            setError("Erro ao buscar a lista de processos.")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchList();
    }, []);


    const getHiring = async (id: string) => {
        setLoading(true)
        setError(null)
        setIdSelected(id)
        try {
            const response = await axios.get(`${URL_GET}${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            })
            const responseData = response.data.data
            setHiringGet(responseData)


            // function processAttachmentList(attachmentList: any[]): string[] {
            //     return attachmentList
            //         .map((item) => {
            //             if (!item?.fileB64) return null;
            //             try {
            //                 const mimeType = item.fileB64.match(/^data:(.*?);/)?.[1] ||
            //                     (item.fileB64.startsWith('JVBER') ? 'application/pdf' : 'application/octet-stream');
            //                 return base64ToDataUrl(item.fileB64, mimeType);
            //             } catch (error) {
            //                 console.error('Erro ao converter arquivo:', error);
            //                 return null;
            //             }
            //         })
            //         .filter((url): url is string => !!url);
            // }

            // const processAllAttachments = (responseData: any) => {
            //     setMilitaryDraftFiles(processAttachmentList(responseData.attachments.MilitaryDraftFile || []));
            //     setRgFiles(processAttachmentList(responseData.attachments.rgFile || []));
            //     setPhoto3x4Files(processAttachmentList(responseData.attachments.photo3x4File || []));
            //     setAddressProofFiles(processAttachmentList(responseData.attachments.addressProofFile || []));
            //     setMarriageCertificateFiles(processAttachmentList(responseData.attachments.marriageCertificateFile || []));
            //     setAdministrativeHealthExaminationFiles(processAttachmentList(responseData.attachments.administrativeHealthExaminationFile || []));
            //     setRegistrationStatementFiles(processAttachmentList(responseData.attachments.registrationStatementFile || []));
            //     setCpfFiles(processAttachmentList(responseData.attachments.cpfFile || []));
            //     setLastJobCoverLetterFiles(processAttachmentList(responseData.attachments.lastJobCoverLetterFile || []));
            //     setBirthCertificateFileFiles(processAttachmentList(responseData.attachments.birthCertificateFile || []));
            //     setCovidVaccineCardFiles(processAttachmentList(responseData.attachments.covidVaccineCardFile || []));
            //     setCourseCompetionCertificate_schoolTranscriptFiles(processAttachmentList(responseData.attachments.courseCompetionCertificate_schoolTranscriptFile || []));
            //     setESocialRegistrationQualificationFiles(processAttachmentList(responseData.attachments.eSocialRegistrationQualification || []));
            //     setVaccineCardFiles(processAttachmentList(responseData.attachments.vaccineCardFile || []));
            // };

            // processAllAttachments(responseData);


        } catch (error) {
            setError("Erro ao buscar o processo.")
        } finally {
            setLoading(false)
        }
    }


    const validateFields = () => {


        if (!selectedOption) {
            setSendError('Selecione uma opção!')

            return false;
        }
        if (selectedOption == 'REJECTED') {
            if (!obs) {
                setSendError('Adicione um motivo para sua rejeição!')

                return false;
            }
        }
        return true
    }

    const ValidateStatusProccess = async () => {


        try {
            await axios.put(`${URL_PUT}${idSelected}`, {
                data: {
                    status: selectedOption,
                    description: obs,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            }
            )
            setSucess(true)
            setHiringGet(null)
            setModal(false)
            setObs('')
            fetchList()
        } catch (error: any) {
            console.log('deu erro', error.response)
            setSucess(false)

        }
    }

    const handleClose = () => {
        setSucess(false);
    };


    const handleModal = () => {
        let validate = validateFields()

        if (validate) {
            setSendError('')
            setModal(true)
        } else {
            return;
        }
    }

    const handleCloseModal = () => {
        setModal(false);
    };

    // function viewImage(src: string) {
    //     setFullImage(src)
    //     setModalPreview(true)
    // }


    // const downloadArchive = async (archiveId: string) => {
    //     const URL_DOWNLOAD = `${baseUrl}attachment/backoffice/${archiveId}`;

    //     try {
    //         const response = await axios.get(URL_DOWNLOAD, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 'opbase-id': localStorage.getItem('operationalBase')
    //             },
    //         });

    //         const data = response.data.data;
    //         const base64Image = data.fileB64;
    //         const imageExtension = data.fileExtension || 'png';

    //         const downloadBase64File = () => {

    //             const base64 = base64Image;
    //             const filename = `file.${imageExtension}`;
    //             const mimeType = `data:image/${imageExtension};base64,`;

    //             const byteString = atob(base64);
    //             const byteNumbers = new Uint8Array(byteString.length);

    //             for (let i = 0; i < byteString.length; i++) {
    //                 byteNumbers[i] = byteString.charCodeAt(i);
    //             }

    //             // Create a Blob from the byte array
    //             const blob = new Blob([byteNumbers], { type: mimeType });

    //             // Create a temporary download link
    //             const link = document.createElement('a');
    //             link.href = URL.createObjectURL(blob);
    //             link.download = filename;

    //             // Append the link to the document and trigger the download
    //             document.body.appendChild(link);
    //             link.click();

    //             // Cleanup: remove the link and revoke the Blob URL
    //             document.body.removeChild(link);
    //             URL.revokeObjectURL(link.href);
    //         };

    //         downloadBase64File()


    //     } catch (error) {
    //         console.error('Erro ao baixar a imagem:', error);
    //     }


    // };


    // const OptimizedImage = React.memo(({ src, alt, title }: { src: string; alt: string; title: string }) => (
    //     <div className="w-52 h-52 flex flex-col shadow-xl rounded-xl bg-gray-400 overflow-hidden cursor-pointer"
    //         onClick={() => viewImage(src)}
    //     >
    //         <p className="text-center p-1 font-medium bg-gray-500">{title}</p>
    //         <div className="flex-1 flex items-center justify-center p-1">
    //             <img
    //                 src={src}
    //                 alt={alt}
    //                 loading="lazy"
    //                 className="w-40 h-40 object-cover rounded-lg "
    //             />
    //         </div>
    //     </div>
    // ));

    // const militaryDraftComponents = useMemo(() => {
    //     return militaryDraftFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`military-${index}`}
    //                 src={url}
    //                 alt={`Comprovante militar ${index}`}
    //                 title={`Comprovante Militar -${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [militaryDraftFiles]);

    // const rgComponents = useMemo(() => {
    //     return rgFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`rg-${index}`}
    //                 src={url}
    //                 alt={`RG ${index}`}
    //                 title={`RG - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [rgFiles]);

    // const photo3x4Components = useMemo(() => {
    //     return photo3x4Files.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`photo3x4-${index}`}
    //                 src={url}
    //                 alt={`Foto 3x4 ${index}`}
    //                 title={`Foto 3x4 - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [photo3x4Files]);

    // const addressProofComponents = useMemo(() => {
    //     return addressProofFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`addressProof-${index}`}
    //                 src={url}
    //                 alt={`Comprovante Endereço ${index}`}
    //                 title={`Comprovante Endereço - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [addressProofFiles]);

    // const marriageCertificateComponents = useMemo(() => {
    //     return marriageCertificateFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`marriageCertificate-${index}`}
    //                 src={url}
    //                 alt={`Certidão de Casamento ${index}`}
    //                 title={`Certidão de Casamento - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [marriageCertificateFiles]);

    // const administrativeHealthExaminationComponents = useMemo(() => {
    //     return administrativeHealthExaminationFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`administrativeHealthExamination-${index}`}
    //                 src={url}
    //                 alt={`Exame de Saúde ${index}`}
    //                 title={`Exame de Saúde - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [administrativeHealthExaminationFiles]);

    // const registrationStatementComponents = useMemo(() => {
    //     return registrationStatementFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`registrationStatement-${index}`}
    //                 src={url}
    //                 alt={`Declaração de Matrícula ${index}`}
    //                 title={`Declaração de Matrícula - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [registrationStatementFiles]);

    // const cpfComponents = useMemo(() => {
    //     return cpfFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`cpf-${index}`}
    //                 src={url}
    //                 alt={`CPF ${index}`}
    //                 title={`CPF - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [cpfFiles]);

    // const lastJobCoverLetterComponents = useMemo(() => {
    //     return lastJobCoverLetterFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`lastJobCoverLetter-${index}`}
    //                 src={url}
    //                 alt={`Carta de Apresentação do Último Emprego${index}`}
    //                 title={`Carta de Apresentação do Último Emprego - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [lastJobCoverLetterFiles]);

    // const birthCertificateFileComponents = useMemo(() => {
    //     return birthCertificateFileFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`birthCertificateFile-${index}`}
    //                 src={url}
    //                 alt={`Certidão de Nascimento ${index}`}
    //                 title={`Certidão de Nascimento - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [birthCertificateFileFiles]);

    // const covidVaccineCardComponents = useMemo(() => {
    //     return covidVaccineCardFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`covidVaccineCard-${index}`}
    //                 src={url}
    //                 alt={`Carteira de Vacinação COVID-19 ${index}`}
    //                 title={`Carteira de Vacinação COVID-19 - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [covidVaccineCardFiles]);

    // const courseCompetionCertificate_schoolTranscriptComponents = useMemo(() => {
    //     return courseCompetionCertificate_schoolTranscriptFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`courseCompetionCertificate_schoolTranscript-${index}`}
    //                 src={url}
    //                 alt={`Certificação de Conclusão de Curso / Histórico escolar ${index}`}
    //                 title={`Certificação de Conclusão de Curso / Histórico escolar - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [courseCompetionCertificate_schoolTranscriptFiles]);

    // const eSocialRegistrationQualificationComponents = useMemo(() => {
    //     return eSocialRegistrationQualificationFiles.map((url, index) => (
    //         <div className="text-white space-x-3 place-self-center">
    //             <OptimizedImage
    //                 key={`eSocialRegistrationQualification-${index}`}
    //                 src={url}
    //                 alt={`Qualificação Cadastral do eSocial ${index}`}
    //                 title={`Qualificação Cadastral do eSocial - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [eSocialRegistrationQualificationFiles]);

    // const vaccineCardComponents = useMemo(() => {
    //     return vaccineCardFiles.map((url, index) => (
    //         <div className="text-white space-y-3 place-self-center">
    //             <OptimizedImage
    //                 key={`vaccineCard-${index}`}
    //                 src={url}
    //                 alt={`Carteira de Vacinação ${index}`}
    //                 title={`Carteira de Vacinação - ${index + 1}`}
    //             />
    //         </div>
    //     ));
    // }, [vaccineCardFiles]);



    if (loading) {
        return (
            <>
                <div className="w-40 place-self-center p-10">
                    <img src="src/assets/images/loadingGif.gif" alt="" />
                    <p className="font-semibold">Loading...</p>
                </div>
            </>
        )
    }


    // function CustomTabPanel(props: TabPanelProps) {
    //     const { children, value, index, ...other } = props;

    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`simple-tabpanel-${index}`}
    //             aria-labelledby={`simple-tab-${index}`}
    //             {...other}
    //         >
    //             {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    //         </div>
    //     );
    // }



    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);
    //     event
    // };
    // function a11yProps(index: number) {
    //     return {
    //         id: `simple-tab-${index}`,
    //         'aria-controls': `simple-tabpanel-${index}`,
    //     };
    // }

    // const TabContentWrapper = ({ children }: { children: React.ReactNode[] }) => {
    //     const count = React.Children.count(children);

    //     if (count === 1) {
    //         return (
    //             <div className="flex items-center justify-center h-full">
    //                 {children}
    //             </div>
    //         );
    //     }

    //     if (count === 2) {
    //         return (
    //             <div className="flex flex-col space-y-4">
    //                 {children}
    //             </div>
    //         );
    //     }

    //     return (
    //         <div className="grid grid-cols-2 gap-4">
    //             {children}
    //         </div>
    //     );
    // };



    return (
        <div>


            {error && <p className="text-red-600 font-semibold text-lg bg-red-200">{error}</p>}
            <p className="dark:text-white flex p-5 text-2xl font-semibold">Validação de Processos</p>
            <div className="m-5">
                <div className="bg-gray-200 dark:bg-gray-800 pt-5 pb-5 rounded-xl divide-x divide-gray-600 dark:divide-gray-100 flex shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-full">

                    <div className="w-4/12">
                        <div id="esquerda" className="m-5 divide-y divide-gray-600 dark:divide-gray-100">
                            <div>
                                <p className="p-2 text-xl dark:text-white font-semibold">Processos</p>
                            </div>
                            <div className="pt-6">
                                <table className="w-full max-w-full dark:text-white">
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
                                            <tr key={item.registrationId}>
                                                <td className="p-1 border border-gray-400 dark:border-gray-600">{item.templateId}</td>
                                                <td className="p-1 border border-gray-400 dark:border-gray-600">{item.accessId}</td>
                                                <td className="p-1 border border-gray-400 dark:border-gray-600 text-start text-sm">{item.employeeName}</td>
                                                <td className="p-1 border border-gray-400 dark:border-gray-600">
                                                    <button onClick={() => getHiring(item.registrationId)}>
                                                        <svg className="h-5 w-5 text-slate-900 dark:text-gray-200"
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
                                                            <line x1="16" y1="12" x2="8" y2="12" />
                                                            <line x1="16" y1="12" x2="12" y2="16" />
                                                            <line x1="16" y1="12" x2="12" y2="8" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>




                    <div className="w-8/12">
                        <div id="direita" className="m-5 divide-y divide-gray-600 dark:divide-gray-100">
                            <div>
                                <p className="p-2 text-xl dark:text-white font-semibold">Detalhes do Processo</p>
                            </div>
                            {hiringGet && (
                                <div className="mb-8">
                                    <div className="mt-6 mb-8 bg-gray-300 border dark:bg-slate-600 dark:text-white border-gray-600 rounded-xl">
                                        <div className="m-5">

                                            {/*A*/}
                                            <div className=" border border-gray-400 rounded-xl mb-8 p-8 flex flex-col">
                                                <p className="flex text-lg font-semibold mb-5">Informações do Template de Vaga</p>

                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="templateName">Nome do Template:</label>
                                                        <Inputs className="border w-full dark:text-black border-gray-500 rounded-md p-1" type="text" name="templateName" value={hiringGet.template.templateName} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="branchCode">Base Operacional:</label>
                                                        <Inputs className="border w-full dark:text-black border-gray-500 rounded-md p-1" type="text" name="branchCode" value={hiringGet.template.branchDescription} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="centerCostCode">Código Centro de Custo:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="centerCostCode" value={hiringGet.template.centerCostCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="centerCostDescription">Descrição Centro de Custo:</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="centerCostDescription" value={hiringGet.template.centerCostDescription} readOnly />
                                                    </div>


                                                </div>


                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="functionCode">Código da Função:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="functionCode" value={hiringGet.template.functionCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="functionDescription">Descrição da função:</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="functionDescription" value={hiringGet.template.functionDescription} readOnly />
                                                    </div>


                                                </div>


                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="roleCode">Código do Cargo:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="roleCode" value={hiringGet.template.roleCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="roleDescription">Descrição do Cargo:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 w-full rounded-md p-1" type="text" name="roleDescription" value={hiringGet.template.roleDescription} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="departmentCode">Código Departamento:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="departmentCode" value={hiringGet.template.departmentCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="departmentDescription">Descrição do Departamento:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-full" type="text" name="departmentDescription" value={hiringGet.template.departmentDescription} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hoursDaily">Horas Diárias:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="hoursDaily" value={hiringGet.template.hoursDaily} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hoursWeekly">Horas Semanais:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="hoursWeekly" value={hiringGet.template.hoursWeekly} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hoursMonthly">Horas Mensais:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="hoursMonthly" value={hiringGet.template.hoursMonthly} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start w-full justify-around mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="salary">Salário:</label>
                                                        <Inputs className="border w-6/12 dark:text-black border-gray-500 rounded-md p-1" type="text" name="salary" value={hiringGet.template.salary} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="salaryBaseDis">Salário Base Dissidio:</label>
                                                        <Inputs className="border w-6/12 dark:text-black border-gray-500 rounded-md p-1" type="text" name="salaryBaseDis" value={formatSalaryBaseDis(hiringGet.template.salaryBaseDis)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="paymentType">Tipo de Pagamento:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="paymentType" value={formatPaymentType(hiringGet.template.paymentType)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="mb-5 flex flex-col">
                                                    <label htmlFor="sindicalContribution">Contribuição Sindical:</label>
                                                    <Inputs className="border dark:text-black w-9/12 text-center border-gray-500 rounded-md p-1" type="text" name="sindicalContribution" value={formatSindicalContribution(hiringGet.access.sindicalContribution)} readOnly />
                                                </div>

                                                <div className="flex text-start justify-around mb-5 divide-x divide-gray-500">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hasInsalubrity">Tem Insalubridade?</label>
                                                        <Inputs className="border dark:text-black w-24 text-center border-gray-500 rounded-md p-1" type="text" name="hasInsalubrity" value={formatHasInsalubrity(hiringGet.template.hasInsalubrity)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="insalubrityHours">Horas de Insalubridade:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 w-12 rounded-md p-1" type="text" name="insalubrityHours" value={hiringGet.template.insalubrityHours} readOnly />
                                                    </div>

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="hasPericulosity">Tem Periculosidade:</label>
                                                        <Inputs className="border dark:text-black w-24 text-center border-gray-500 rounded-md p-1" type="text" name="hasPericulosity" value={formatNoYes(hiringGet.template.hasPericulosity)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="periculosityHours">Horas de Periculosidade:</label>
                                                        <Inputs className="border dark:text-black w-12 border-gray-500 rounded-md p-1" type="text" name="periculosityHours" value={hiringGet.template.periculosityHours} readOnly />
                                                    </div>

                                                </div>

                                            </div>

                                            {/*B*/}
                                            <div className=" border border-gray-400 rounded-xl mb-8 p-8 flex flex-col">
                                                <p className="flex text-lg font-semibold mb-5">Informações do Cadastro de Contratação</p>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeName">Nome do Funcionário:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="employeeName" value={hiringGet.access.employeeName} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeCpf">CPF do Funcionário:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md w-40 p-1" type="text" name="employeeCpf" value={formatCPF(hiringGet.access.employeeCpf)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="receivesEmail">Recebe email:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-14" type="text" name="receivesEmail" value={formatReceivesEmail(hiringGet.access.receivesEmail)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="receivesEmailType">Tipo de Recebimento de Emal:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="receivesEmailType" value={formatReceivesEmailType(hiringGet.access.receivesEmailType)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="admissionDate">Data de Admissão:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md w-24 p-1" type="text" name="admissionDate" value={formatDate(hiringGet.access.admissionDate)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="admissionType">Tipo de Admissão:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md w-16 p-1" type="text" name="admissionType" value={hiringGet.access.admissionType} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="admissionType">Descrição do Tipo de Admissão:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="admissionType" value={hiringGet.access.admissionDescription} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="workContractType">Tipo de Contrato de Trabalho:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="workContractType" value={formatWorkContractType(hiringGet.access.workContractType)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5 ">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="experienceExpiration">Vencimento da Experiência:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-48" type="text" name="experienceExpiration" value={formatDate(hiringGet.access.experienceExpiration)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="experienceExpiration2">Vencimento do segundo período de experiência:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-48" type="text" name="experienceExpiration2" value={formatDate(hiringGet.access.experienceExpiration2)} readOnly />
                                                    </div>

                                                    {/* <div className="flex flex-col pl-2">
                                                        <label htmlFor="stabilityExpiration">Vencimento Período de Estabilidade:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-24" type="text" name="stabilityExpiration" value={formatDate(hiringGet.access.stabilityExpiration)} readOnly />
                                                    </div> */}

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="medicalExamExpiration">Vencimento do Exame Médico:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-24" type="text" name="medicalExamExpiration" value={formatDate(hiringGet.access.medicalExamExpiration)} readOnly />
                                                    </div>


                                                    <div className="flex flex-col">
                                                        <label htmlFor="contractTerminationExpiration">Término Contrado Prazo Deter:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="contractTerminationExpiration" value={formatDate(hiringGet.access.contractTerminationExpiration)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="contractPartial">Contrato a Tempo Parcial?:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="contractPartial" value={formatYesNo(hiringGet.access.contractPartial)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-around mb-5">

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="workshiftCode">Código do Turno de Trabalho:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-5/12" type="text" name="workshiftCode" value={hiringGet.access.workshiftCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-6/12">
                                                        <label htmlFor="workshiftDescription">Descrição do Turno de Trabalho:</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="workshiftDescription" value={hiringGet.access.workshiftDescription} readOnly />
                                                    </div>

                                                    <div className="flex flex-col pl-2">
                                                        <label htmlFor="workshiftStartSequence">Sequência de Inicio do Turno:</label>
                                                        <Inputs className="border dark:text-black w-6/12 border-gray-500 rounded-md p-1" type="text" name="workshiftStartSequence" value={hiringGet.access.workshiftStartSequence} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="appointmentRule">Regra de Apontamento:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-6/12" type="text" name="appointmentRule" value={hiringGet.access.appointmentRule} readOnly />
                                                    </div>


                                                    <div className="flex flex-col">
                                                        <label htmlFor="appointmentDescription">Descrição do Apontamento:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="appointmentDescription" value={hiringGet.access.appointmentDescription} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="documentType">Tipo Recebimento Documento:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="documentType" value={formatDocumentType(hiringGet.access.documentType)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="workRegimen">Regime de Trabalho:</label>
                                                        <Inputs className="border dark:text-black w-8/12 border-gray-500 rounded-md p-1" type="text" name="workRegimen" value={formatWorkRegimen(hiringGet.access.workRegimen)} readOnly />
                                                    </div>


                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="workJourneyType">Tipo de Regime:</label>
                                                        <Inputs className="border dark:text-black w-11/12 border-gray-500 rounded-md p-1" type="text" name="workJourneyType" value={formatWorkJourneyType(hiringGet.access.workJourneyType)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="workJourneyHourly">Jornada Variável:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-6/12" type="text" name="workJourneyHourly" value={formatYesNo(hiringGet.access.workJourneyHourly)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="blockAdmission">Bloqueia Admissão:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 w-5/12 rounded-md p-1" type="text" name="blockAdmission" value={formatYesNo(hiringGet.access.blockAdmission)} readOnly />
                                                    </div>


                                                    <div className="flex flex-col">
                                                        <label htmlFor="workState">Estado de Trabalho:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md w-3/12 p-1" type="text" name="workState" value={hiringGet.access.workState} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="workMunicipality">Municipio de Trabalho:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md w-10/12 p-1" type="text" name="workMunicipality" value={hiringGet.access.workMunicipality} readOnly />
                                                    </div>

                                                </div>

                                                <div className="flex  justify-center mb-5">

                                                    <div className="flex flex-col w-10/12">
                                                        <label htmlFor="workMunicipalityDescription">Descrição Município de Trabalho:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1 w-full" type="text" name="workMunicipalityDescription" value={hiringGet.access.workMunicipalityDescription} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="benefitDeliveryLocation">Local de Entrega de Benefício:</label>
                                                        <Inputs className="w-full border dark:text-black border-gray-500 rounded-md p-1" type="text" name="benefitDeliveryLocation" value={hiringGet.access.benefitDeliveryLocation} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="benefitDeliveryDescription">Descrição de Entrega de Benefício:</label>
                                                        <Inputs className="w-full border dark:text-black border-gray-500 rounded-md p-1" type="text" name="benefitDeliveryDescription" value={hiringGet.access.benefitDeliveryDescription} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="contributionAssistential">Contribuição Assistencial:</label>
                                                        <Inputs className="w-full dark:text-black border border-gray-500 rounded-md p-1" type="text" name="contributionAssistential" value={formatYesNo(hiringGet.access.contributionAssistential)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="contributionConferative">Contribuição Conferativa:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="contributionConferative" value={formatYesNo(hiringGet.access.contributionConferative)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="sindicalMensality">Mensalidade Sindical:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="sindicalMensality" value={formatYesNo(hiringGet.access.sindicalMensality)} readOnly />
                                                    </div>


                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="sindicateCode">Código do Sindicato:</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="sindicateCode" value={hiringGet.access.sindicateCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="sindicateDescription">Descrição do Sindicato:</label>
                                                        <Inputs className="w-full dark:text-black border border-gray-500 rounded-md p-1" type="text" name="sindicateDescription" value={hiringGet.access.sindicateDescription} readOnly />
                                                    </div>


                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hasHealthInsurance">Tem Plano de Saúde?</label>
                                                        <Inputs className="border dark:text-black border-gray-500 rounded-md p-1" type="text" name="hasHealthInsurance" value={formatYesNo(hiringGet.access.hasHealthInsurance)} readOnly />
                                                    </div>


                                                </div>

                                                <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-200" />


                                                <div className="flex text-start justify-around mb-5 divide-x divide-gray-500">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeCategory">Categoria do Funcionário</label>
                                                        <Inputs className="border dark:text-black m-1 w-11/12 border-gray-500 rounded-md p-1" type="text" name="employeeCategory" value={hiringGet.access.employeeCategory} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="esocialWorkCategory">Categoria eSocial:</label>
                                                        <Inputs className="border dark:text-black m-1 w-8/12 border-gray-500 rounded-md p-1" type="text" name="esocialWorkCategory" value={hiringGet.access.esocialWorkCategory} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="raisLink">Vinculo Empregatico RAIS</label>
                                                        <Inputs className="border dark:text-black m-1 w-8/12 border-gray-500 rounded-md p-1" type="text" name="raisLink" value={hiringGet.access.raisLink} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="sefipCategory">Categoria SEFIP:</label>
                                                        <Inputs className="border dark:text-black m-1 w-8/12 border-gray-500 rounded-md p-1" type="text" name="sefipCategory" value={hiringGet.access.sefipCategory} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="previdentialRegimenType">Tipo de Regime Previdenciário:</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="previdentialRegimenType" value={formatPrevidentialRegimenType(hiringGet.access.previdentialRegimenType)} readOnly />
                                                    </div>

                                                </div>


                                                <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-200" />


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="advancePercentage">Percentual Adiantamento:</label>
                                                        <Inputs className="w-10/12 border dark:text-black border-gray-500 rounded-md p-1" type="text" name="advancePercentage" value={formatPercentage(hiringGet.access.advancePercentage)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="professionalCardUpdated">Alteração Carteira Profissional:</label>
                                                        <Inputs className="w-10/12 border dark:text-black border-gray-500 rounded-md p-1" type="text" name="professionalCardUpdated" value={formatYesNoLetter(hiringGet.access.professionalCardUpdated)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="pisNumberUpdated">Alteração no Numero PIS:</label>
                                                        <Inputs className="w-10/12 border dark:text-black border-gray-500 rounded-md p-1" type="text" name="pisNumberUpdated" value={formatYesNoLetter(hiringGet.access.pisNumberUpdated)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="disabilityQuota">Cota de Deficiente?</label>
                                                        <Inputs className="w-10/12 border dark:text-black border-gray-500 rounded-md p-1" type="text" name="disabilityQuota" value={formatYesNoLetter(hiringGet.access.disabilityQuota)} readOnly />
                                                    </div>

                                                </div>


                                            </div>

                                            {/*C*/}
                                            <div className="border border-gray-400 rounded-xl mb-8 p-8 flex-flex-col">
                                                <p className="flex text-lg font-semibold mb-5">Informações Cadastrais do Usuário</p>

                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="employeeNickname">Apelido do Funcionário</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeNickname" value={hiringGet.page.employeeNickname} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="nameSocial">Nome Social</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="nameSocial" value={hiringGet.page.nameSocial} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="nameMother">Nome da Mãe</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="nameMother" value={hiringGet.page.nameMother} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="nameFather">Nome do Pai</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="nameFather" value={hiringGet.page.nameFather} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="employeeSex">Sexo do funcinário</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeSex" value={formatSex(hiringGet.page.employeeSex)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="employeeBirthday">Data de Nascimento</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeBirthday" value={formatReverseData(hiringGet.page.employeeBirthday)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="employeeMaritalStatus">Status Social</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeMaritalStatus" value={formatMaritalStatus(hiringGet.page.employeeMaritalStatus)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="employeeEthnicity">Etnia</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeEthnicity" value={formatEthnicity(hiringGet.page.employeeEthnicity)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeNationality">Nacionalidade</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeNationality" value={formatNationality(hiringGet.page.employeeNationality)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="brazillianExteriorBorn">Brasileiro Nascido no Exterior?</label>
                                                        <Inputs className="border dark:text-black w-4/12 border-gray-500 rounded-md p-1" type="text" name="brazillianExteriorBorn" value={formatYesNoLetter(hiringGet.page.brazillianExteriorBorn)} readOnly />
                                                    </div>


                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeNaturality">Naturalidade</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeNaturality" value={formatState(hiringGet.page.employeeNaturality)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeBornStateCode">Cod. Estado de Nascimento</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeBornStateCode" value={hiringGet.page.employeeBornStateCode} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeBornState">Estado de Nascimento</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeBornState" value={formatState(hiringGet.page.employeeBornState)} readOnly />
                                                    </div>


                                                    <div className="flex flex-col">
                                                        <label htmlFor="pis">PIS</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="pis" value={hiringGet.page.pis} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rg">RG</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rg" value={formatRG(hiringGet.page.rg)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rgIssueDate">Data de Validade do RG</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rgIssueDate" value={formatReverseData(hiringGet.page.rgIssueDate)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rgUf">RG UF</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rgUf" value={formatState(hiringGet.page.rgUf)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="idDocOrgIssuer">Orgão Emissor do RG</label>
                                                        <Inputs className="border dark:text-black w-10/12 border-gray-500 rounded-md p-1" type="text" name="idDocOrgIssuer" value={hiringGet.page.idDocOrgIssuer} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="rgOrgExpedition">Orgão Expeditor do RG</label>
                                                        <Inputs className="border dark:text-black w-10/12 border-gray-500 rounded-md p-1" type="text" name="rgOrgExpedition" value={hiringGet.page.rgOrgExpedition} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="rgOrgIssuer">RG Org Issuer</label>
                                                        <Inputs className="border dark:text-black w-10/12 border-gray-500 rounded-md p-1" type="text" name="rgOrgIssuer" value={hiringGet.page.rgOrgIssuer} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="idDocOrgIssuer">Complemento do RG</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="idDocOrgIssuer" value={hiringGet.page.idDocOrgIssuer} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rgOrgExpedition">Orgão Expeditor do RG</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rgOrgExpedition" value={hiringGet.page.rgOrgExpedition} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rgOrgIssuer">RG Org Issuer</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rgOrgIssuer" value={hiringGet.page.rgOrgIssuer} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="professionalCard">Carteira Profissional de Tabalho</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="professionalCard" value={hiringGet.page.professionalCard} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="professionalCardSerial">Serial Carteira Profissional</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="professionalCardSerial" value={hiringGet.page.professionalCardSerial} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="professionalCardUf">UF da Carteira Profissional</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="professionalCardUf" value={formatState(hiringGet.page.professionalCardUf)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="ctpsIssueDate">Data de Emissão CTPS </label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="ctpsIssueDate" value={formatReverseData(hiringGet.page.ctpsIssueDate)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="militaryServiceCard">Comprovante Serviço Militar</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="militaryServiceCard" value={hiringGet.page.militaryServiceCard} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="voterTitle">Título de Eleitor</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="voterTitle" value={hiringGet.page.voterTitle} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="voterZone">Zona de Votação</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="voterZone" value={hiringGet.page.voterZone} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="voterSection">Seção de Votação</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="voterSection" value={hiringGet.page.voterSection} readOnly />
                                                    </div>

                                                </div>



                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="addressType">Tipo de Endereço</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="addressType" value={hiringGet.page.addressType} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-7/12">
                                                        <label htmlFor="logradouroType">Tipo do Logradouro</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="logradouroType" value={hiringGet.page.logradouroType} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-8/12">
                                                        <label htmlFor="employeeAddress">Endereço do Funcionário</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeAddress" value={hiringGet.page.employeeAddress} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="logradouroNumber">Número do Logradouro</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="logradouroNumber" value={hiringGet.page.logradouroNumber} readOnly />
                                                    </div>

                                                </div>



                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeNeighborhood">Bairro</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeNeighborhood" value={hiringGet.page.employeeNeighborhood} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeMunicipe">Município</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeMunicipe" value={hiringGet.page.employeeMunicipe} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="employeeState">Estado</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="employeeState" value={hiringGet.page.employeeState} readOnly />
                                                    </div>

                                                </div>



                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="addressComplement">Complemento</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="addressComplement" value={hiringGet.page.addressComplement} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="cep">CEP</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="cep" value={hiringGet.page.cep} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="issuerCountryCode">Código do País de Emissão</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="issuerCountryCode" value={hiringGet.page.issuerCountryCode} readOnly />
                                                    </div>

                                                </div>



                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rneNumber">Número RNE</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rneNumber" value={hiringGet.page.rneNumber} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rneOrgIssuer">Orgão Emissor RNE</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rneOrgIssuer" value={hiringGet.page.rneOrgIssuer} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="rneIssueDate">Data de Emissão RNE</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="rneIssueDate" value={formatDate(hiringGet.page.rneIssueDate)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="foreignResident">Residente no Exterior?</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="foreignResident" value={formatYesNo(hiringGet.page.foreignResident)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="residenceCountryForeign">País de Residência Exterior</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="residenceCountryForeign" value={hiringGet.page.residenceCountryForeign} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="foreignClassification">Classificação Estrangeiro</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="foreignClassification" value={hiringGet.page.foreignClassification} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="marriedToBrazillian">Casado com Brasileiro(a)?</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="marriedToBrazillian" value={hiringGet.page.marriedToBrazillian} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hasBrazillianChildren">Tem filhos Brasileiros</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="hasBrazillianChildren" value={hiringGet.page.hasBrazillianChildren} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="brazilArrivalDate">Data de chegada ao Brasil</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="brazilArrivalDate" value={formatDate(hiringGet.page.brazilArrivalDate)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="naturalizationNumber">Número de Naturalização
                                                        </label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="naturalizationNumber" value={hiringGet.page.naturalizationNumber} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="naturalizationDate">Data de Naturalização</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="naturalizationDate" value={formatDate(hiringGet.page.naturalizationDate)} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="landlineDdd">Telefone DDD</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="landlineDdd" value={hiringGet.page.landlineDdd} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="landline">Telefone</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="landline" value={hiringGet.page.landline} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-2/12">
                                                        <label htmlFor="phoneDdd">Celular DDD</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="phoneDdd" value={hiringGet.page.phoneDdd} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-3/12">
                                                        <label htmlFor="phone">Celular</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="phone" value={hiringGet.page.phone} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="emailMain">Email Principal</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="emailMain" value={hiringGet.page.emailMain} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="emailAlternative">Email Alternativo</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="emailAlternative" value={hiringGet.page.emailAlternative} readOnly />
                                                    </div>


                                                </div>


                                                <div className="flex text-start justify-between mb-5">

                                                    <div className="flex flex-col">
                                                        <label htmlFor="hasDisability">Tem deficiência?</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="hasDisability" value={formatYesNo(hiringGet.page.hasDisability)} readOnly />
                                                    </div>

                                                    <div className="flex flex-col w-5/12">
                                                        <label htmlFor="disabilityType">Tipo de Deficiencia</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="disabilityType" value={hiringGet.page.disabilityType} readOnly />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <label htmlFor="esocialDisabilityType">Tipo de Deficiência eSocial</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="esocialDisabilityType" value={hiringGet.page.esocialDisabilityType} readOnly />
                                                    </div>

                                                </div>


                                                <div className="flex text-start justify-between mb-5 w-12/12">

                                                    <div className="flex flex-col w-full">
                                                        <label htmlFor="disabilityComplements">Observações sobre a deficiência</label>
                                                        <Inputs className="border dark:text-black w-full border-gray-500 rounded-md p-1" type="text" name="disabilityComplements" value={hiringGet.page.disabilityComplements} readOnly />
                                                    </div>
                                                </div>




                                            </div>

                                            {/*ARQUIVOS*/}
                                            {/* <div className="border border-gray-400 rounded-xl min-h-[580px] max-h-[580px] place-self-center mb-8 p-8">
                                                <p className="text-lg font-semibold mb-5 text-start">Arquivos:</p>

                                                <div className="flex w-full min-w-[700px] h-[400px]">

                                                    <div className="w-1/4 min-w-60 overflow-y-auto pr-2 border-r border-gray-300">
                                                        <Box sx={{ borderBottom: 0 }}>
                                                            <Tabs
                                                                orientation="vertical"
                                                                value={value}
                                                                onChange={handleChange}
                                                                variant="scrollable"
                                                                scrollButtons="auto"
                                                            >
                                                                {activeCategories.map((category, index) => (
                                                                    <Tab
                                                                        key={category.key}
                                                                        label={`${category.label} (${allFiles[category.key as keyof typeof allFiles].length})`}
                                                                        {...a11yProps(index)}
                                                                    />
                                                                ))}
                                                            </Tabs>
                                                        </Box>
                                                    </div>

                                                    <div className="w-3/4 pl-4">
                                                        <CustomTabPanel value={value} index={0}>
                                                            <TabContentWrapper>{photo3x4Components}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={1}>
                                                            <TabContentWrapper> {rgComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={2}>
                                                            <TabContentWrapper>  {cpfComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={3}>
                                                            <TabContentWrapper>  {addressProofComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={4}>
                                                            <TabContentWrapper>  {administrativeHealthExaminationComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={5}>
                                                            <TabContentWrapper>  {vaccineCardComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={6}>
                                                            <TabContentWrapper>  {covidVaccineCardComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={7}>
                                                            <TabContentWrapper>  {birthCertificateFileComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={8}>
                                                            <TabContentWrapper>  {marriageCertificateComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={9}>
                                                            <TabContentWrapper>   {militaryDraftComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={10}>
                                                            <TabContentWrapper>  {lastJobCoverLetterComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={11}>
                                                            <TabContentWrapper>  {registrationStatementComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={12}>
                                                            <TabContentWrapper>  {courseCompetionCertificate_schoolTranscriptComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={13}>
                                                            <TabContentWrapper>   {eSocialRegistrationQualificationComponents}</TabContentWrapper>
                                                        </CustomTabPanel>
                                                    </div>
                                                </div>
                                            </div> */}


                                            {/*VALIDAÇÃO*/}
                                            <div>
                                                <form className="flex">

                                                    <div className="flex flex-col mr-10">
                                                        <div className="flex items-center mb-4">
                                                            <input
                                                                type="radio"
                                                                value="VALIDATED"
                                                                name="validateProcess"
                                                                onChange={(e) => setSelectedOption(e.target.value)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label
                                                                htmlFor="default-radio-1"
                                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Validado
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                value="REJECTED"
                                                                name="validateProcess"
                                                                onChange={(e) => setSelectedOption(e.target.value)}
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label
                                                                htmlFor="default-radio-2"
                                                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Rejeitado
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observações:</label>
                                                        <textarea
                                                            autoCapitalize="words"
                                                            className="block p-2.5 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Coloque suas obsercações em caso de rejeitado"
                                                            value={obs}
                                                            onChange={handleObs}></textarea>
                                                        {sendError && <div>
                                                            <p className="bg-red-300 border-2 border-red-800 rounded-xl text-red-700">{sendError}</p>
                                                        </div>}
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>


                                    <button  //botao criar
                                        onClick={handleModal}
                                        type="button"
                                        className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        <div className="flex flex-row">
                                            <svg className="h-5 w-5 text-white mr-3"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <polyline points="9 11 12 14 20 6" />
                                                <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                            </svg>
                                            Validar
                                        </div>
                                    </button>


                                    <Modal // modal de confirmarção
                                        open={modal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                        className="w-full h-full flex justify-center items-center"
                                    >

                                        <Box sx={{ width: 400 }} className='bg-gray-300 w-96 h-60 p-8 rounded-2xl'>
                                            <div className="grid grid-cols-2 gap-4">
                                                <h2 id="parent-modal-title" className="font-semibold text-2xl">Confirmação</h2>
                                                <button onClick={handleCloseModal}>
                                                    <svg className="h-5 w-5 place-self-end text-slate-700"
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
                                            </div>
                                            <p id="parent-modal-description" className="text-center mt-5 text-lg">
                                                Tem certeza de que deseja prosseguir?
                                            </p>
                                            <div className="flex justify-center mt-10">
                                                <button onClick={ValidateStatusProccess} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    Sim
                                                </button>

                                                <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                                >
                                                    Não
                                                </button>
                                            </div>
                                        </Box>

                                    </Modal>

                                </div>
                            )}
                        </div>
                    </div>



                </div>
            </div >

            {/* <Modal
                open={modalPreview}
                onClose={handleClosePreview}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className="w-full h-full flex justify-center items-center"
            >

                <Box className="bg-gray-300 w-8/12 h-[83vh] p-4 rounded-2xl flex flex-col">
                    <div className="flex justify-between p-2">
                        <h2 className="font-semibold text-2xl">Imagem Completa:</h2>
                        <button onClick={handleClosePreview}>
                            <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 min-h-0 flex items-center justify-center">
                        <img
                            src={fullImage}
                            className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
                            alt="Visualização da imagem"
                        />
                    </div>
                </Box>

            </Modal> */}

            <Snackbar open={sucess} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Validação feita com Sucesso!
                </Alert>
            </Snackbar>
        </div >
    );
}
