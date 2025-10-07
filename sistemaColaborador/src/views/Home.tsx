import axios from "axios"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../../shareUrl"
import { useEffect } from "react"


export default function Home() {

    const navigate = useNavigate()

    const firstNavigate = () => {

        navigate('/identificacao-pessoal')
    }

    const arrivingIfThereIsData = async () => {
        const URL_GET = `${baseUrl}employee/page/fetch?&token=${localStorage.getItem('sessionToken')}`

        try {
            const response = await axios.get(URL_GET, {
                headers: {
                    'session-token': `${localStorage.getItem('sessionToken')}`,
                },
            })
            const data = response.data.data
            if (response.status === 200) {
                localStorage.setItem('employeeFullName', data.employeeFullName);
                localStorage.setItem('employeeNickname', data.employeeNickname);
                localStorage.setItem('nameSocial', data.nameSocial);
                localStorage.setItem('nameMother', data.nameMother);
                localStorage.setItem('nameFather', data.nameFather);
                localStorage.setItem('employeeSex', data.employeeSex);
                localStorage.setItem('employeeBirthday', data.employeeBirthday);
                localStorage.setItem('employeeMaritalStatus', data.employeeMaritalStatus);
                localStorage.setItem('employeeEthnicity', data.employeeEthnicity);
                localStorage.setItem('employeeNationality', data.employeeNationality);
                localStorage.setItem('brazillianExteriorBorn', data.brazillianExteriorBorn);
                localStorage.setItem('employeeNaturality', data.employeeNaturality);
                localStorage.setItem('employeeBornStateCode', data.employeeBornStateCode);
                localStorage.setItem('employeeBornState', data.employeeBornState);
                localStorage.setItem('pis', data.pis);
                localStorage.setItem('rg', data.rg);
                localStorage.setItem('rgIssueDate', data.rgIssueDate);
                localStorage.setItem('rgUf', data.rgUf);
                localStorage.setItem('idDocOrgIssuer', data.idDocOrgIssuer);
                localStorage.setItem('rgOrgExpedition', data.rgOrgExpedition);
                localStorage.setItem('rgOrgIssuer', data.rgOrgIssuer);
                localStorage.setItem('professionalCard', data.professionalCard);
                localStorage.setItem('professionalCardSerial', data.professionalCardSerial);
                localStorage.setItem('professionalCardUf', data.professionalCardUf);
                localStorage.setItem('ctpsIssueDate', data.ctpsIssueDate);
                localStorage.setItem('militaryServiceCard', data.militaryServiceCard);
                localStorage.setItem('voterTitle', data.voterTitle);
                localStorage.setItem('voterZone', data.voterZone);
                localStorage.setItem('voterSection', data.voterSection);
                localStorage.setItem('addressType', data.addressType);
                localStorage.setItem('logradouroType', data.logradouroType);
                localStorage.setItem('logradouroDescription', data.logradouroDescription);
                localStorage.setItem('logradouroNumber', data.logradouroNumber);
                localStorage.setItem('employeeAddress', data.employeeAddress);
                localStorage.setItem('employeeNeighborhood', data.employeeNeighborhood);
                localStorage.setItem('employeeState', data.employeeState);
                localStorage.setItem('employeeMunicipe', data.employeeMunicipe);
                localStorage.setItem('addressComplement', data.addressComplement);
                localStorage.setItem('cep', data.cep);
                localStorage.setItem('issuerCountryCode', data.issuerCountryCode);
                localStorage.setItem('rneNumber', data.rneNumber);
                localStorage.setItem('rneOrgIssuer', data.rneOrgIssuer);
                localStorage.setItem('rneIssueDate', data.rneIssueDate);
                localStorage.setItem('residenceCountryForeign', data.residenceCountryForeign);
                localStorage.setItem('foreignResident', data.foreignResident);
                localStorage.setItem('foreignClassification', data.foreignClassification);
                localStorage.setItem('marriedToBrazillian', data.marriedToBrazillian);
                localStorage.setItem('hasBrazillianChildren', data.hasBrazillianChildren);
                localStorage.setItem('brazilArrivalDate', data.brazilArrivalDate);
                localStorage.setItem('naturalizationNumber', data.naturalizationNumber);
                localStorage.setItem('naturalizationDate', data.naturalizationDate);
                localStorage.setItem('landlineDdd', data.landlineDdd);
                localStorage.setItem('landline', data.landline);
                localStorage.setItem('phoneDdd', data.phoneDdd);
                localStorage.setItem('phone', data.phone);
                localStorage.setItem('emailMain', data.emailMain);
                localStorage.setItem('emailAlternative', data.emailAlternative);
                localStorage.setItem('hasDisability', data.hasDisability);
                localStorage.setItem('disabilityType', data.disabilityType);
                localStorage.setItem('disabilityComplements', data.disabilityComplements);
                localStorage.setItem('preEmployeeId', data.preEmployeeId);
                localStorage.setItem('employeeAccessId', data.accessId);
                localStorage.setItem('hasInformation', 'true');
                localStorage.setItem('employeePageId', data.epId);
                localStorage.setItem('reload', 'true')
                localStorage.setItem('bornMunicipeCode', data.bornMunicipe);
                localStorage.setItem('bornMunicipe', data.bornMunicipeCode);
            }


        } catch (error: any) {
            if (error.response.status === 404) {
                console.log('Erro indica ser o primeiro acesso do colaborador à esta página.')
                return;
            }
        }
    }



    useEffect(() => {

        const getUrl = window.location.href
        const getId = new URL(getUrl)
        const Id = getId.searchParams.get('accessId')
        localStorage.setItem('accessId', Id || '')

        const url = `${baseUrl}employee/page/login/${Id}`;


        const tokenTemporarilySave = localStorage.getItem('token')
        const sessionTokenTemporarilySave = localStorage.getItem('sessionToken')
        const captchaTemporarilySave = localStorage.getItem('_grecaptcha')
        const accessId = localStorage.getItem('accessId');
        localStorage.clear()
        localStorage.setItem('accessId', accessId || '')
        localStorage.setItem('sessionToken', sessionTokenTemporarilySave || '')
        localStorage.setItem('_grecaptcha', captchaTemporarilySave || '')
        localStorage.setItem('token', tokenTemporarilySave || '')
        arrivingIfThereIsData()

        const login = async () => {
            try {
                const response = await axios.post(url);
                localStorage.setItem('sessionToken', response.data.token);
            } catch (error) {
                console.log('jksfhaobiftaisuyusdy erro do login aquele la ')
            }


        }
        login()
    }, [])


    return <>

        <div className="rounded-xl w-10/12 place-self-center bg-white m-3 mt-20">
            <h1 className="text-2xl text-center bg-gray-400 font-mono rounded-t-xl p-2">Preencha suas Informações</h1>
            <p className="p-4 text-balance text-center ">Preencha o formulário a seguir com suas devidas informações para que possamos dar seguimento ao seu processo de adimissão.</p>
        </div>

        <button onClick={firstNavigate} className="bg-slate-400 flex p-3 mt-40 self-center rounded-lg justify-center text-xl font-semibold font-mono">INICIAR</button>

    </>

}