import React, { FC, useEffect, useState } from "react";
import Inputs from "../../shared/Inputs";
import Background from "../../shared/Background";
import { baseUrl } from "../../../../shareUrl";
import { SingleValue } from "react-select";
import axios from "axios";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import { Modal, Box } from "@mui/material";
import FilterableSelect from "../../shared/FilterableSelect";
import FatalError from "../../shared/FaltalError";
import Loading from "../../shared/Loading";


const URL_GET = `${baseUrl}employee/access/`
const URL_POST = `${baseUrl}employee/access`
const URL_FETCH = `${baseUrl}employee/access/microservice/fetch-data`

const AdmissionArray = [
    {
        data: '9A',
        description: 'OUTROS                / 1o.EMPREGO'
    },
    {
        data: '9B',
        description: 'OUTROS                / REEMPREGO'
    }
];

interface FieldTemplateValues {
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
    isLocked: string;
    accesses: string;
    hoursMonthly: string;
    salary: string;
    salaryBaseDis: string;
    sindicalContribution: string;
    hasPericulosity: string;

}

const initialFieldTemplateValues: FieldTemplateValues = {
    templateId: "",
    templateName: "",
    branchCode: "",
    centerCostCode: "",
    centerCostDescription: "",
    functionCode: "",
    functionDescription: "",
    roleCode: "",
    roleDescription: "",
    hoursWeekly: "",
    hoursDaily: "",
    periculosityHours: "",
    paymentType: "",
    hasInsalubrity: "",
    insalubrityHours: "",
    departmentCode: "",
    departmentDescription: "",
    isLocked: "",
    accesses: "",
    hoursMonthly: "",
    salary: "",
    salaryBaseDis: "",
    sindicalContribution: "",
    hasPericulosity: ""
};

interface FieldHiringValues {

    accessId: string;
    employeeName: string;
    receivesEmail: string;
    receivesEmailType: string;
    employeeCpf: string;
    admissionDate: string;
    admissionType: string;
    admissionDescription: string;
    workContractType: string;
    experienceExpiration: string;
    experienceExpiration2: string;
    medicalExaminationExpiration: string;
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
    benefitDeliveryLocation: string;
    benefitDeliveryDescription: string;
    contributionAssistential: string;
    contributionConferative: string;
    sindicalMensality: string;
    sindicateCode: string;
    sindicateDescription: string;
    sindicalContribution: string;
    hasHealthInsurance: string;
    employeeCategory: string;
    employeeCategoryDescription: string;
    raisLink: string;
    raisLinkDescription: string;
    sefipCategory: string;
    esocialWorkCategory: string;
    previdentialRegimenType: string;
    advancePercentage: string;
    disabilityQuota: string;
    templateId: string;
    vtId: string
    vtDescription: string
    vfId: string
    vfDescription: string
    vmId: string
    vmDescription: string

}

const inicialFieldHiringValues: FieldHiringValues = {
    accessId: "",
    employeeName: "",
    receivesEmail: "",
    receivesEmailType: "",
    employeeCpf: "",
    admissionDate: "",
    admissionType: "",
    admissionDescription: "",
    workContractType: "",
    experienceExpiration: "",
    experienceExpiration2: "",
    medicalExaminationExpiration: "",
    stabilityExpiration: "",
    contractTerminationExpiration: "",
    contractPartial: "",
    workshiftCode: "",
    workshiftDescription: "",
    workshiftStartSequence: "",
    appointmentRule: "",
    appointmentDescription: "",
    documentType: "",
    workRegimen: "",
    workJourneyType: "",
    workJourneyHourly: "",
    blockAdmission: "",
    workState: "",
    workMunicipality: "",
    workMunicipalityDescription: "",
    benefitDeliveryLocation: "",
    benefitDeliveryDescription: "",
    contributionAssistential: "",
    contributionConferative: "",
    sindicalMensality: "",
    sindicateCode: "",
    sindicateDescription: "",
    sindicalContribution: "",
    hasHealthInsurance: "",
    employeeCategory: "",
    employeeCategoryDescription: "",
    raisLink: "",
    raisLinkDescription: "",
    sefipCategory: "",
    esocialWorkCategory: "",
    previdentialRegimenType: "",
    advancePercentage: "",
    disabilityQuota: "",
    templateId: "",
    vtId: '',
    vtDescription: '',
    vfId: '',
    vfDescription: '',
    vmId: '',
    vmDescription: '',

}

const formatCPF = (value: string) => {
    const numericCPFValue = value.replace(/\D/g, '').slice(0, 11);
    return numericCPFValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

interface HiringRegisterFormsProps {
    accessId?: string;
}
interface Template {
    templateId: string;
    templateName: string;
}
function formatInsalubrity(number: string) {
    switch (number) {
        case '1': return 'Não'
        case '2': return 'Mínima'
        case '3': return 'Média'
        case '4': return 'Máxima'
        default: ''
    }
}
function formatPericulosity(number: string) {
    if (number === '1') {
        return 'Não'
    } else if (number === '2') {
        return 'sim'
    } else return ''
}
const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCPF.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    sum = 0;

    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCPF.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
};
function formatDateString(date: string) {
    if (date.length == 8) {
        return date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
    } else
        return
}

interface experienceDaysType {
    experienceDays1: number;
    experienceDays2: number;
}
const initialExperienceDaysType: experienceDaysType = {
    experienceDays1: 0,
    experienceDays2: 0,
}

const HiringRegisterForms: FC<HiringRegisterFormsProps> = ({ accessId }) => {

    const [fieldsVacancy, setFieldsVacancy] = useState<FieldTemplateValues>(initialFieldTemplateValues);
    const [fieldsHiring, setFieldsHiring] = useState<FieldHiringValues>(inicialFieldHiringValues);
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState<SingleValue<{ value: string; label: string }>>(null);

    const [snackbarOpenFields, setSnackbarOpenFields] = useState<boolean>(false);
    const [modalOpenCreate, setModalOpenCreate] = useState<boolean>(false);
    const [modalOpenSuccessCreate, setModalOpenSuccessCreate] = useState<boolean>(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [linkCopySnackbar, setLinkCopySnackbar] = useState(false)
    const [passwordCopySnackbar, setPasswordCopySnackbar] = useState(false)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [sucessPassword, setSucessPassword] = useState<string>('');
    const [successLink, setSuccessLink] = useState<string>('')
    const [acessLink, setAcessLink] = useState<string>('')
    const [editSuccess, setEditSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fatalError, setFatalError] = useState(false)
    const [noTemplateMessage, setNoTemplateMessage] = useState(false)

    const [experienceDays, setExperienceDays] = useState<experienceDaysType>(initialExperienceDaysType)

    const handleExpericenteDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = parseInt(value);

        const newExperienceDays = {
            ...experienceDays,
            [name]: newValue,
        };

        setExperienceDays(newExperienceDays);

        // Se não houver data de admissão, não tenta calcular nada ainda
        if (!fieldsHiring.admissionDate) return;

        const firstExpiration = addDaysToDate(fieldsHiring.admissionDate, name === 'experienceDays1' ? newValue : newExperienceDays.experienceDays1);
        const secondExpiration = addDaysToDate(firstExpiration, name === 'experienceDays2' ? newValue : newExperienceDays.experienceDays2);

        setFieldsHiring((prevState) => ({
            ...prevState,
            experienceExpiration: firstExpiration,
            experienceExpiration2: secondExpiration,
        }));
    };




    const experienceOptions = Array.from({ length: 45 }, (_, i) => i + 1);

    const [workshiftOptions, setWorkshiftOptions] = useState<{ data: string; description: string; extraInformation: string }[]>([]);

    const [appointmentOptions, setAppointmentOptions] = useState<{ data: string; description: string }[]>([]);

    const [workStateOptions, setWorkStateOptions] = useState<{ data: string; description: string; extraInformation: string }[]>([]);

    const [benefitDeliveryOptions, setBenefitDeliveryOptions] = useState<{ data: string; description: string }[]>([]);

    const [sindicateOptions, setSindicateOptions] = useState<{ data: string; description: string }[]>([]);

    const [
        // admissionOptions
        ,
        setAdmissionOptions
    ] = useState<{ data: string; description: string }[]>([]);

    const [categoryOptions, setCategoryOptions] = useState<{ data: string; description: string }[]>([])

    const [raisOption, setRaisOptions] = useState<{ data: string; description: string }[]>([]);

    const [esocialCategoryOptions, setEsocialCategoryOptions] = useState<{ data: string }[]>([])

    const [vtOptions, setVtOptions] = useState<{ data: string; description: string; }[]>([])
    const [vfOptions, setVfOptions] = useState<{ data: string; description: string; }[]>([])
    const [vmOptions, setVmOptions] = useState<{ data: string; description: string; }[]>([])

    function getDateOneDayBeforeYearCompletion(dateSelected: string): string {
        const originalDate = new Date(dateSelected);
        const oneYearLater = new Date(originalDate);
        oneYearLater.setFullYear(originalDate.getFullYear() + 1);

        const oneDayBefore = new Date(oneYearLater);
        oneDayBefore.setDate(oneYearLater.getDate() - 1);

        return formatDate(oneDayBefore);
    }

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function addDaysToDate(dateString: string, days: number): string {
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day); // cria como local

        date.setDate(date.getDate() + days);
        return formatDate(date);
    }



    const handleHiringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === 'advancePercentage' || name === 'fgtsDepositPercentage') {
            const numericValue = Math.max(0, Math.min(100, Number(value)));
            newValue = isNaN(numericValue) ? '' : numericValue.toString();
        }

        if (name === 'admissionDate') {
            const admissionDate = value;
            setFieldsHiring((prevState) => ({
                ...prevState,
                [name]: admissionDate,
                // experienceExpiration: addDaysToDate(admissionDate, 15),
                // experienceExpiration2: addDaysToDate(admissionDate, 30),
                medicalExaminationExpiration: getDateOneDayBeforeYearCompletion(admissionDate),
                contractTerminationExpiration: addDaysToDate(admissionDate, 90),
            }));
            return;
        }

        switch (name) {
            case 'employeeCpf': newValue = formatCPF(value);
                break;
            case 'raisLink': newValue = newValue.slice(0, 15);
                break;
            case 'sefipCategory': newValue = newValue.slice(0, 15);
                break;


        }



        setFieldsHiring((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    const handleSelectAdmissionType = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            admissionType: item.data,
            admissionDescription: item.description
        }))
    }
    const handleSelectWorkshift = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            workshiftCode: item.data,
            workshiftDescription: item.description,
            workshiftStartSequence: item.extraInformation
        }))
    }
    const handleSelectAppointmentRule = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            appointmentRule: item.data,
            appointmentDescription: item.description,
        }))
    }
    const handleSelectWorkMunicipality = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            workMunicipality: item.data,
            workMunicipalityDescription: item.description,
            workState: item.extraInformation
        }))
    }
    const handleSelectBenefitDeliveryLocation = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            benefitDeliveryLocation: item.data,
            benefitDeliveryDescription: item.description
        }))
    }
    const handleSelectSindicateCode = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            sindicateCode: item.data,
            sindicateDescription: item.description
        }))
    }
    const handleCategory = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            employeeCategory: item.data,
            employeeCategoryDescription: item.description,
        }))
    }
    const handleRais = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            raisLink: item.data,
            raisLinkDescription: item.description
        }))
    }
    const handleEsocialCategory = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            esocialWorkCategory: item.data
        }))
    }
    const handleVt = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            vtId: item.data,
            vtDescription: item.description
        }))
    }
    const handleVf = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            vfId: item.data,
            vfDescription: item.description
        }))
    }
    const handleVm = (item: any) => {
        setFieldsHiring((prevState) => ({
            ...prevState,
            vmId: item.data,
            vmDescription: item.description
        }))
    }


    function formatPercentage(numberStr: string) {
        if (numberStr == '') {
            return ''
        } else {
            let number = parseFloat(numberStr);
            return (number / 100).toString();
        }
    }

    useEffect(() => {


        const fetchMicroService = async () => { //buscando lista de options do microserviço
            setLoading(true)
            try {
                const response = await axios.get(URL_FETCH, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'opbase-id': localStorage.getItem('operationalBase')
                    },
                });

                const returnData = response.data.data;

                const formattedWorkShift = returnData.workshiftData.map((item: {
                    workshiftCode: string;
                    workshiftDescription: string;
                    workshiftStartSequency: string;
                }) => ({
                    data: item.workshiftCode,
                    description: item.workshiftDescription,
                    extraInformation: item.workshiftStartSequency || "N/A",
                }));
                const formattedAppointments = returnData.appointmentRule.map((item: {
                    data: string;
                    description: string;
                }) => ({
                    data: item.data,
                    description: item.description,
                }));
                const formattedBenefitDelivery = returnData.benefitDeliveryLocation.map((item: {
                    data: string;
                    description: string;
                }) => ({
                    data: item.data,
                    description: item.description,
                }));
                const formattedSindicate = returnData.sindicateCode.map((item: {
                    data: string;
                    description: string;
                }) => ({
                    data: item.data,
                    description: item.description
                }));
                const formattedWorkStates = returnData.workState.map((item: {
                    workMunicipeCode: string;
                    workMunicipeDescription: string;
                    workState: string;
                }) => ({
                    data: item.workMunicipeCode,
                    description: item.workMunicipeDescription,
                    extraInformation: item.workState,
                }));
                const formattedAdmissionType = returnData.admissionType.map((item: {
                    data: string;
                    description: string;
                }) => ({
                    data: item.data,
                    description: item.description
                }))
                const formattedCategory = returnData.employeeCategories.map((item: {
                    data: string;
                    description: string
                }) => ({
                    data: item.data,
                    description: item.description
                }))
                const formattedRais = returnData.raisLinks.map((item: {
                    data: string;
                    description: string;
                }) => ({
                    data: item.data,
                    description: item.description,
                }))
                const formattedEsocialCategory = returnData.esocialEmployeeCategory.map((item: {
                    data: string;
                }) => ({
                    data: item.data
                }))


                setWorkshiftOptions(formattedWorkShift);
                setAppointmentOptions(formattedAppointments);
                setBenefitDeliveryOptions(formattedBenefitDelivery);
                setSindicateOptions(formattedSindicate);
                setWorkStateOptions(formattedWorkStates);
                setAdmissionOptions(formattedAdmissionType)
                setCategoryOptions(formattedCategory)
                setRaisOptions(formattedRais)
                setEsocialCategoryOptions(formattedEsocialCategory)
                setLoading(false)
                setFatalError(false)


                console.log(formattedEsocialCategory)
            } catch (error: any) {
                setLoading(false)
                setFatalError(true)
                console.error("Erro ao buscar dados do microserviço:", error);
            }

        };

        const fetchOptions = async () => {
            setOptions([])
            const url = `${baseUrl}template/list?opBaseIds=${localStorage.getItem('operationalBase')}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'user-id': localStorage.getItem('userId')
                    }
                });;


                const formattedOptions = response.data.data.map((template: Template) => ({
                    value: template.templateId,
                    label: template.templateName,
                }));
                setOptions(formattedOptions);
                if (formattedOptions.length == 0) {
                    setNoTemplateMessage(true)
                } else {
                    setNoTemplateMessage(false)
                }
            } catch (error) {
                console.error("Erro na busca de templates", error);
            }
        };

        const fetchVouchers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseUrl}employee/access/vouchers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'user-id': localStorage.getItem('userId')
                    }
                });

                const responseData = response.data.data;

                const formattedVt = responseData.voucherTransport.map((item: { vtId: string; name: string }) => ({
                    data: item.vtId,
                    description: item.name
                }));

                const formattedVf = responseData.voucherFood.map((item: { vfId: string; name: string }) => ({
                    data: item.vfId,
                    description: item.name
                }));

                const formattedVm = responseData.voucherMeal.map((item: { vmId: string; name: string }) => ({
                    data: item.vmId,
                    description: item.name
                }));

                setVtOptions(formattedVt);
                setVfOptions(formattedVf);
                setVmOptions(formattedVm);

            } catch (error: any) {
                setFatalError(true);
                console.error("Erro ao buscar vouchers:", error.response || error.message || error);
            } finally {
                setLoading(false);
            }
        };


        fetchMicroService();
        fetchOptions();
        fetchVouchers()
    }, []);


    useEffect(() => { //popular campos se tiver accessId

        function formatPercentage(number: string): string {
            if (number === null || number === undefined) {
                throw new TypeError('O valor não pode ser nulo ou indefinido.');
            }

            // Converte o valor para string
            const numberString = number.toString();

            // Substitui vírgula por ponto e converte para número
            const numberPercentage = parseFloat(numberString.replace(',', '.'));

            // Calcula a porcentagem e retorna como string
            const result = numberPercentage * 100;
            return result.toFixed(2); // Arredonda para 2 casas decimais
        }

        if (accessId) {
            const popularFieldsWhithId = async () => {
                try {
                    const response = await axios.get(`${URL_GET}${accessId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'opbase-id': localStorage.getItem('operationalBase')
                        }
                    })
                    const data = response.data.data;
                    const IdTemplateFromAccessId = data.templateId
                    const urlGet = `${baseUrl}template/${IdTemplateFromAccessId}`;


                    const populateFields = async () => {
                        try {
                            const response = await axios.get(urlGet, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                                    'opbase-id': localStorage.getItem('operationalBase')
                                }
                            });
                            const data = response.data.data;

                            setFieldsVacancy({
                                templateId: data.templateId,
                                templateName: data.templateName,
                                branchCode: data.branchCode,
                                centerCostCode: data.centerCostCode,
                                centerCostDescription: data.centerCostDescription,
                                functionCode: data.functionCode,
                                functionDescription: data.functionDescription,
                                roleCode: data.roleCode,
                                roleDescription: data.roleDescription,
                                hoursWeekly: data.hoursWeekly,
                                hoursDaily: data.hoursDaily,
                                periculosityHours: data.periculosityHours,
                                paymentType: data.paymentType,
                                hasInsalubrity: data.hasInsalubrity,
                                insalubrityHours: data.insalubrityHours,
                                departmentCode: data.departmentCode,
                                departmentDescription: data.departmentDescription,
                                isLocked: data.isLocked,
                                accesses: data.accesses,
                                hoursMonthly: data.hoursMonthly,
                                salary: data.salary,
                                salaryBaseDis: data.salaryBaseDis,
                                sindicalContribution: data.sindicalContribution,
                                hasPericulosity: data.hasPericulosity,


                            });

                        } catch (error: any) {
                            console.error("Erro ao popular campos:", error.response?.status, error.response?.data);
                        }
                    };
                    populateFields();
                    localStorage.setItem('operationalBaseToSend', data.operationalBaseId)
                    setFieldsHiring(({
                        ...data,
                        accessId: data.accessId,
                        employeeName: data.employeeName,
                        receivesEmail: data.receivesEmail,
                        receivesEmailType: data.receivesEmailType,
                        employeeCpf: data.employeeCpf,
                        admissionDate: formatDateString(data.admissionDate),
                        admissionType: data.admissionType,
                        admissionDescription: data.admissionDescription,
                        workContractType: data.workContractType,
                        experienceExpiration: formatDateString(data.experienceExpiration),
                        experienceExpiration2: formatDateString(data.experienceExpiration2),
                        medicalExamExpiration: (data.medicalExaminationExpiration),
                        stabilityExpiration: data.stabilityExpiration,
                        contractTerminationExpiration: (data.contractTerminationExpiration),
                        contractPartial: data.contractPartial,
                        workshiftCode: data.workshiftCode,
                        workshiftDescription: data.workshiftDescription,
                        workshiftStartSequence: data.workshiftStartSequence,
                        appointmentRule: data.appointmentRule,
                        appointmentDescription: data.appointmentDescription,
                        documentType: data.documentType,
                        workRegimen: data.workRegimen,
                        workJourneyType: data.workJourneyType,
                        workJourneyHourly: data.workJourneyHourly,
                        blockAdmission: data.blockAdmission,
                        workState: data.workState,
                        workMunicipality: data.workMunicipality,
                        workMunicipalityDescription: data.workMunicipalityDescription,
                        benefitDeliveryLocation: data.benefitDeliveryLocation,
                        benefitDeliveryDescription: data.benefitDeliveryDescription,
                        contributionAssistential: data.contributionAssistential,
                        contributionConferative: data.contributionConferative,
                        sindicalMensality: data.sindicalMensality,
                        sindicateCode: data.sindicateCode,
                        sindicateDescription: data.sindicateDescription,
                        sindicalContribution: data.sindicalContribution,
                        hasHealthInsurance: data.hasHealthInsurance,
                        employeeCategory: data.employeeCategory,
                        employeeCategoryDescription: data.employeeCategoryDescription,
                        raisLink: data.raisLink,
                        raisLinkDescription: data.raisLinkDescription,
                        sefipCategory: data.sefipCategory,
                        esocialWorkCategory: data.esocialWorkCategory,
                        previdentialRegimenType: data.previdentialRegimenType,
                        advancePercentage: formatPercentage(data.advancePercentage),
                        disabilityQuota: data.disabilityQuota,
                        templateId: data.templateId,
                        vfId: data.vfId,
                        vfDescription: data.vfName,
                        vtId: data.vtId,
                        vtDescription: data.vtName,
                        vmId: data.vmId,
                        vmDescription: data.vmName,
                    }));

                } catch {
                    console.error('deu erro no get do accessId')
                }
            }
            popularFieldsWhithId()

        }
    }, [accessId])



    const validateFields = () => { //validação dos campos
        const validationErrors: { [key: string]: string } = {};

        let cpfOK = validateCPF(fieldsHiring.employeeCpf)

        setErrors({});

        if (!fieldsVacancy.templateId) validationErrors.templateId = 'Campo obrigatório.';
        // if (!fieldsHiring.receivesEmail) validationErrors.receivesEmail = 'Campo obrigatório.';
        if (!fieldsHiring.employeeCpf) validationErrors.employeeCpf = 'Campo obrigatório.';
        if (!cpfOK) validationErrors.employeeCpf = 'Insira um CPF válido.';
        if (!fieldsHiring.employeeName) validationErrors.employeeName = 'Campo obrigatório.';
        if (!fieldsHiring.sindicalMensality) validationErrors.sindicalMensality = 'Campo obrigatório.';
        if (!fieldsHiring.workshiftCode) validationErrors.workshiftCode = 'Campo obrigatório.';
        if (!fieldsHiring.experienceExpiration) validationErrors.experienceExpiration = 'Campo obrigatório.';
        if (fieldsHiring.experienceExpiration2 == "") validationErrors.experienceExpiration2 = 'Campo obrigatório.';
        if (!fieldsHiring.esocialWorkCategory) validationErrors.esocialWorkCategory = 'Campo obrigatório.';
        if (fieldsHiring.admissionDate === "") validationErrors.admissionDate = 'Campo obrigatório.';
        if (!fieldsHiring.workRegimen) validationErrors.workRegimen = 'Campo obrigatório.';
        if (!fieldsHiring.appointmentRule) validationErrors.appointmentRule = 'Campo obrigatório.';
        if (!fieldsHiring.disabilityQuota) validationErrors.disabilityQuota = 'Campo obrigatório.';
        if (!fieldsHiring.admissionType) validationErrors.admissionType = 'Campo obrigatório.';
        if (!fieldsHiring.previdentialRegimenType) validationErrors.previdentialRegimenType = 'Campo obrigatório.';
        if (!fieldsHiring.workContractType) validationErrors.workContractType = 'Campo obrigatório.';
        if (!fieldsHiring.benefitDeliveryLocation) validationErrors.benefitDeliveryLocation = 'Campo obrigatório.';
        if (!fieldsHiring.employeeCategory) validationErrors.employeeCategory = 'Campo obrigatório.';
        if (!fieldsHiring.contributionAssistential) validationErrors.contributionAssistential = 'Campo obrigatório.';
        if (!fieldsHiring.contributionConferative) validationErrors.contributionConferative = 'Campo obrigatório.';
        if (!fieldsHiring.sindicalMensality) validationErrors.sindicalMensality = 'Campo obrigatório.';
        if (!fieldsHiring.sindicateCode) validationErrors.sindicateCode = 'Campo obrigatório.';
        if (!fieldsHiring.hasHealthInsurance) validationErrors.hasHealthInsurance = 'Campo obrigatório.';
        if (!fieldsHiring.workMunicipality) validationErrors.workMunicipality = 'Campo obrigatório.';

        if (!fieldsHiring.raisLink) validationErrors.raisLink = "Campo obrigatório."
        if (!fieldsHiring.vfId) validationErrors.vf = "Campo obrigatório."


        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarOpenFields(true)
            return false;
        }
        setErrors({});
        return true;

    }


    const selectHandleChange = (selected: SingleValue<{ value: string; label: string }>) => {
        setSelectedOption(selected);

        if (!selected) return;
        const urlGet = `${baseUrl}template/${selected.value}`;

        const populateFields = async () => {
            try {
                const response = await axios.get(urlGet, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'opbase-id': localStorage.getItem('operationalBase')
                    }
                });
                const data = response.data.data;


                setFieldsVacancy({
                    templateId: data.templateId,
                    templateName: data.templateName,
                    branchCode: data.branchCode,
                    centerCostCode: data.centerCostCode,
                    centerCostDescription: data.centerCostDescription,
                    functionCode: data.functionCode,
                    functionDescription: data.functionDescription,
                    roleCode: data.roleCode,
                    roleDescription: data.roleDescription,
                    hoursWeekly: data.hoursWeekly,
                    hoursDaily: data.hoursDaily,
                    periculosityHours: data.periculosityHours,
                    paymentType: data.paymentType,
                    hasInsalubrity: data.hasInsalubrity,
                    insalubrityHours: data.insalubrityHours,
                    departmentCode: data.departmentCode,
                    departmentDescription: data.departmentDescription,
                    isLocked: data.isLocked,
                    accesses: data.accesses,
                    hoursMonthly: data.hoursMonthly,
                    salary: data.salary,
                    salaryBaseDis: data.salaryBaseDis,
                    sindicalContribution: data.sindicalContribution,
                    hasPericulosity: data.hasPericulosity,

                });
            } catch (error: any) {
                console.error("Erro ao popular campos:", error.response?.status, error.response?.data);
            }
        };
        populateFields();
    };


    const HiringCheck = async (e: any) => {
        if (accessId) {
            await HiringPut(e);
        } else {
            await HiringCreate(e)
        }
    }

    function formatedData(dateString: string): string {
        if (/^\d{8}$/.test(dateString)) {
            return dateString;
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const [year, month, day] = dateString.split('-');
            return `${day}${month}${year}`;
        }
        return "";
    }



    const HiringPut = async (e: any) => {
        e.preventDefault()

        try {
            const URL_PUT = `${baseUrl}employee/access/${accessId}`


            await axios.put(URL_PUT, {
                data: {
                    admissionDate: fieldsHiring.admissionDate ? formatedData(fieldsHiring.admissionDate) : '',
                    experienceExpiration: fieldsHiring.experienceExpiration ? formatedData(fieldsHiring.experienceExpiration) : '',
                    experienceExpiration2: fieldsHiring.experienceExpiration2 ? formatedData(fieldsHiring.experienceExpiration2) : '',
                    medicalExamExpiration: fieldsHiring.medicalExaminationExpiration ? formatedData(fieldsHiring.medicalExaminationExpiration) : '',
                    // stabilityExpiration: fieldsHiring.stabilityExpiration ? formatedData(fieldsHiring.stabilityExpiration) : '',
                    contractTerminationExpiration: fieldsHiring.contractTerminationExpiration ? formatedData(fieldsHiring.contractTerminationExpiration) : '',
                    employeeName: fieldsHiring.employeeName,
                    receivesEmail: 'S',
                    receivesEmailType: '1',
                    employeeCpf: fieldsHiring.employeeCpf.replace(/\D/g, ''),
                    admissionType: fieldsHiring.admissionType,
                    admissionDescription: fieldsHiring.admissionDescription,
                    workContractType: fieldsHiring.workContractType,
                    contractPartial: fieldsHiring.contractPartial,
                    workshiftCode: fieldsHiring.workshiftCode,
                    workshiftDescription: fieldsHiring.workshiftDescription,
                    workshiftStartSequence: fieldsHiring.workshiftStartSequence,
                    appointmentRule: fieldsHiring.appointmentRule,
                    appointmentDescription: fieldsHiring.appointmentDescription,
                    documentType: fieldsHiring.documentType,
                    workRegimen: fieldsHiring.workRegimen,
                    workJourneyType: fieldsHiring.workJourneyType,
                    workJourneyHourly: '2',
                    blockAdmission: '2',
                    workState: fieldsHiring.workState,
                    workMunicipality: fieldsHiring.workMunicipality,
                    workMunicipalityDescription: fieldsHiring.workMunicipalityDescription,
                    benefitDeliveryLocation: fieldsHiring.benefitDeliveryLocation,
                    benefitDeliveryDescription: fieldsHiring.benefitDeliveryDescription,
                    contributionAssistential: fieldsHiring.contributionAssistential,
                    contributionConferative: fieldsHiring.contributionConferative,
                    sindicalMensality: fieldsHiring.sindicalMensality,
                    sindicateCode: fieldsHiring.sindicateCode,
                    sindicateDescription: fieldsHiring.sindicateDescription,
                    sindicalContribution: fieldsHiring.sindicalContribution,
                    hasHealthInsurance: fieldsHiring.hasHealthInsurance,
                    employeeCategory: fieldsHiring.employeeCategory,
                    raisLink: fieldsHiring.raisLink,
                    sefipCategory: fieldsHiring.sefipCategory,
                    esocialWorkCategory: fieldsHiring.esocialWorkCategory,
                    previdentialRegimenType: fieldsHiring.previdentialRegimenType,
                    advancePercentage: formatPercentage(fieldsHiring.advancePercentage),
                    professionalCardUpdated: 'N',
                    pisNumberUpdated: 'N',
                    disabilityQuota: fieldsHiring.disabilityQuota,
                    templateId: fieldsVacancy.templateId,
                    accessId: accessId,


                    vtId: fieldsHiring.vtId,
                    vfId: fieldsHiring.vfId,
                    vmId: fieldsHiring.vmId,

                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBaseToSend')
                }

            });

            setFieldsHiring(inicialFieldHiringValues);
            setSelectedOption(null)
            setEditSuccess(true)
            setModalOpenCreate(false)
            setFieldsVacancy(initialFieldTemplateValues)

        } catch (error: any) {
            setErrorSnackbar(true)
            console.log(error)
        }

    }


    const HiringCreate = async (e: any) => {
        e.preventDefault()

        try {

            const response = await axios.post(URL_POST, {
                data: {
                    admissionDate: formatedData(fieldsHiring.admissionDate),
                    experienceExpiration: (formatedData(fieldsHiring.experienceExpiration)),
                    experienceExpiration2: formatedData(fieldsHiring.experienceExpiration2),
                    medicalExamExpiration: formatedData(fieldsHiring.medicalExaminationExpiration),
                    // stabilityExpiration: formatedData(fieldsHiring.stabilityExpiration),
                    contractTerminationExpiration: formatedData(fieldsHiring.contractTerminationExpiration),
                    employeeName: fieldsHiring.employeeName,
                    receivesEmail: 'S',
                    receivesEmailType: '1',
                    employeeCpf: fieldsHiring.employeeCpf.replace(/\D/g, ''),
                    admissionType: fieldsHiring.admissionType,
                    admissionDescription: fieldsHiring.admissionDescription,
                    workContractType: fieldsHiring.workContractType,
                    contractPartial: fieldsHiring.contractPartial,
                    workshiftCode: fieldsHiring.workshiftCode,
                    workshiftDescription: fieldsHiring.workshiftDescription,
                    workshiftStartSequence: fieldsHiring.workshiftStartSequence,
                    appointmentRule: fieldsHiring.appointmentRule,
                    appointmentDescription: fieldsHiring.appointmentDescription,
                    documentType: fieldsHiring.documentType,
                    workRegimen: fieldsHiring.workRegimen,
                    workJourneyType: fieldsHiring.workJourneyType,
                    workJourneyHourly: '2',
                    blockAdmission: '2',
                    workState: fieldsHiring.workState,
                    workMunicipality: fieldsHiring.workMunicipality,
                    workMunicipalityDescription: fieldsHiring.workMunicipalityDescription,
                    benefitDeliveryLocation: fieldsHiring.benefitDeliveryLocation,
                    benefitDeliveryDescription: fieldsHiring.benefitDeliveryDescription,
                    contributionAssistential: fieldsHiring.contributionAssistential,
                    contributionConferative: fieldsHiring.contributionConferative,
                    sindicalMensality: fieldsHiring.sindicalMensality,
                    sindicateCode: fieldsHiring.sindicateCode,
                    sindicateDescription: fieldsHiring.sindicateDescription,
                    sindicalContribution: fieldsHiring.sindicalContribution,
                    hasHealthInsurance: fieldsHiring.hasHealthInsurance,
                    employeeCategory: fieldsHiring.employeeCategory,
                    raisLink: fieldsHiring.raisLink,
                    sefipCategory: fieldsHiring.sefipCategory,
                    esocialWorkCategory: fieldsHiring.esocialWorkCategory,
                    previdentialRegimenType: fieldsHiring.previdentialRegimenType,
                    advancePercentage: formatPercentage(fieldsHiring.advancePercentage),
                    professionalCardUpdated: 'N',
                    pisNumberUpdated: 'N',
                    disabilityQuota: fieldsHiring.disabilityQuota,
                    templateId: fieldsVacancy.templateId,



                    vtId: fieldsHiring.vtId,
                    vfId: fieldsHiring.vfId,
                    vmId: fieldsHiring.vmId,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            });
            setFieldsHiring(inicialFieldHiringValues);
            setSucessPassword(response.data.data.password)
            setAcessLink(response.data.data.token)
            setSuccessLink(response.data.data.password)
            setSelectedOption(null)
            setModalOpenSuccessCreate(true)
            setFieldsVacancy(initialFieldTemplateValues)

        } catch (error: any) {
            setErrorSnackbar(true)
            console.log(error)

        }
    }



    const linkSave = () => { //link pra mandar pro funcionario

        const colaboratorPreLink = ('https://ad-colaborador.dhml.prodevti.com.br/login?token=')
        const colaboradorToken = (acessLink)

        const LINK = (colaboratorPreLink + colaboradorToken)

        navigator.clipboard.writeText(LINK)
        setLinkCopySnackbar(true)
    }

    const passwordSave = () => {
        navigator.clipboard.writeText(successLink)
        setPasswordCopySnackbar(true)
    }

    const handleOpenModal = () => {

        let validate = validateFields();
        if (validate) {
            setModalOpenCreate(true);
        }
    }

    const handleCloseModal = () => {
        setModalOpenCreate(false);
        setModalOpenSuccessCreate(false);
    };

    const handleClose = (
        _e: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpenFields(false);
        setPasswordCopySnackbar(false)
        setLinkCopySnackbar(false)
        setErrorSnackbar(false)
        setEditSuccess(false)
    };

    function formatPaymentType(letter: string) {
        switch (letter) {
            case '':
                return '';
            case 'M':
                return 'Mensal';
                break;
            case 'S':
                return 'Semanal'
                break;
            default: return 'Informação Inconsistente :/'
        }
    }


    if (loading) return <Loading />
    if (fatalError) return <FatalError />
    if (noTemplateMessage) {
        return (

            <div className="m-10 bg-gray-200 text-gray-800 shadow-xl border border-gray-300 font-semibold text-lg w-6/12 place-self-center p-5 rounded-xl">
                <p className="">Não há nenhum template cadastrado nessa Base Operacional. Crie um template ou escolha outra Base Operacional para criar um Cadastro de Contratação</p>
                <svg className="h-6 w-6 text-gray-800 place-self-center"
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

        )
    }


    return (
        <div>

            <Background>
                <div className="p-3">
                    <FilterableSelect
                        options={Object.values(options).flat()}
                        onChange={selectHandleChange}
                        className="w-96 text-left"
                        value={selectedOption}
                        placeholder='Selecione um template'
                    />
                    <br />
                    {errors.templateId && <span className="text-red-700 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.templateId}</span>}

                </div>
                <form onSubmit={HiringCreate}>


                    {/* primeira parte do formulário, selecionar o tamplate */}
                    <div className="shadow-2xl dark:shadow-2xl bg-[#F9FAFB] dark:bg-[#19223a] mb-5">
                        <div className="divide-y divide-slate-400 divide-opacity-30 dark:divide-opacity-20 dark:divide-slate-600">

                            <div className="w-full flex divide-x divide-slate-400  dark:divide-slate-600 p-5">
                                <div className="flex flex-col p-8 w-full">
                                    <div className=" border border-gray-400 rounded-xl mb-8 p-8 flex flex-col dark:text-white">

                                        <div className="flex text-start justify-between mb-5">

                                            <div className="flex flex-col">
                                                <label htmlFor="templateName">Id do Template:</label>
                                                <Inputs className="border dark:bg-[#475569] w-28 border-gray-500 rounded-md p-1" type="text" name="templateName" value={fieldsVacancy.templateId} readOnly />
                                            </div>

                                            <div className="flex flex-col w-4/12">
                                                <label htmlFor="templateName">Nome do Template:</label>
                                                <Inputs className="border dark:bg-[#475569] w-full border-gray-500 rounded-md p-1" type="text" name="templateName" value={fieldsVacancy.templateName} readOnly />
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="branchCode">Código Filial:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="branchCode" value={fieldsVacancy.branchCode} readOnly />
                                            </div>

                                        </div>


                                        <div className="flex text-start justify-around mb-5">

                                            <div className="flex flex-col w-3/12">
                                                <label htmlFor="centerCostCode">Código Centro de Custo:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="centerCostCode" value={fieldsVacancy.centerCostCode} readOnly />
                                            </div>

                                            <div className="flex flex-col w-8/12">
                                                <label htmlFor="centerCostDescription">Descrição Centro de Custo:</label>
                                                <Inputs className="border dark:bg-[#475569] w-full border-gray-500 rounded-md p-1" type="text" name="centerCostDescription" value={fieldsVacancy.centerCostDescription} readOnly />
                                            </div>


                                        </div>


                                        <div className="flex text-start justify-around mb-5">

                                            <div className="flex flex-col w-3/12">
                                                <label htmlFor="functionCode">Código da Função:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="functionCode" value={fieldsVacancy.functionCode} readOnly />
                                            </div>

                                            <div className="flex flex-col w-8/12">
                                                <label htmlFor="functionDescription">Descrição da função:</label>
                                                <Inputs className="border dark:bg-[#475569] w-full border-gray-500 rounded-md p-1" type="text" name="functionDescription" value={fieldsVacancy.functionDescription} readOnly />
                                            </div>


                                        </div>


                                        <div className="flex text-start justify-around mb-5">

                                            <div className="flex flex-col w-3/12">
                                                <label htmlFor="roleCode">Código do Cargo:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="roleCode" value={fieldsVacancy.roleCode} readOnly />
                                            </div>

                                            <div className="flex flex-col w-8/12">
                                                <label htmlFor="roleDescription">Descrição do Cargo:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 w-full rounded-md p-1" type="text" name="roleDescription" value={fieldsVacancy.roleDescription} readOnly />
                                            </div>

                                        </div>


                                        <div className="flex text-start justify-around mb-5">

                                            <div className="flex flex-col w-3/12">
                                                <label htmlFor="departmentCode">Código Departamento:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="departmentCode" value={fieldsVacancy.departmentCode} readOnly />
                                            </div>

                                            <div className="flex flex-col w-8/12">
                                                <label htmlFor="departmentDescription">Descrição do Departamento:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1 w-full" type="text" name="departmentDescription" value={fieldsVacancy.departmentDescription} readOnly />
                                            </div>

                                        </div>


                                        <div className="flex text-start justify-around mb-5">

                                            <div className="flex flex-col">
                                                <label htmlFor="hoursDaily">Horas Diárias:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="hoursDaily" value={fieldsVacancy.hoursDaily} readOnly />
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="hoursWeekly">Horas Semanais:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="hoursWeekly" value={fieldsVacancy.hoursWeekly} readOnly />
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="hoursMonthly">Horas Mensais:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="hoursMonthly" value={fieldsVacancy.hoursMonthly} readOnly />
                                            </div>

                                        </div>


                                        <div className="flex text-start justify-around mb-5">

                                            <div className="flex flex-col">
                                                <label htmlFor="salary">Salário:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="salary" value={fieldsVacancy.salary} readOnly />
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="paymentType">Tipo de Pagamento:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 rounded-md p-1" type="text" name="paymentType" value={formatPaymentType(fieldsVacancy.paymentType)} readOnly />
                                            </div>

                                        </div>

                                        <div className="flex text-start justify-around mb-5 divide-x divide-gray-500">

                                            <div className="flex flex-col">
                                                <label htmlFor="hasInsalubrity">Tem Insalubridade?</label>
                                                <Inputs className="border dark:bg-[#475569] w-32 text-center border-gray-500 rounded-md p-1" type="text" name="hasInsalubrity" value={formatInsalubrity(fieldsVacancy.hasInsalubrity)} readOnly />
                                            </div>

                                            <div className="flex flex-col pl-2">
                                                <label htmlFor="insalubrityHours">Horas de Insalubridade:</label>
                                                <Inputs className="border dark:bg-[#475569] border-gray-500 w-32 rounded-md p-1" type="text" name="insalubrityHours" value={fieldsVacancy.insalubrityHours} readOnly />
                                            </div>

                                            <div className="flex flex-col pl-2">
                                                <label htmlFor="hasPericulosity">Tem Periculosidade:</label>
                                                <Inputs className="border dark:bg-[#475569] w-32 text-center border-gray-500 rounded-md p-1" type="text" name="hasPericulosity" value={formatPericulosity(fieldsVacancy.hasPericulosity)} readOnly />
                                            </div>

                                            <div className="flex flex-col pl-2">
                                                <label htmlFor="periculosityHours">Horas de Periculosidade:</label>
                                                <Inputs className="border dark:bg-[#475569] w-32 border-gray-500 rounded-md p-1" type="text" name="periculosityHours" value={fieldsVacancy.periculosityHours} readOnly />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                    {/* segunda parte do formulário */}
                    <div className="shadow-2xl dark:shadow-2xl flex flex-col items-center bg-[#F9FAFB] dark:bg-[#19223a] mb-5 pb-8">
                        <h1 className="font-bold text-3xl flex self-start p-5 dark:text-slate-300">Acesso do Funcionário</h1>

                        <div className="divide-y divide-slate-400 divide-opacity-30 dark:divide-opacity-20 dark:divide-slate-600">


                            {/* dados cadastrais */}
                            <div className="flex flex-col">
                                <p className="flex p-8 text-2xl font-semibold text-slate-800 dark:text-slate-400">Dados Cadastrais</p>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="employeeName" className="dark:text-slate-300 text-start font-medium">Nome do Funcionário *</label>
                                        <Inputs
                                            type="text"
                                            name="employeeName"
                                            value={fieldsHiring.employeeName}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        />
                                        {errors.employeeName && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.employeeName}</span>}
                                    </div>

                                    {/* 
                                    <div className="flex flex-col p-5">
                                        <label htmlFor="receivesEmail" className="dark:text-slate-300 text-start font-medium">Recebe Email *</label>
                                        <select
                                            name="receivesEmail"
                                            value={fieldsHiring.receivesEmail}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm">
                                            <option value="" className="text-slate-400">Selecione uma opção:</option>
                                            <option value="S">SIM</option>
                                            <option value="N">NÃO</option>
                                        </select>
                                        {errors.receivesEmail && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.receivesEmail}</span>}
                                    </div>


                                    <div className="flex flex-col p-5">
                                        <label htmlFor="receivesEmailType" className="dark:text-slate-300 text-start font-medium">Tipo de recebimento de Email</label>
                                        <select name="receivesEmailType" value={fieldsHiring.receivesEmailType} onChange={handleHiringChange} className="inputHiringForm">
                                            <option value="" className="text-slate-400">Selecione uma opção:</option>
                                            <option value="1">HTML</option>
                                            <option value="2">Texto</option>
                                        </select>
                                    </div> */}
                                    {/* </div>

                                <div className="flex"> */}

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="employeeCpf" className="dark:text-slate-300 text-start font-medium">CPF do Funcionário *</label>
                                        <Inputs
                                            type="text"
                                            name="employeeCpf"
                                            value={fieldsHiring.employeeCpf}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        />
                                        {errors.employeeCpf && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.employeeCpf}</span>}
                                    </div>

                                </div>

                            </div>



                            {/* Informações Contratuais */}
                            <div className="flex flex-col">
                                <p className="flex p-8 text-2xl font-semibold text-slate-800 dark:text-slate-400">Informações Contratuais</p>

                                <div className="flex justify-around">


                                    <div className="flex flex-col p-5">
                                        <label htmlFor="admissionType" className="dark:text-slate-300 text-start font-medium">Tipo de Admissão *</label>
                                        <div className="w-96 h-12 ">
                                            <FilterableSelect
                                                options={Object.values(AdmissionArray).flat()}
                                                onChange={(selectedOption: any) => { handleSelectAdmissionType(selectedOption); }}
                                                value={fieldsHiring.admissionType}
                                                placeholder="Selecione o Tipo de Admissão..."
                                            />
                                        </div>
                                        {errors.admissionType && <span className="text-red-500 text-sm mt-5 bg-red-200 rounded p-1 border-red-600 border-2">{errors.admissionType}</span>}
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="admissionDescription" className="dark:text-slate-300 text-start font-medium">Descrição do Tipo de Admissão *</label>
                                        <input
                                            type="text"
                                            name="admissionDescription"
                                            value={fieldsHiring.admissionDescription}
                                            readOnly
                                            placeholder="Descrição do estado de trabalho"
                                            className="inputHiringForm"
                                        />
                                    </div>

                                    <div className="flex flex-col p-5">

                                        <label htmlFor="workContractType" className="dark:text-slate-300 text-start font-medium">Tipo de Contrato de Trabalho *</label>
                                        <select
                                            name="workContractType"
                                            value={fieldsHiring.workContractType}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        >
                                            <option value="">Selecione uma opção:</option>
                                            <option value="1">Indeterminado</option>
                                            <option value="2">Determinado</option>
                                            <option value="3">Intermitente</option>
                                        </select>
                                        {errors.workContractType && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.workContractType}</span>}
                                    </div>

                                </div>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="admissionDate" className="dark:text-slate-300 text-start font-medium">Data de Admissão *</label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            name="admissionDate"
                                            value={fieldsHiring.admissionDate}
                                            onChange={handleHiringChange}
                                            className="inputHiringFormDate"
                                        />
                                        {errors.admissionDate && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.admissionDate}</span>}
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="experienceDays1" className="dark:text-slate-300 text-start font-medium">Dias de Experiência *</label>
                                        <select
                                            name="experienceDays1"
                                            value={experienceDays.experienceDays1}
                                            onChange={handleExpericenteDaysChange}
                                            className="inputHiringFormDate"

                                        >
                                            <option value="" className="text-slate-400">Selecione:</option>
                                            {experienceOptions.map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="flex flex-col p-5">

                                        <label htmlFor="experienceExpiration" className="dark:text-slate-300 text-start font-medium">Vencimento da Experiência *</label>
                                        <Inputs
                                            type="date"
                                            name="experienceExpiration"
                                            value={fieldsHiring.experienceExpiration}
                                            className="inputHiringFormDate"
                                            onChange={handleHiringChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.experienceExpiration && <span className="text-red-500 text-sm w-40 bg-red-200 rounded p-1 border-red-600 border-2">{errors.experienceExpiration}</span>}
                                    </div>


                                    <div className="flex flex-col p-5">
                                        <label htmlFor="experienceDays2" className="dark:text-slate-300 text-start font-medium">Dias da 2° Experiência *</label>
                                        <select
                                            name="experienceDays2"
                                            value={experienceDays.experienceDays2}
                                            onChange={handleExpericenteDaysChange}
                                            className="inputHiringFormDate"

                                        >
                                            <option value="" className="text-slate-400">Selecione:</option>
                                            {experienceOptions.map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>

                                    </div>


                                    <div className="flex flex-col p-5">
                                        <label htmlFor="experienceExpiration2" className="dark:text-slate-300 text-start font-medium">Vencimento 2° Período de Experiência *</label>
                                        <Inputs
                                            type="date"
                                            name="experienceExpiration2"
                                            value={fieldsHiring.experienceExpiration2}
                                            className="inputHiringFormDate"
                                            onChange={handleHiringChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.experienceExpiration2 && <span className="text-red-500 text-sm w-40 bg-red-200 rounded p-1 border-red-600 border-2">{errors.experienceExpiration2}</span>}
                                    </div>



                                </div>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">

                                        <label htmlFor="medicalExaminationExpiration" className="dark:text-slate-300 text-start font-medium">Vencimento Exame Médico</label>
                                        <Inputs
                                            type="date"
                                            name="medicalExaminationExpiration"
                                            value={fieldsHiring.medicalExaminationExpiration}
                                            readOnly
                                            className="inputHiringFormDate"
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>


                                    <div className="flex flex-col p-5">
                                        <label htmlFor="contractTerminationExpiration" className="dark:text-slate-300 text-start font-medium">Término Contrato Prazo Determinado</label>
                                        <Inputs
                                            type="date"
                                            name="contractTerminationExpiration"
                                            value={fieldsHiring.contractTerminationExpiration}
                                            className="inputHiringFormDate"
                                            onChange={handleHiringChange}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                </div>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workshiftCode" className="dark:text-slate-300 text-start font-medium">Turno de Trabalho *</label>
                                        <div className="w-96 h-12 ">
                                            <FilterableSelect
                                                options={Object.values(workshiftOptions).flat()}
                                                onChange={(selectedOption: any) => { handleSelectWorkshift(selectedOption); }}
                                                value={fieldsHiring.workshiftCode}
                                                placeholder="Selecione o Código de Turno de Trabalho"
                                            />
                                        </div>
                                        {errors.workshiftCode && <span className="text-red-500 text-sm mt-5 bg-red-200 rounded p-1 border-red-600 border-2">{errors.workshiftCode}</span>}
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workshiftDescription" className="dark:text-slate-300 text-start font-medium">Descrição do Turno de Trabalho</label>
                                        <input
                                            type="text"
                                            value={fieldsHiring.workshiftDescription}
                                            readOnly
                                            placeholder="Descrição do turno"
                                            className="inputHiringForm"
                                        />
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workshiftStartSequence" className="dark:text-slate-300 text-start font-medium">Sequência Inicio do Turno</label>
                                        <input
                                            type="text"
                                            value={fieldsHiring.workshiftStartSequence}
                                            readOnly
                                            placeholder="Sequência de início"
                                            className="inputHiringForm"
                                        />
                                        {errors.workshiftStartSequence && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.workshiftStartSequence}</span>}

                                    </div>
                                </div>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="appointmentRule" className="dark:text-slate-300 text-start font-medium">Regra de Apontamento *</label>
                                        <div className="w-96 h-12 ">
                                            <FilterableSelect
                                                options={Object.values(appointmentOptions).flat()}
                                                onChange={(selectedOption: any) => { handleSelectAppointmentRule(selectedOption); }}
                                                value={fieldsHiring.appointmentRule}
                                                placeholder="Selecione o código da regra de apontamento..."
                                            />
                                        </div>
                                        {errors.appointmentRule && <span className="text-red-500 text-sm mt-5 bg-red-200 rounded p-1 border-red-600 border-2">{errors.appointmentRule}</span>}
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="appointmentDescription" className="dark:text-slate-300 text-start font-medium">Descrição da Regra de Apontamento</label>
                                        <input
                                            type="text"
                                            value={fieldsHiring.appointmentDescription}
                                            readOnly
                                            placeholder="Descrição da regra de agendamento"
                                            className="inputHiringForm"

                                        />
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="contractPartial" className="dark:text-slate-300 text-start font-medium">Contrato a tempo parcial?</label>
                                        <select
                                            name="contractPartial"
                                            value={fieldsHiring.contractPartial}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        >
                                            <option value="" className="text-slate-400">Selecione uma opção:</option>
                                            <option value="1">SIM</option>
                                            <option value="2">NÃO</option>
                                        </select>
                                    </div>


                                </div>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workRegimen" className="dark:text-slate-300 text-start font-medium">Regime de Trabalho *</label>
                                        <select
                                            name="workRegimen"
                                            value={fieldsHiring.workRegimen}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        >
                                            <option value="" className="text-slate-400">Selecione uma opção:</option>
                                            <option value="1">CLT</option>
                                            <option value="2">Estatuário</option>
                                        </select>
                                        {errors.workRegimen && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.workRegimen}</span>}
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workJourneyType" className="dark:text-slate-300 text-start font-medium">Tipo de Regime da Jornada de Trabalho</label>
                                        <select
                                            name="workJourneyType"
                                            value={fieldsHiring.workJourneyType}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        >
                                            <option value="" className="text-slate-400">Selecione uma opção:</option>
                                            <option value="1">Submetidos a Horario de Trabalho</option>
                                            <option value="2">Atividade Externa especificada;</option>
                                            <option value="3">Funções especificadas</option>
                                            <option value="4">Teletrabalho</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="documentType" className="dark:text-slate-300 text-start font-medium">Tipo de Recebimento do Documento</label>
                                        <select
                                            name="documentType"
                                            value={fieldsHiring.documentType}
                                            onChange={handleHiringChange}
                                            className="inputHiringForm"
                                        >
                                            <option value="" className="text-slate-400">Selecione uma opção:</option>
                                            <option value="1">Cópias Eletrônicas</option>
                                            <option value="2">Cópias em Papel</option>
                                            <option value="3">Ambos</option>
                                            <option value="4">Não Recebe</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="flex justify-around">

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workMunicipalityDescription" className="dark:text-slate-300 text-start font-medium">Município de Trabalho *</label>
                                        <div className="w-96 h-12 ">
                                            <FilterableSelect
                                                options={Object.values(workStateOptions).flat()}
                                                onChange={(selectedOption: any) => { handleSelectWorkMunicipality(selectedOption); }}
                                                value={fieldsHiring.workMunicipalityDescription}
                                                placeholder="Selecione o município..."
                                            />
                                        </div>
                                        {errors.workMunicipality && <span className="text-red-500 text-sm mt-5 bg-red-200 rounded p-1 border-red-600 border-2">{errors.workMunicipality}</span>}

                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workMunicipality" className="dark:text-slate-300 text-start font-medium">Código do Município de Trabalho *</label>
                                        <input
                                            type="text"
                                            value={fieldsHiring.workMunicipality}
                                            readOnly
                                            placeholder="Código do município de trabalho"
                                            className="inputHiringForm"
                                        />
                                        {errors.workMunicipalityDescription && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.workMunicipalityDescription}</span>}
                                    </div>

                                    <div className="flex flex-col p-5">
                                        <label htmlFor="workState" className="dark:text-slate-300 text-start font-medium">Estado de Trabalho *</label>

                                        <input
                                            type="text"
                                            value={fieldsHiring.workState}
                                            readOnly
                                            className="inputHiringForm"
                                            placeholder="Estado de Trabalho"
                                        />
                                        {errors.workState && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.workState}</span>}
                                    </div>

                                </div>


                            </div>



                            {/* Benefícios e Contribuições */}
                            <div className="flex flex-col">
                                <p className="flex p-8 text-2xl font-semibold text-slate-800 dark:text-slate-400">Benefícios e Contribuições</p>
                                <div className="flex flex-col">


                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="benefitDeliveryLocation" className="dark:text-slate-300 text-start font-medium">Local de Entraga de Benefício *</label>
                                            <div className="w-96 h-12 ">
                                                <FilterableSelect
                                                    options={Object.values(benefitDeliveryOptions).flat()}
                                                    onChange={(selectedOption: any) => { handleSelectBenefitDeliveryLocation(selectedOption); }}
                                                    value={fieldsHiring.benefitDeliveryLocation}
                                                    placeholder="Selecione o local..."
                                                />
                                            </div>
                                            {errors.benefitDeliveryLocation && <span className="text-red-500 text-sm mt-5 bg-red-200 rounded p-1 border-red-600 border-2">{errors.benefitDeliveryLocation}</span>}
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="benefitDeliveryDescription" className="dark:text-slate-300 text-start font-medium">Descrição de Entrega de Benefício</label>
                                            <input
                                                type="text"
                                                value={fieldsHiring.benefitDeliveryDescription}
                                                readOnly
                                                placeholder="Descrição do local de entrega"
                                                className="inputHiringForm"

                                            />
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="hasHealthInsurance" className="dark:text-slate-300 text-start font-medium">Tem Plano de Saúde? *</label>
                                            <select
                                                name="hasHealthInsurance"
                                                value={fieldsHiring.hasHealthInsurance}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            >
                                                <option value="" className="text-slate-400">Selecione uma opção:</option>
                                                <option value="1">SIM</option>
                                                <option value="2">NÃO</option>
                                            </select>
                                            {errors.hasHealthInsurance && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.hasHealthInsurance}</span>}
                                        </div>

                                    </div>

                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="contributionAssistential" className="dark:text-slate-300 text-start font-medium">Contribuição Assistencial *</label>
                                            <select
                                                name="contributionAssistential"
                                                value={fieldsHiring.contributionAssistential}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            >
                                                <option value="" className="text-slate-400">Selecione uma opção:</option>
                                                <option value="1">SIM</option>
                                                <option value="2">NÃO</option>
                                            </select>
                                            {errors.contributionAssistential && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.contributionAssistential}</span>}
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="contributionConferative" className="dark:text-slate-300 text-start font-medium">Contribuição Confederativa *</label>
                                            <select
                                                name="contributionConferative"
                                                value={fieldsHiring.contributionConferative}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            >
                                                <option value="" className="text-slate-400">Selecione uma opção:</option>
                                                <option value="1">SIM</option>
                                                <option value="2">NÃO</option>
                                            </select>
                                            {errors.contributionConferative && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.contributionConferative}</span>}
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="sindicalMensality" className="dark:text-slate-300 text-start font-medium">Mensalidade Sindical *</label>
                                            <select
                                                name="sindicalMensality"
                                                value={fieldsHiring.sindicalMensality}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            >
                                                <option value="" className="text-slate-400">Selecione uma opção:</option>
                                                <option value="1">SIM</option>
                                                <option value="2">NÃO</option>
                                            </select>
                                            {errors.sindicalMensality && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.sindicalMensality}</span>}
                                        </div>



                                    </div>

                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="sindicateCode" className="dark:text-slate-300 text-start font-medium">Sindicato *</label>
                                            <div className="w-96 h-12 ">
                                                <FilterableSelect
                                                    options={Object.values(sindicateOptions).flat()}
                                                    onChange={(selectedOption: any) => { handleSelectSindicateCode(selectedOption); }}
                                                    value={fieldsHiring.sindicateCode}
                                                    placeholder="Selecione o código da regra de apontamento..."
                                                />
                                            </div>
                                            {errors.sindicateCode && <span className="text-red-500 text-sm mt-5 bg-red-200 rounded p-1 border-red-600 border-2">{errors.sindicateCode}</span>}
                                        </div>

                                        <div className="flex flex-col p-5">

                                            <label htmlFor="sindicateDescription" className="dark:text-slate-300 text-start font-medium">Descrição do Sindicato</label>
                                            <input
                                                type="text"
                                                value={fieldsHiring.sindicateDescription}
                                                readOnly
                                                placeholder="Descrição do sindicato"
                                                className="inputHiringForm"
                                            />
                                        </div>

                                        <div className="flex flex-col p-5">


                                            <label htmlFor="sindicalContribution" className="dark:text-slate-300 text-start font-medium">Contribuição Sindical</label>
                                            <select
                                                name="sindicalContribution"
                                                value={fieldsHiring.sindicalContribution}
                                                onChange={handleHiringChange}
                                                className='inputHiringForm'
                                            >
                                                <option value="" className="text-gray-400">Selecione uma opção:</option>
                                                <option value="D">FUNC. ADMITIDO MES ANTERIOR E DEVE PAGAR IMP.SINDICAL</option>
                                                <option value="N">FUNC. NAO PAGA IMPOSTO SINDICAL</option>
                                                <option value="P">FUNC. JA PAGOU IMP. SINDICAL NO ANO CORRENTE</option>
                                                <option value="S">FUNC PAGA IMPOSTO SINDICAL</option>
                                                <option value="T">FUNC. PAGA IMP. SINDICAL POREM SO 1 MES APOS ADMISSAO</option>
                                            </select>
                                            {errors.contribuicaoSindical && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.contribuicaoSindical}</span>}
                                        </div>


                                    </div>

                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="hasHealthInsurance" className="dark:text-slate-300 text-start font-medium">Vale transporte?</label>
                                            <FilterableSelect
                                                options={Object.values(vtOptions).flat()}
                                                onChange={(selectedOption: any) => { handleVt(selectedOption); }}
                                                value={fieldsHiring.vfDescription}
                                                placeholder="Selecione..."
                                            />
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="hasHealthInsurance" className="dark:text-slate-300 text-start font-medium">Vale alimentação? *</label>

                                            <FilterableSelect
                                                options={Object.values(vfOptions).flat()}
                                                onChange={(selectedOption: any) => { handleVf(selectedOption); }}
                                                value={fieldsHiring.vfDescription}
                                                placeholder="Selecione..."
                                            />
                                            {errors.vf && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.vf}</span>}

                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="hasHealthInsurance" className="dark:text-slate-300 text-start font-medium">Vale refeição?</label>
                                            <FilterableSelect
                                                options={Object.values(vmOptions).flat()}
                                                onChange={(selectedOption: any) => { handleVm(selectedOption); }}
                                                value={fieldsHiring.vmDescription}
                                                placeholder="Selecione..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Categorias e Regulamentações */}
                            <div className="flex flex-col">
                                <p className="flex p-8 text-2xl font-semibold text-slate-800 dark:text-slate-400">Categorias e Regulamentações</p>
                                <div className="flex flex-col">

                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="employeeCategory" className="dark:text-slate-300 text-start font-medium">Categoria do Funcionário *</label>
                                            <FilterableSelect
                                                options={categoryOptions}
                                                value={fieldsHiring.employeeCategoryDescription}
                                                onChange={handleCategory}
                                                placeholder="Selecione a categoria..."
                                            />
                                            {errors.employeeCategory && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.employeeCategory}</span>}
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="raisLink" className="dark:text-slate-300 text-start font-medium">Vinculo Empregatico RAIS *</label>
                                            <FilterableSelect
                                                options={raisOption}
                                                value={fieldsHiring.raisLinkDescription}
                                                onChange={handleRais}
                                                placeholder="Selecione o vínculo..."
                                            />
                                            {errors.raisLink && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.raisLink}</span>}

                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="sefipCategory" className="dark:text-slate-300 text-start font-medium">Categoria do Funcionáio SEFIP</label>
                                            <Inputs
                                                type="text"
                                                name="sefipCategory"
                                                value={fieldsHiring.sefipCategory}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            />
                                        </div>

                                    </div>

                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="esocialWorkCategory" className="dark:text-slate-300 text-start font-medium">Categoria do Trabalhador eSocial *</label>
                                            <FilterableSelect
                                                options={esocialCategoryOptions}
                                                value={fieldsHiring.esocialWorkCategory}
                                                onChange={handleEsocialCategory}
                                                placeholder='selecione a categoria eSocial'
                                            />


                                            {errors.esocialWorkCategory && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.esocialWorkCategory}</span>}
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="previdentialRegimenType" className="dark:text-slate-300 text-start font-medium">Tipo de Regime Previdenciário *</label>
                                            <select
                                                name="previdentialRegimenType"
                                                value={fieldsHiring.previdentialRegimenType}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            >
                                                <option value="" className="text-slate-400">Selecione uma opção:</option>
                                                <option value="1">RGPS - Reg. Geral Previdência Social</option>
                                                <option value="2">RPPS - Reg. Próptio Previdência Social</option>
                                                <option value="3">RPPE - Reg. Próptio Previdência Social Exterior</option>
                                            </select>
                                            {errors.previdentialRegimenType && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.previdentialRegimenType}</span>}
                                        </div>

                                    </div>

                                </div>
                            </div>



                            {/*Histórico e Adicionais */}
                            <div className="flex flex-col">
                                <p className="flex p-8 text-2xl font-semibold text-slate-800 dark:text-slate-400">Histórico e Adicionais</p>
                                <div className="flex flex-col">

                                    <div className="flex justify-around">

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="advancePercentage" className="dark:text-slate-300 text-start font-medium">Percentual de Adiantamento</label>
                                            <div className="relative">
                                                <Inputs
                                                    min="0"
                                                    max="100"
                                                    type="number"
                                                    name="advancePercentage"
                                                    value={fieldsHiring.advancePercentage}
                                                    onChange={handleHiringChange}
                                                    className="inputHiringForm"
                                                />
                                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-white">%</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col p-5">
                                            <label htmlFor="disabilityQuota" className="dark:text-slate-300 text-start font-medium">Cota de Deficiente *</label>
                                            <select
                                                name="disabilityQuota"
                                                value={fieldsHiring.disabilityQuota}
                                                onChange={handleHiringChange}
                                                className="inputHiringForm"
                                            >
                                                <option value="" className="text-slate-400">Selecione uma opção:</option>
                                                <option value="S">SIM</option>
                                                <option value="N">NÃO</option>
                                            </select>
                                            {errors.disabilityQuota && <span className="text-red-500 text-sm bg-red-200 rounded p-1 border-red-600 border-2">{errors.disabilityQuota}</span>}
                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>


                    <button
                        onClick={handleOpenModal}
                        type="button"
                        className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        <div className="flex flex-row">
                            <svg
                                className="h-5 w-5 text-gray-200 mr-3"
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
                                <line x1="12" y1="9" x2="12" y2="15" />
                            </svg>
                            Salvar
                        </div>
                    </button>


                </form>

                <Modal //modal de confimarção
                    open={modalOpenCreate}
                    onClose={handleCloseModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    className="w-full h-full flex justify-center items-center"
                >

                    <Box sx={{ width: 400 }} className='bg-gray-300 w-96 h-60 p-8 rounded-2xl'>
                        <div className="flex justify-between">
                            <h2 id="parent-modal-title" className="font-semibold text-2xl">Confirmação</h2>
                            <button onClick={handleCloseModal}>
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
                        </div>
                        <p id="parent-modal-description" className="text-center mt-5 text-lg">
                            Tem certeza que deseja prosseguir?
                        </p>
                        <div className="flex justify-center mt-10">
                            <button onClick={HiringCheck} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Sim
                            </button>

                            <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                            >
                                Não
                            </button>
                        </div>
                    </Box>

                </Modal>

                <Modal //modal de sucesso de criaçao
                    open={modalOpenSuccessCreate}
                    onClose={handleCloseModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    className="w-full h-full flex justify-center items-center"
                >
                    <Box sx={{ width: 400 }} className='bg-gray-300 w-96 h-80 p-8 rounded-2xl'>
                        <div className="w-full h-full">
                            <div className="w-full text-end">
                                <button onClick={handleCloseModal} className="p-1">
                                    <svg className="h-5 w-5 text-slate-700 hover:text-slate-900"
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
                            <h2 id="parent-modal-title" className="bg-green-300 text-center border border-green-500 rounded-lg font-semibold text-xl">Contratação Criada com Sucesso</h2>
                            <div id="parent-modal-description" className="text-center mt-10 text-lg flex justify-center">
                                Senha do Colaborador: {sucessPassword}
                                <button
                                    className="ml-1"
                                    onClick={passwordSave}>
                                    <svg
                                        className="h-6 w-6 text-slate-600 hover:text-slate-800"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path stroke="none"
                                            d="M0 0h24v24H0z" />
                                        <rect x="8" y="8"
                                            width="12"
                                            height="12"
                                            rx="2" />
                                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center  mt-10 flex-col">
                                <p> Copiar Link de Acesso do Colaborador:</p>

                                <button
                                    className="bg-blue-300 border-blue-500 border rounded-lg font-semibold flex p-1 m-2 hover:bg-blue-400 hover:border-blue-600"
                                    onClick={linkSave}>
                                    <svg className="h-5 w-5 text-slate-800"
                                        width="24" height="24"
                                        viewBox="0 0 24 24" strokeWidth="2"
                                        stroke="currentColor" fill="none"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <rect x="8" y="8" width="12" height="12" rx="2" />
                                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                                    </svg>
                                    <p>Copiar para Área de Transferência</p>
                                </button>
                            </div>
                        </div>
                    </Box>
                </Modal>

                {/*Snackbar de campos obrigatórios*/}
                <Snackbar open={snackbarOpenFields} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Preencha todos os campos obrigatórios com informações válidas!
                    </Alert>
                </Snackbar>

                {/*Snackbar senha copiada*/}
                <Snackbar open={passwordCopySnackbar} autoHideDuration={3000} onClose={handleClose}>
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
                <Snackbar open={linkCopySnackbar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="standard"
                        sx={{ width: '100%' }}
                    >
                        Link copiado para a Área de Transferência!
                    </Alert>
                </Snackbar>

                {/*Snackbar de erro*/}
                <Snackbar open={errorSnackbar} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Ocorreu um erro com o processo atual!
                    </Alert>
                </Snackbar>

                {/*Snackbar de sucesso de edição */}
                <Snackbar open={editSuccess} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Edição feita com sucesso!
                    </Alert>
                </Snackbar>

            </Background>

        </div >
    );
}

export default HiringRegisterForms;
