import { useEffect, useState } from "react"
import { baseUrl } from "../../../../shareUrl"
import axios from "axios"
import FilterableSelect from "../../shared/FilterableSelect"
import { Snackbar, Alert } from "@mui/material";
import FatalError from "../../shared/FaltalError";
import Loading from "../../shared/Loading";

interface company {
    id: string;
    name: string;
}
const initialCompany: company = {
    id: '',
    name: ''
}

export default function OperationalBaseCreateForm() {

    const URL_BASECREATE = `${baseUrl}opbase`
    const URL_BRANCH_CODE_LIST = `${baseUrl}template/microservice/branch-code`

    const [operationalBaseName, setOperationalBaseName] = useState('')
    const [company, setCompany] = useState<company>(initialCompany)
    const [companyOptions, setCompanyOptions] = useState<{ id: string; name: string }[]>([])
    const [fatalError, setFatalError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successSnackbar, setSuccessSnackbar] = useState(false)

    const handleClose = () => {
        setErrorSnackbar(false)
        setSuccessSnackbar(false)

    }


    const handleCompanyChange = (item: any) => {
        setCompany((prevState) => ({ ...prevState, name: item.name, id: item.id }))
    }
    const handleOperationalBaseName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOperationalBaseName(e.target.value)
    }

    useEffect(() => {

        const fetchCompany = async () => {
            setLoading(true)
            try {
                const response = await axios.get(URL_BRANCH_CODE_LIST,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                )
                const data = response.data.data;
                const formattedOptions = data.map((item: {
                    data: string;
                    description: string;
                }) => ({
                    id: item.data,
                    name: item.description
                }))
                setCompanyOptions(formattedOptions)
            } catch {
                setFatalError(true)
            } finally {
                setLoading(false)
            }
        }


        fetchCompany()
    }, [])

    const sendOperationalBase = async (e: any) => {
        e.preventDefault()
        if (operationalBaseName == '' || company.id == '') {
            setErrorMessage('Preencha todos os campos!')
            setErrorSnackbar(true)
            return
        }

        try {
            await axios.post(URL_BASECREATE, {
                data: {
                    name: operationalBaseName,
                    companyName: company.name,
                    companyId: company.id
                }
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })

            setSuccessSnackbar(true)
            setOperationalBaseName('')
            setCompany(initialCompany)
        } catch (error: any) {
            setErrorMessage('Ocorreu um erro inesperado')
            setErrorSnackbar(true)
        }
    }

    if (loading) return <Loading />
    if (fatalError) return <FatalError />

    return (
        <>
            <h1 className="flex text-2xl font-bold text-slate-900 dark:text-slate-200 p-6">Crie uma Nova Base Operacional</h1>
            <form onSubmit={sendOperationalBase}>

                <div className="flex flex-col place-self-center">
                    <label htmlFor="operationalBaseName" className="flex font-semibold">Nome da Base Operacional</label>
                    <input type="text" name="operationalBaseName" maxLength={100} className="inputHiringForm" value={operationalBaseName} onChange={handleOperationalBaseName} />
                </div>

                <div className="flex flex-col place-self-center">
                    <label htmlFor="operationalBaseName" className="flex font-semibold">Selecione a Filial</label>
                    <FilterableSelect
                        options={Object.values(companyOptions).flat()}
                        onChange={(selectedOption: any) => { handleCompanyChange(selectedOption) }}
                        value={company.name}
                    />
                </div>
                <div className="place-self-center pt-10">
                    <button
                        type="submit"
                        className="flex text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
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
                </div>

            </form>

            <Snackbar open={errorSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Processo concluido com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}