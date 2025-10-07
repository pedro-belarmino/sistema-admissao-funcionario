import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { baseUrl } from '../../shareUrl';
import axios from 'axios';

const URL_GET_BASES = `${baseUrl}opbase/list?userId=${localStorage.getItem('userId')}`

export default function OperationalBase() {
    const navigate = useNavigate()
    const location = useLocation();

    const { page } = location.state || {};

    const [operationalBaseOptions, setOperationalBaseOptions] = useState<any>([])
    const [operationalBase, setOperationalBase] = useState('');
    const [open, setOpen] = useState(false)

    const handleClose = ( //fechar snakbarrrr
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    }

    const handleChange = (event: SelectChangeEvent) => {
        const selectedId = event.target.value as string;
        setOperationalBase(selectedId);
        localStorage.setItem('operationalBase', selectedId);

        const selectedBase = operationalBaseOptions.find(
            (base: any) => base.operationalBaseId === selectedId
        );
        if (selectedBase) {
            localStorage.setItem('branchCode', selectedBase.companyId);
        }
        const baseName = operationalBaseOptions.find(
            (base: any) => base.operationalBaseId === selectedId)
        if (baseName) {
            localStorage.setItem('branchDescription', selectedBase.name)
        } else localStorage.setItem('branchDescription', 'cu')
    };

    const getOperationalBases = async () => {
        const response = await axios.get(URL_GET_BASES,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
        const responseData = response.data.data
        console.log(responseData)
        setOperationalBaseOptions(responseData)
    }

    useEffect(() => {
        getOperationalBases()
    }, [])

    const redirect = () => {
        if (!operationalBase) {
            setOpen(true)
        } else {
            if (page == 'template') navigate('/template-vaga');
            if (page == 'contratacao') navigate('/cadastro-contratacao');
        }
    }


    return (
        <div className="m-10">
            <div className='bg-gray-200 w-5/12 place-self-center rounded-3xl border h-full p-10'>
                <p className="font-bold underline text-xl p-5">Selecione uma Base Operacional:</p>
                <div className='w-10/12 place-self-center p-5'>
                    <Box>
                        <FormControl className='w-full'>
                            <InputLabel id="select-operational-base">Base Operacional</InputLabel>
                            <Select
                                labelId="select-operational-base"
                                id="demo-simple-select"
                                value={operationalBase}
                                onChange={handleChange}
                                label="Base Operacional"
                            >
                                {operationalBaseOptions.map((base: any) => (
                                    <MenuItem value={base.operationalBaseId} key={base.operationalBaseId}>
                                        {base.operationalBaseId} - {base.name} - {base.companyId}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>

                </div>
                <Button variant='contained' onClick={redirect}>prosseguir</Button>


                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >

                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Selecione uma Base Operacional!
                    </Alert>

                </Snackbar>
            </div>
        </div>
    )
}