///// NADA DESENVOLVIDO AQUI DEVE SER LEVADO EM CONSIDERAÇÃO PARA A EXECUÇÃO DO SISTEMA /////

import axios from "axios";
import { useEffect, useState } from "react";


function Test() {

    const [alou, setAlou] = useState<any>('')
    const imagem = localStorage.getItem('photo3x4file')
    const [img, setImg] = useState('')
    setImg(`data:image/jpg;${imagem}`)
    const get = async () => {
        console.log('foi')
        const tentando = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

        setAlou(tentando.data.data)
        console.log(tentando.data.data)
    }


    useEffect(() => {
        get()
        console.log(alou)
    }, [])

    return (
        <>AAAAAAAAAAAAAAAAAAAAAAAAA

            <img src={img || ''} alt="hehe" />
            oi

        </>
    )
}

export default Test;


///// NADA DESENVOLVIDO AQUI DEVE SER LEVADO EM CONSIDERAÇÃO PARA A EXECUÇÃO DO SISTEMA /////