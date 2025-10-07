import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterableSelect from "../../components/shared/FilterableSelect";
import axios from "axios";
import { baseUrl } from "../../../shareUrl";
import Loading from "../../components/shared/Loading";
import Button from "@mui/material/Button";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface UserType {
    userId: string;
    cpf: string;
    name: string;
    email: string;
    telephone: string
    status: boolean;

    profile: {
        profileId: string;
        description: string;
    }
}
const initialUser: UserType = {
    userId: '',
    cpf: '',
    name: '',
    email: '',
    telephone: '',
    status: false,

    profile: {
        profileId: '',
        description: ''
    }
}
interface BaseOptionsType {
    name: string;
    operationalBaseId: string;
}


export default function UserForm() {


    const navigate = useNavigate()
    const location = useLocation();
    const { userId } = location.state || {};


    const URL_GET_USER_DATA = `${baseUrl}user/${userId}`;
    const URL_GET_PROFILE = `${baseUrl}profile/list`;
    const URL_GET_OPERATIONAL_BASES = `${baseUrl}opbase/list?userId=${localStorage.getItem('userId')}`
    const URL_POST_USER = `${baseUrl}user`
    const URL_PUT_USER = `${baseUrl}user/`

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState<UserType>(initialUser)
    const [profileOptions, setProfileOptions] = useState<{ profileId: string; description: string }[]>([])
    const [operationalBaseOptions, setOperationalBaseOptions] = useState<BaseOptionsType[]>([])
    const [opBaseIds, setOpBaseIds] = useState<string[]>([]);

    const [editUser, setEditUser] = useState(false)

    const [validadeFieldsSnackBar, setValidateFieldsSnackbar] = useState(false)
    const [errorSubmitSnackBar, setErrorSubmitSnackbar] = useState(false)
    const [successSnackBar, setSuccessSnackbar] = useState(false)
    const [validadeOpBasesSnackBar, setValidateOpBasesSnackbar] = useState(false)
    const [superADMSnackbar, setSuperADMSnackbar] = useState(false)
    const [selfEditSnackbar, setSelfEditSnackbar] = useState(false)



    const handleCloseSnakcbar = () => {
        setValidateFieldsSnackbar(false)
        setErrorSubmitSnackbar(false)
        setSuccessSnackbar(false)
        setValidateOpBasesSnackbar(false)
        setSuperADMSnackbar(false)
        setSelfEditSnackbar(false)
    }

    const handleProfile = (item: any) => {
        setUser((prevState) => ({
            ...prevState,
            profile: {
                profileId: item.profileId,
                description: item.description,
            },
        }))
    }

    const formatCPF = (value: string) => {
        const numericCPFValue = value.replace(/\D/g, '').slice(0, 11);
        return numericCPFValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let newValue = value

        if (name == 'cpf') {
            newValue = formatCPF(newValue)
        }
        if (name == 'telephone') {
            newValue = newValue.slice(0, 15).replace(/\D/g, '');
        }
        if (name == 'email') {
            newValue = newValue.slice(0, 40)
        }
        if (name == 'name') {
            newValue = newValue.slice(0, 50)
        }

        setUser((prevState) => ({
            ...prevState,
            [name]: newValue
        }))
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target; // Pega o novo valor do Switch (true ou false)
        setUser((prevState) => ({
            ...prevState,
            status: checked, // Atualiza o status do usuário
        }));
    };


    const handleOperationalBase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        setOpBaseIds((prevState) => {
            if (checked) {
                return [...prevState, value];
            } else {
                return prevState.filter((id) => id !== value);
            }
        });
    };
    // useEffect(() => {
    //     console.log(opBaseIds)
    // }, [opBaseIds])

    const getOptions = async () => { // busca dos perfis pro select
        const operationalBase = localStorage.getItem('operationalBase') || null;
        try {
            const response = await axios.get(URL_GET_PROFILE,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'opbase-id': operationalBase
                    }
                }
            );
            let data = response.data.data
            const formattedData = data.map((item: {
                profileId: string;
                description: string;
            }) => ({
                profileId: item.profileId,
                description: item.description
            }))
            setProfileOptions(formattedData)

        } catch (error) {
            console.error('erro na busca de perfil')
        }
    };

    const getUserData = async () => { // busca dados do usuario
        setLoading(true)
        try {
            const response = await axios.get(URL_GET_USER_DATA, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const userData = response.data.data;
            const formattedData = {
                userId: userData.userId,
                cpf: userData.cpf.replace(/\D/g, ''),
                name: userData.name,
                email: userData.email,
                telephone: userData.telephone,
                status: userData.status,
                profile: {
                    description: userData.profile.description,
                    profileId: userData.profile.profileId
                }
            }

            const baseIds = userData.operationalBases.map((base: any) => base.operationalBaseId);
            setUser(formattedData)
            setOpBaseIds(baseIds);

        } catch {
            console.log('erro resolve ai')
        } finally {
            setLoading(false)
        }
    }
    const getOperationalBases = async () => { //busca bases operacionais
        try {
            const response = await axios.get(URL_GET_OPERATIONAL_BASES, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            const responseData = response.data.data
            const formattedBases = responseData.map((item: BaseOptionsType) => ({
                operationalBaseId: item.operationalBaseId,
                name: item.name
            }))
            setOperationalBaseOptions(formattedBases)
        } catch {

        }
    }

    useEffect(() => {
        if (userId) {
            setEditUser(true);
            getUserData();
        } else {
            setEditUser(false);
            setUser(initialUser)
        }
        getOptions();
        getOperationalBases();
    }, []);

    function validateFields() {

        if (localStorage.getItem('userId') == user.userId) {
            setSelfEditSnackbar(true)
            return false
        }

        if (user.cpf == '' || user.email == '' || user.name == '' || user.profile.profileId == '' || user.telephone == '') {
            setValidateFieldsSnackbar(true)
            return false
        } else return true
    }
    function validadeOperatinalBases() {
        if (opBaseIds.length == 0) {
            setValidateOpBasesSnackbar(true)
            return false
        } else return true
    }

    function submitUser() {
        let validatedFields = validateFields()
        let validatedOpBases = validadeOperatinalBases()
        if (validatedFields && validatedOpBases) {
            if (editUser) {
                putUser()
            } else {
                postUser()
            }
        }
    }

    const putUser = async () => {
        if (user.userId == '1') {
            setSuperADMSnackbar(true)
            return
        }
        try {
            await axios.put(`${URL_PUT_USER}${user.userId}`, {
                data: {
                    user: {
                        name: user.name,
                        cpf: user.cpf,
                        email: user.email,
                        telephone: user.telephone,
                        status: user.status,
                        profileId: user.profile.profileId,
                    },
                    opBaseIds: opBaseIds

                },
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'user-id': localStorage.getItem('userId'),
                        'opbase-id': localStorage.getItem('operationalBase')
                    },
                }
            )
            setUser(initialUser)
            setOpBaseIds([])
            setSuccessSnackbar(true)
        } catch (error) {
            setErrorSubmitSnackbar(true)
        }
    }
    const postUser = async () => {
        try {
            await axios.post(URL_POST_USER, {
                data: {
                    user: {
                        name: user.name,
                        cpf: user.cpf.replace(/\D/g, ''),
                        email: user.email,
                        telephone: user.telephone,
                        profileId: user.profile.profileId,
                    },

                    opBaseIds

                },
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'user-id': localStorage.getItem('userId')
                    },
                })
            setUser(initialUser)
            setOpBaseIds([])
            setSuccessSnackbar(true)
        } catch (error) {
            setErrorSubmitSnackbar(true)
        }
    }


    if (loading) return <Loading />

    return (
        <div className="p-8 flex flex-col">
            <div>
                <h1 className="flex text-xl font-bold dark:text-slate-200">
                    {editUser ? "Editar Usuário" : "Criar Usuário"}
                </h1>
                <div className="flex w-10">

                    <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => navigate('/usuario-lista')}>
                        Pesquisar
                    </button>

                </div>
                {editUser && (
                    <>
                        <label className="flex" htmlFor="userCode">Código</label>
                        <input
                            type="text"
                            value={user.userId}
                            readOnly={true}
                            className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg block w-2/12 p-2.5 dark:bg-[#3E5875] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </>

                )}
            </div>

            <div className="flex space-x-20">
                <div>

                    <label className="flex dark:text-slate-50" htmlFor="acessProfile">Perfil de Acesso *</label>
                    <FilterableSelect
                        options={profileOptions}
                        value={user.profile.description}
                        onChange={(selectedOption: any) => handleProfile(selectedOption)}
                    />

                    <label htmlFor="descricao" className="dark:text-slate-200 flex">Nome *</label>
                    <input type="text"
                        name="name"
                        placeholder="Insira o nome:"
                        value={user.name}
                        onChange={handleUserChange}
                        className='flex my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:bg-[#3E5875] dark:text-black'
                    />
                    <label htmlFor="descricao" className="dark:text-slate-200 flex">CPF *</label>
                    <input type="text"
                        name="cpf"
                        placeholder="Insira o nome:"
                        value={user.cpf}
                        onChange={handleUserChange}
                        className='flex my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:bg-[#3E5875] dark:text-black'
                    />
                    <label htmlFor="descricao" className="dark:text-slate-200 flex">E-mail *</label>
                    <input type="text"
                        name="email"
                        placeholder="Insira o nome:"
                        value={user.email}
                        onChange={handleUserChange}
                        className='flex my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:bg-[#3E5875] dark:text-black'
                    />
                    <label htmlFor="descricao" className="dark:text-slate-200 flex">Telefone *</label>
                    <input type="text"
                        name="telephone"
                        placeholder="Insira o nome:"
                        value={user.telephone}
                        onChange={handleUserChange}
                        className='flex my-2 w-96 p-3 border-gray-500 border rounded space-x-0.5 dark:bg-[#3E5875] dark:text-black'
                    />

                    {editUser ? (

                        <div className="flex">
                            <FormControlLabel control={<Switch checked={user.status} value={user.status} onChange={handleStatusChange} />} label="Label" />
                        </div>
                    ) : (
                        <div className="flex">
                            <label className="inline-flex items-center cursor-default">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 pr-3">Status</span>
                                <input type="checkbox" value="" className="sr-only peer" disabled checked></input>
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300">
                                </div>
                            </label>
                        </div>
                    )}

                </div>
                <div className="bg-slate-200 p-3 rounded-xl">
                    <p className="font-semibold text-lg">Selecione as Bases Operacionais que esse usuário terá Acesso:</p>
                    <div className="flex flex-col space-y-3">
                        {operationalBaseOptions.map((item: BaseOptionsType) => (
                            <div className="flex hover:bg-slate-300 p-1">
                                <input type="checkbox" checked={opBaseIds.includes(item.operationalBaseId)} className="w-4" name={item.name} id={item.name} value={item.operationalBaseId} onChange={handleOperationalBase} />
                                <label htmlFor={item.name} className="ml-3">{item.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="place-self-end">
                    <Button variant="contained" onClick={submitUser}>Salvar<SaveRoundedIcon /></Button>
                </div>
            </div>

            {/*snack validação de campos */}
            <Snackbar open={validadeFieldsSnackBar} autoHideDuration={2000} onClose={handleCloseSnakcbar}>
                <Alert
                    onClose={handleCloseSnakcbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Preecha todos os campos!
                </Alert>
            </Snackbar>

            {/*sack erro na requisição */}
            <Snackbar open={errorSubmitSnackBar} autoHideDuration={3000} onClose={handleCloseSnakcbar}>
                <Alert
                    onClose={handleCloseSnakcbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Tivemos um erro com sua solicitação, procure o suporte!
                </Alert>
            </Snackbar>

            {/*snack sucesso */}
            <Snackbar open={successSnackBar} autoHideDuration={2000} onClose={handleCloseSnakcbar}>
                <Alert
                    onClose={handleCloseSnakcbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Processo concluído com sucesso!
                </Alert>
            </Snackbar>

            {/*snack base operacional */}
            <Snackbar open={validadeOpBasesSnackBar} autoHideDuration={3000} onClose={handleCloseSnakcbar}>
                <Alert
                    onClose={handleCloseSnakcbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    O usuário deve fazer parte de ao menos uma Base Operacional!
                </Alert>
            </Snackbar>

            <Snackbar open={superADMSnackbar} autoHideDuration={3000} onClose={handleCloseSnakcbar}>
                <Alert
                    onClose={handleCloseSnakcbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Não é possivel alterar as informações do <b className="underline">Usuário Master</b>!
                </Alert>
            </Snackbar>

            <Snackbar open={selfEditSnackbar} autoHideDuration={3000} onClose={handleCloseSnakcbar}>
                <Alert
                    onClose={handleCloseSnakcbar}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Não é permitido o usuário alterar suas próprias informações!
                </Alert>
            </Snackbar>
        </div>
    )
}