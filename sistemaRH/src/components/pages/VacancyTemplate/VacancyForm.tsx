import { useEffect, useState } from "react";
import Inputs from "../../shared/Inputs";
import Background from "../../shared/Background";
import { baseUrl } from "../../../../shareUrl";
import axios from "axios";
import Button from "../../shared/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React from "react";
import Alert from "@mui/material/Alert";
import FilterableSelect from "../../shared/FilterableSelect";
import FatalError from "../../shared/FaltalError";
import Loading from "../../shared/Loading";

function VacancyForm() {
    const location = useLocation();
    const { templateClick } = location.state || {};
    const { baseOperationalClick } = location.state || {}
    const urlPost = `${baseUrl}template`
    const urlPut = `${baseUrl}template/`

    const navigate = useNavigate()
    const [checkCreateTemplate, setCheckCreateTemplate] = useState(false)
    const [checkEditAndCloneTemplate, setCheckEditAndCloneTemplate] = useState(false)
    const [templateId, setTemplateId] = useState<string>('');


    const [centerCostCode, setCenterCostCode] = useState<string>('');

    const [departmentCode, setDepartmentCode] = useState<string>('');

    const [functionCode, setFunctionCode] = useState<string>('')


    const [roleCode, setRoleCode] = useState<string>('');


    const [hoursDaily, setHoursDaily] = useState<string>('');
    const [hoursMonthly, setHoursMonthly] = useState<string>('');
    const [hoursWeekly, setHoursWeekly] = useState<string>('');
    const [salario, setSalario] = useState<string>('');
    const [contribuicaoSindical, setContribuicaoSindical] = useState<string>('');
    const [tipoPagamento, setTipoPagamento] = useState<string>('');
    const [insalubrityHours, setInsalubrityHours] = useState<string>('');
    const [dangerousnessHours, setDangerousnessHours] = useState<string>('');
    const [insalubridade, setInsalubridade] = useState<string>('null');
    const [periculosidade, setPericulosidade] = useState<string>('null');
    const [templateName, setTemplateName] = useState<string>('')
    const [enabled, setEnabled] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [fatalError, setFatalError] = useState(false)

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [idReponse, setIdReponse] = useState<string>('')


    const [modalOpenCreate, setModalOpenCreate] = useState<boolean>(false);
    const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
    const [modalOpenClone, setModalOpenClone] = useState<boolean>(false);
    const [snackbarOpenFields, setSnackbarOpenFields] = useState<boolean>(false);
    const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState<boolean>(false);
    const [snackbarOpenSuccessEdit, setSnackbarOpenSuccessEdit] = useState<boolean>(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const [departmentMessage, setDepartmentMessage] = useState(true)
    const [hasDepartment, setHasDepartment] = useState(false)


    const [data, setData] = useState<{ [key: string]: Array<{ data: string; description: string }> }>({
        centerCostCode: [],
        departmentCode: [],
        functionCode: [],
        employeeRoleCode: [],
    });

    const [selectedValues, setSelectedValues] = useState({
        centerCostCode: '',
        departmentCode: '',
        functionCode: '',
        employeeRoleCode: '',
    });

    function clearFields() {
        setTemplateId('');


        setCenterCostCode('');

        setDepartmentCode('');


        setFunctionCode('');

        setRoleCode('');

        setHoursDaily('');
        setHoursMonthly('');
        setHoursWeekly('');



        setSalario('');
        setTipoPagamento('');
        setContribuicaoSindical('');
        setInsalubridade('');
        setInsalubrityHours('');
        setPericulosidade('');
        setDangerousnessHours('');
        setTemplateName('');
        setSelectedValues({
            centerCostCode: '',
            departmentCode: '',
            functionCode: '',
            employeeRoleCode: '',
        });

        setDescriptions({
            centerCostCode: '',
            departmentCode: '',
            functionCode: '',
            employeeRoleCode: '',
        });
    }


    const handleSalario = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^\d*(\,?\d{0,2})?$/; // Corrigido o fechamento do grupo

        if (value === '' || (regex.test(value) && parseFloat(value.replace(',', '.')) <= 100000)) {
            setSalario(value);
            setErrors((prev) => ({ ...prev, salario: '' }));
        } else if (parseFloat(value.replace(',', '.')) > 100000) {
            setErrors((prev) => ({ ...prev, salario: 'O valor máximo permitido é 100.000.' }));
        } else {
            setErrors((prev) => ({ ...prev, salario: 'Formato inválido. Use duas casas decimais com vírgula.' }));
        }
    };


    const handleHoursMonthly = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const regex = /^\d*(\,\d{0,2})?$/;

        if (value === '' || (regex.test(value) && parseFloat(value) <= 220)) {
            setHoursMonthly(value);
            let hoursWeekly = (parseFloat(value) / 5).toFixed(2);
            setHoursWeekly(hoursWeekly);
            let hoursDaily = (parseFloat(hoursWeekly) / 6).toFixed(2);
            setHoursDaily(hoursDaily);
            setErrors((prev) => ({ ...prev, hoursMonthly: '' }));
        } else if (parseFloat(value) > 220) {
            setErrors((prev) => ({ ...prev, hoursMonthly: 'O valor máximo permitido é 220.' }));
        } else {
            setErrors((prev) => ({ ...prev, hoursMonthly: 'Formato inválido. Use duas casas decimais com vírgula.' }));
        }
    };


    // const handleTipoPagamento = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setTipoPagamento(e.target.value)
    //     setErrors((prev) => ({ ...prev, tipoPagamento: '' }));
    // }


    const HandleTemplateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemplateName(e.target.value)
        setErrors((prev) => ({ ...prev, templateName: '' }));

    }
    const handleInsalubrity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInsalubridade(e.target.value)
        setErrors((prev) => ({ ...prev, insalubridade: '' }));
        if (e.target.value === "1" || e.target.value === "null") {
            setInsalubrityHours("")
        } else {
            setInsalubrityHours(hoursMonthly)
        }
    }
    const handlePericulosity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPericulosidade(e.target.value)
        setErrors((prev) => ({ ...prev, periculosidade: '' }));
        if (e.target.value === "1" || e.target.value === "null") {
            setDangerousnessHours("")
        } else {
            setDangerousnessHours(hoursMonthly)
        }
    }


    const [descriptions, setDescriptions] = useState({
        centerCostCode: '',
        departmentCode: '',
        functionCode: '',
        employeeRoleCode: '',
    });



    const handleSelectChangeCenterCostCode = (selectedOption: { data: string; description: string }) => {

        setSelectedValues((prev) => ({
            ...prev,
            centerCostCode: selectedOption.data

        }));
        setDescriptions((prev) => ({
            ...prev,
            centerCostCode: selectedOption.description
        }))

        getDepartent(selectedOption.data)
    };
    const handleSelectChangeDepartmentCode = (selectedOption: { data: string; description: string }) => {

        setSelectedValues((prev) => ({
            ...prev,
            departmentCode: selectedOption.data

        }));
        setDescriptions((prev) => ({
            ...prev,
            departmentCode: selectedOption.description
        }))
    };
    const handleSelectChangeFunctionCode = (selectedOption: { data: string; description: string }) => {

        setSelectedValues((prev) => ({
            ...prev,
            functionCode: selectedOption.data

        }));
        setDescriptions((prev) => ({
            ...prev,
            functionCode: selectedOption.description
        }))
    };
    const handleSelectChangeEmployeeRoleCode = (selectedOption: { data: string; description: string }) => {

        setSelectedValues((prev) => ({
            ...prev,
            employeeRoleCode: selectedOption.data

        }));
        setDescriptions((prev) => ({
            ...prev,
            employeeRoleCode: selectedOption.description
        }))
    };


    function setFieldsStateToEdit() {
        setCheckEditAndCloneTemplate(true)
        setCheckCreateTemplate(false)
    }
    function setFieldsStateToCreate() {
        setCheckEditAndCloneTemplate(false)
        setCheckCreateTemplate(true)
    }


    useEffect(() => {//ver se é para editar ou criar template, se for editar, preencher campos. se for bloqueado, apenas clona
        if (templateClick) {
            setLoading(true)
            const locationPolularFields = () => {

                const urlGet = `${baseUrl}template/${templateClick}`

                const popularFields = async () => {
                    try {
                        const response = await axios.get(urlGet, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                                'opbase-id': baseOperationalClick
                            }
                        });
                        localStorage.setItem('operationalBase', baseOperationalClick)

                        const data = response.data.data
                        setTemplateId(data.templateId);

                        getCenterCost(data.branchCode)

                        setCenterCostCode(data.centerCostCode);
                        getDepartent(data.centerCostCode)

                        setDepartmentCode(data.departmentCode);


                        setFunctionCode(data.functionCode);

                        setRoleCode(data.roleCode);

                        setHoursDaily(data.hoursDaily);
                        setHoursMonthly(data.hoursMonthly);
                        setHoursWeekly(data.hoursWeekly);



                        setSalario(data.salary);
                        setTipoPagamento(data.paymentType);
                        setContribuicaoSindical(data.sindicalContribution);
                        setInsalubridade(data.hasInsalubrity);
                        setInsalubrityHours(data.insalubrityHours);
                        setPericulosidade(data.hasPericulosity);
                        setDangerousnessHours(data.periculosityHours);
                        setTemplateName(data.templateName);

                        setSelectedValues({
                            centerCostCode: data.centerCostCode,
                            departmentCode: data.departmentCode,
                            functionCode: data.functionCode,
                            employeeRoleCode: data.roleCode,
                        });

                        setDescriptions({
                            centerCostCode: data.centerCostDescription || '',
                            departmentCode: data.departmentDescription || '',
                            functionCode: data.functionDescription || '',
                            employeeRoleCode: data.roleDescription || '',
                        });





                        if (data.isLocked == true) {
                            setEnabled(false)
                        } else {
                            setEnabled(true)
                        }

                    } catch (error: any) {
                        console.error('erro:', error.response.status)
                    } finally {
                        setLoading(false)
                    }
                };

                popularFields();

            }
            locationPolularFields();
            setFieldsStateToEdit()
        } else {
            setFieldsStateToCreate()
        }
    }, [templateClick]);

    const getCenterCost = async (branchCode: string) => { //mpstrar só centro de custo analitico
        setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}template/microservice/center-cost?branchCode=${branchCode}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            })
            const responseData = response.data.data
            setFatalError(false)
            const formattedCenterCostCode = responseData.map((item: any) => ({
                data: item.data,
                description: item.description
            }))
            setData((prev) => ({ ...prev, centerCostCode: formattedCenterCostCode }));
        } catch (error) {
            setFatalError(true)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const getDepartent = async (centerCostCode: string) => {

        setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}template/microservice/department-data?centerCost=${centerCostCode}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            })
            const responseData = response.data.data
            const formattedDepartmentCode = responseData.map((item: any) => ({
                data: item.data,
                description: item.description
            }))
            setData((prev) => ({ ...prev, departmentCode: formattedDepartmentCode }));
            setFatalError(false)
            setDepartmentMessage(false)
            if (responseData.length === 0) {
                setHasDepartment(false)
            } else {
                setHasDepartment(true)
            }
        } catch (error) {
            setDepartmentMessage(true)
            setFatalError(true)
        } finally {
            setLoading(false)
        }
    }
    const getFunctionAndRole = async () => {
        try {
            const response = await axios.get(`${baseUrl}template/microservice/functions-roles`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            })
            const responseData = response.data.data
            const formattedFunctionCode = responseData.functionCodes.map((item: any) => ({
                data: item.data,
                description: item.description
            }))
            setData((prev) => ({ ...prev, functionCode: formattedFunctionCode }));

            const formattedEmployeeRoleCode = responseData.roleCodes.map((item: any) => ({
                data: item.data,
                description: item.description
            }))
            setData((prev) => ({ ...prev, employeeRoleCode: formattedEmployeeRoleCode }));
            setFatalError(false)
        } catch {
            setFatalError(true)
        }
    }

    useEffect(() => {

        // if (localStorage.getItem('branchCode') == '' || localStorage.getItem('branchCode') == null || localStorage.getItem('branchCode') == undefined) { 
        //     setFatalError(true)
        // }

        getCenterCost(localStorage.getItem('branchCode') || '')
        getFunctionAndRole()
    }, []);


    const validateFields = () => { // validar campos
        setErrors({});
        setCenterCostCode(selectedValues.centerCostCode)
        let checkCenterCostCode = selectedValues.centerCostCode
        setDepartmentCode(selectedValues.departmentCode)
        let checkDepartmentCode = selectedValues.departmentCode
        setRoleCode(selectedValues.employeeRoleCode)
        let checkRoleCode = selectedValues.employeeRoleCode
        setFunctionCode(selectedValues.functionCode)
        let checkFunctionCode = selectedValues.functionCode




        const validationErrors: { [key: string]: string } = {};


        if (!checkCenterCostCode) validationErrors.centerCostCode = 'O campo Centro de Custo é obrigatório.';
        if (!salario) validationErrors.salario = 'O campo Salário é obrigatório.';
        // if (!tipoPagamento) validationErrors.tipoPagamento = 'O Tipo de Pagamento é obrigatório.';
        if (!checkDepartmentCode) validationErrors.departmentCode = 'O campo Código de Departamento é obrigatório.';
        if (insalubridade === "null") {
            validationErrors.insalubridade = 'O campo Insalubridade é obrigatório.';
        } else if (["2", "3", "4"].includes(insalubridade) && !insalubrityHours) {
            validationErrors.insalubrityHours = 'O campo Horas de Insalubridade é obrigatório quando Insalubridade está preenchido.';
        }
        if (insalubridade === '1' && insalubrityHours) validationErrors.insalubrityHours = 'Não defica horas de insalubridade se o mesmo não possuir'
        if (periculosidade === '1' && dangerousnessHours) validationErrors.dangerousnessHours = 'Não defina horas de periculosidade se o mesmo não possuir'
        if (periculosidade === "null") {
            validationErrors.periculosidade = 'O campo Periculosidade é obrigatório.';
        } else if (periculosidade === "2" && !dangerousnessHours) {
            validationErrors.dangerousnessHours = 'O campo Horas de Periculosidade é obrigatório quando Periculosidade está preenchido.';
        }
        if (!checkFunctionCode) validationErrors.functionCode = "O campo Código da Função é obrigatório.";
        if (!hoursDaily) validationErrors.hoursDaily = "O campo Horas Diárias é obrigatório.";
        if (!hoursMonthly) validationErrors.hoursMonthly = "O campo Horas Mensais é obrigatório.";
        if (!hoursWeekly) validationErrors.hoursWeekly = "O campo Horas Semanais é obrigatório.";
        if (!templateName) validationErrors.templateName = 'O campo Nome do Template é obrigatório.';
        if (!checkRoleCode) validationErrors.roleCode = 'Campo de Código do Cargo obrigatório';



        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarOpenFields(true)
            return false;
        }
        return true;
    }

    const editTemplate = async () => {

        const formatValue = (value: any) => {
            return typeof value === "string" && value.includes(",")
                ? value.replace(/,/g, ".")
                : value;
        };

        const formattedHoursWeekly = formatValue(hoursWeekly);
        const formattedHoursMonthly = formatValue(hoursMonthly);
        const formattedHoursDaily = formatValue(hoursDaily);

        const formattedSalary = formatValue(salario);
        const formattedInsalubrityHours = formatValue(insalubrityHours);
        const formattedPericulosityHours = formatValue(dangerousnessHours);

        try {
            const response = await axios.put(`${urlPut}${templateId}`, {
                data: {
                    templateId: templateId,

                    branchCode: localStorage.getItem('branchCode'),
                    branchDescription: localStorage.getItem('branchDescription'),

                    centerCostCode: centerCostCode,
                    centerCostDescription: descriptions.centerCostCode,

                    departmentCode: departmentCode,
                    departmentDescription: descriptions.departmentCode,

                    functionCode: functionCode,
                    functionDescription: descriptions.functionCode,

                    roleCode: roleCode,
                    roleDescription: descriptions.employeeRoleCode,


                    hoursWeekly: formattedHoursWeekly,
                    hoursMonthly: formattedHoursMonthly,
                    hoursDaily: formattedHoursDaily,

                    salary: formattedSalary,
                    salaryBaseDis: '0',
                    paymentType: 'M',

                    sindicalContribution: contribuicaoSindical,
                    hasInsalubrity: insalubridade,
                    insalubrityHours: formattedInsalubrityHours,
                    hasPericulosity: periculosidade,
                    periculosityHours: formattedPericulosityHours,

                    templateName: templateName,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            });
            const responseData = response.data?.data;
            close();

            setSalario('');
            setCenterCostCode('');
            setDepartmentCode('');
            setContribuicaoSindical('');
            setInsalubridade('');
            setPericulosidade('');
            setTipoPagamento('');
            setTemplateName('');
            setSelectedValues({
                centerCostCode: '',
                departmentCode: '',
                functionCode: '',
                employeeRoleCode: '',
            })
            setDescriptions({
                centerCostCode: '',
                departmentCode: '',
                functionCode: '',
                employeeRoleCode: '',
            })
            setErrors({});
            setIdReponse(responseData);
            setSnackbarOpenSuccessEdit(true);
            handleCloseModal()
            clearFields()
            setFieldsStateToCreate()
        } catch (error: any) {
            setErrorSnackbar(true);
            console.log(error);
        }
    };

    const createTemplate = async () => {

        const formatValue = (value: any) => {
            return typeof value === "string" && value.includes(",")
                ? value.replace(/,/g, ".")
                : value;
        };

        const formattedHoursWeekly = formatValue(hoursWeekly);
        const formattedHoursMonthly = formatValue(hoursMonthly);
        const formattedHoursDaily = formatValue(hoursDaily);

        const formattedSalary = formatValue(salario);
        const formattedInsalubrityHours = formatValue(insalubrityHours);
        const formattedPericulosityHours = formatValue(dangerousnessHours);


        try {
            const response = await axios.post(urlPost, {
                data: {

                    branchCode: localStorage.getItem('branchCode'),
                    branchDescription: localStorage.getItem('branchDescription'),

                    centerCostCode: centerCostCode,
                    centerCostDescription: descriptions.centerCostCode,

                    departmentCode: departmentCode,
                    departmentDescription: descriptions.departmentCode,

                    functionCode: functionCode,
                    functionDescription: descriptions.functionCode,

                    roleCode: roleCode,
                    roleDescription: descriptions.employeeRoleCode,

                    hoursWeekly: formattedHoursWeekly,
                    hoursMonthly: formattedHoursMonthly,
                    hoursDaily: formattedHoursDaily,

                    salary: formattedSalary,
                    salaryBaseDis: '0',
                    paymentType: tipoPagamento,

                    sindicalContribution: contribuicaoSindical,
                    hasInsalubrity: insalubridade,
                    insalubrityHours: formattedInsalubrityHours,
                    hasPericulosity: periculosidade,
                    periculosityHours: formattedPericulosityHours,

                    templateName: templateName

                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'opbase-id': localStorage.getItem('operationalBase')
                }
            });
            const responseData = response.data?.data;

            setSalario('')
            setCenterCostCode('')
            setDepartmentCode('')
            setContribuicaoSindical('')
            setInsalubridade('')
            setPericulosidade('')
            setTipoPagamento('')
            setTemplateName('')
            setErrors({})
            setIdReponse(responseData)
            setSnackbarOpenSuccess(true)
            handleCloseModal()
            clearFields()
        } catch (error: any) {
            setErrorSnackbar(true)
            console.log(error)
        }

    }


    const handleModalCreate = () => {// modal de criar template

        setErrors({});
        let check = validateFields()
        if (check) {
            setSnackbarOpenFields(false)
            setErrors({});
            setModalOpenCreate(true)
        } else {
            return
        }
    }
    const handleModalClone = () => {// modal de clonar template

        let check = validateFields()
        if (check) {
            setSnackbarOpenFields(false)
            setErrors({});
            setModalOpenClone(true)
        } else {
            return
        }
    }
    const handleModalEdit = () => {// modal de editar template

        let check = validateFields()
        if (check) {
            setSnackbarOpenFields(false)
            setErrors({});
            setModalOpenEdit(true)
        } else {
            return
        }
    }
    const handleCloseModal = () => {// fechar todas as modals
        setModalOpenCreate(false);
        setModalOpenEdit(false);
        setModalOpenClone(false);
    };
    const handleClose = (// fechar snackbars
        _e: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpenFields(false);
        setSnackbarOpenSuccess(false);
        setErrorSnackbar(false);
        setSnackbarOpenSuccessEdit(false);
    };

    const templateListNavigate = () => {
        navigate('/lista-template')
    }


    if (loading) return <Loading />
    if (fatalError) return <FatalError />


    return (
        <div className="">
            <h1 className="text-2xl font-bold flex p-5 dark:text-slate-300">Template de Vaga</h1>


            <Background className=''>
                <div className="w-full">
                    <Button
                        type="button"
                        onClick={templateListNavigate}
                        className="flex ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Pesquisar
                    </Button>
                </div>
                <div className="p-3">

                </div>
                <div className="shadow-2xl dark:shadow-2xl  ">

                    <div className="divide-y divide-slate-400 divide-opacity-30 dark:divide-opacity-20 dark:divide-slate-600">


                        <div className="flex flex-col p-5">
                            <label htmlFor="templateName" className="dark:text-slate-300 text-start font-medium">Nome do Template *</label>
                            <Inputs type="text" value={templateName} onChange={HandleTemplateName} name="templateName" className='inputHiringForm flex' />
                            {errors.templateName && <span className="text-red-500 text-sm bg-red-200 rounded w-96 border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.templateName}</span>}

                        </div>



                        <div className="flex flex-col">
                            <p className="flex p-4 text-2xl font-semibold text-slate-800 dark:text-slate-300">Dados Organizacionais</p>

                            <div className="flex flex-col items-center w-full">{/*campos do micro serviço, dados organizacionais */}


                                <div className="mb-4 w-9/12 flex flex-col">
                                    <label className="dark:text-slate-300 text-start font-medium">Centro de Custo *</label>
                                    <div className="flex justify-between">
                                        <FilterableSelect
                                            options={data.centerCostCode}
                                            value={selectedValues.centerCostCode}
                                            onChange={(value: any) => handleSelectChangeCenterCostCode(value)}
                                            placeholder="Selecione o centro de custo"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Descrição do Centro de Custo"
                                            readOnly
                                            className="inputHiringForm"
                                            value={descriptions.centerCostCode}
                                        />
                                    </div>

                                    {errors.centerCostCode && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.centerCostCode}</span>}

                                </div>
                                {departmentMessage == true && (
                                    <p className="bg-gray-300 p-2 pr-8 pl-8 rounded-full font-semibold shadow-2xl">Selecione um Centro de Custo para acessar a lista departamentos vinculados.</p>
                                )}
                                {departmentMessage == false && (
                                    <>

                                        {hasDepartment == false && (
                                            <p className="bg-red-200 p-4 rounded-2xl font-semibold text-red-950 m-4">Não foi encontrado nenhum departamento vinculado à este Centro de Custo. Cadastre um departamento ou selecione outro Centro de Custo.</p>
                                        )}
                                        {hasDepartment == true && (


                                            <div className="mb-4 w-9/12 flex flex-col">
                                                <label className="dark:text-slate-300 text-start font-medium">Departamento *</label>
                                                <div className="flex justify-between">
                                                    <FilterableSelect
                                                        options={data.departmentCode}
                                                        value={selectedValues.departmentCode}
                                                        onChange={(value: any) => handleSelectChangeDepartmentCode(value)}
                                                        placeholder="Selecione o departamento"
                                                    />
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        placeholder="Descrição do Departamento"
                                                        className="inputHiringForm"
                                                        value={descriptions.departmentCode}
                                                    />
                                                </div>
                                                {errors.departmentCode && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.departmentCode}</span>}
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="mb-4 w-9/12 flex flex-col">
                                    <label className="dark:text-slate-300 text-start font-medium">Cargo *</label>
                                    <div className="flex justify-between">
                                        <FilterableSelect
                                            options={data.employeeRoleCode}
                                            value={selectedValues.employeeRoleCode}
                                            onChange={(value: any) => handleSelectChangeEmployeeRoleCode(value)}
                                            placeholder="Selecione o cargo"
                                        />
                                        <input
                                            type="text"
                                            readOnly
                                            placeholder="Descrição do Cargo"
                                            className="inputHiringForm"
                                            value={descriptions.employeeRoleCode}
                                        />
                                    </div>
                                    {errors.roleCode && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.roleCode}</span>}

                                </div>

                                <div className="mb-4 w-9/12 flex flex-col">
                                    <label className="dark:text-slate-300 text-start font-medium">Função *</label>
                                    <div className="flex justify-between">
                                        <FilterableSelect
                                            options={data.functionCode}
                                            value={selectedValues.functionCode}
                                            onChange={(value: any) => handleSelectChangeFunctionCode(value)}
                                            placeholder="Selecione a função"
                                        />
                                        <input
                                            type="text"
                                            readOnly
                                            placeholder="Descrição da Função"
                                            className="inputHiringForm"
                                            value={descriptions.functionCode}
                                        />
                                    </div>
                                    {errors.functionCode && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.functionCode}</span>}

                                </div>
                            </div>

                        </div>


                        <div className="flex flex-col">
                            <p className="flex p-4 text-2xl font-semibold text-slate-800 dark:text-slate-300">Informações de horario de trabalho</p>
                            <div className="flex">
                                <div className="flex flex-col p-8">

                                    <label htmlFor="hoursMonthly" className="dark:text-slate-300 text-start font-medium">Horas Mensais *</label>
                                    <Inputs
                                        type="text"
                                        name="hoursMonthly"
                                        value={hoursMonthly}
                                        onChange={handleHoursMonthly}
                                        className="inputHiringForm"
                                    />
                                    {errors.hoursMonthly && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.hoursMonthly}</span>}

                                </div>


                                <div className="flex flex-col p-8">
                                    <label htmlFor="hoursWeekly" className="dark:text-slate-300 text-start font-medium">Horas Semanais *</label>
                                    <Inputs
                                        type="text"
                                        name="hoursWeekly"
                                        value={hoursWeekly}
                                        readOnly
                                        className="inputHiringForm"
                                    />
                                    {errors.hoursWeekly && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.hoursWeekly}</span>}

                                </div>


                                <div className="flex flex-col p-8">
                                    <label htmlFor="hoursDaily" className="dark:text-slate-300 text-start font-medium">Horas Diárias *</label>
                                    <Inputs
                                        type="text"
                                        name="hoursDaily"
                                        value={hoursDaily}
                                        readOnly
                                        className="inputHiringForm"
                                    />
                                    {errors.hoursDaily && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.hoursDaily}</span>}

                                </div>
                            </div>
                        </div>



                        <div className="flex flex-col">
                            <p className="flex p-4 text-2xl font-semibold text-slate-800 dark:text-slate-300">Informações de Salário</p>
                            <div className="flex">

                                <div className="flex flex-col p-8">
                                    <label htmlFor="salario" className="dark:text-slate-300 text-start font-medium">Salário do Funcionário *</label>
                                    <Inputs
                                        type="text"
                                        name="salario"
                                        value={salario}
                                        onChange={handleSalario}
                                        className='inputHiringForm'
                                    />
                                    {errors.salario && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.salario}</span>}
                                </div>




                                {/* <div className="flex flex-col p-8">

                                    <label htmlFor="tipoPagamento" className="dark:text-slate-300 text-start font-medium">Tipo de Pagamento *</label>
                                    <select
                                        name="tipoPagamento"
                                        value={tipoPagamento}
                                        onChange={handleTipoPagamento}
                                        className='inputHiringForm'
                                    >
                                        <option value="">Selecione uma opção:</option>
                                        <option value="M">Pagamento Mensal</option>
                                        <option value="S">Pagamento Semanal</option>
                                    </select>
                                    {errors.tipoPagamento && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.tipoPagamento}</span>}
                                </div> */}
                            </div>
                        </div>



                        <div className="flex flex-col">
                            <p className="flex p-4 text-2xl font-semibold text-slate-800 dark:text-slate-300">Contribuições e Benefícios</p>
                            <div className="flex">


                                <div className="flex flex-col p-8">
                                    <label htmlFor="insalubridade" className="dark:text-slate-300 text-start font-medium">Possui Insalubridade? *</label>
                                    <select name="insalubridade" className='inputHiringForm' value={insalubridade} onChange={handleInsalubrity}>
                                        <option value={'null'}>Selecione uma opção:</option>
                                        <option value={'1'}>1 - Não</option>
                                        <option value={'2'}>2 - Mínima</option>
                                        <option value={'3'}>3 - Média</option>
                                        <option value={'4'}>4 - Máxima</option>
                                    </select>
                                    {errors.insalubridade && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.insalubridade}</span>}
                                </div>

                                <div className="flex flex-col p-8">
                                    <label htmlFor="insalubrityHours" className="dark:text-slate-300 text-start font-medium">Horas Insalubridade</label>
                                    <Inputs
                                        className='inputHiringForm'
                                        type="number"
                                        name="insalubrityHours"
                                        value={insalubrityHours}
                                        readOnly />
                                    {errors.insalubrityHours && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.insalubrityHours}</span>}

                                </div>



                            </div>
                            <div className="flex">

                                <div className="flex flex-col p-8">

                                    <label htmlFor="periculosidade" className="dark:text-slate-300 text-start font-medium">Possui Periculosidade? *</label>
                                    <select name="periculosidade" className='inputHiringForm' value={periculosidade} onChange={handlePericulosity}>
                                        <option value={'null'}>Selecione uma opção:</option>
                                        <option value={'1'}>1 - Não</option>
                                        <option value={'2'}>2 - Sim</option>
                                    </select>
                                    {errors.periculosidade && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.periculosidade}</span>}
                                </div>

                                <div className="flex flex-col p-8">
                                    <label htmlFor="dangerousnessHours" className="dark:text-slate-300 text-start font-medium">Horas Periculosidade</label>
                                    <Inputs
                                        className='inputHiringForm'
                                        type="number"
                                        name="dangerousnessHours"
                                        value={dangerousnessHours}
                                        readOnly />
                                    {errors.dangerousnessHours && <span className="text-red-500 text-sm bg-red-200 rounded border-red-600 border-2 dark:border-red-900 dark:bg-red-500 dark:text-red-200">{errors.dangerousnessHours}</span>}

                                </div>
                            </div>
                        </div>
                    </div>

                    {checkCreateTemplate && ( //mostra 'criar' template apenas se não tiver template selecionado
                        <div className="flex p-8">
                            <button
                                onClick={handleModalCreate}
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
                                    Criar
                                </div>
                            </button>
                        </div>
                    )}

                    {checkEditAndCloneTemplate && ( //mostra 'salvar / clonar' template apenas se tiver template selecionado     

                        <div className="flex p-8">

                            {enabled && (
                                <button
                                    onClick={handleModalEdit} //editar
                                    className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                ><div className="flex flex-row">
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
                            )}


                            <button
                                onClick={handleModalClone} //clonar
                                className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                            ><div className="flex flex-row">
                                    <svg className="h-5 w-5 text-gray-100 mr-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                    Duplicar
                                </div>
                            </button>




                        </div>
                    )}
                </div>

                <Modal //modal de criar template
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
                            Criar um novo template?
                        </p>
                        <div className="flex justify-center mt-10">
                            <button onClick={createTemplate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Sim
                            </button>

                            <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                            >
                                Não
                            </button>
                        </div>
                    </Box>

                </Modal>


                <Modal //modal de editar template
                    open={modalOpenEdit}
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
                        <div>
                            <div id="parent-modal-description" className="text-center flex justify-center mt-5 text-lg">
                                Editar o template de ID <p className="font-semibold ml-2 mr-1">{templateId}</p>?
                            </div>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button onClick={editTemplate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Sim
                            </button>

                            <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                            >
                                Não
                            </button>
                        </div>
                    </Box>

                </Modal>


                <Modal //modal de clonar template
                    open={modalOpenClone}
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
                        <p id="parent-modal-description" className="text-center flex justify-center mt-5 text-lg">
                            Criar um novo template com base no template de ID {templateId}?
                        </p>
                        <div className="flex justify-center mt-10">
                            <button onClick={createTemplate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Sim
                            </button>

                            <button onClick={handleCloseModal} className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                            >
                                Não
                            </button>
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


                {/*Snackbar de sucesso criar*/}
                <Snackbar open={snackbarOpenSuccess} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Template de ID {idReponse} criado com sucesso!
                    </Alert>
                </Snackbar>

                {/*Snackbar de sucesso editar*/}
                <Snackbar open={snackbarOpenSuccessEdit} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Template de ID {idReponse} editado com sucesso!
                    </Alert>
                </Snackbar>

            </Background>
        </div>
    )
}

export default VacancyForm;