import { useNavigate } from "react-router-dom";
import Background from "../components/shared/Background";


export default function AccessDenied() {

    const navigate = useNavigate()


    function loginAccess() {
        navigate('/login')
    }

    return (
        <div className="w-48 justify-self-center shadow-xl m-8 p-8 bg-slate-300 rounded-xl dark:bg-slate-500">
            <Background >
                <h2 className="justify-self-center m-2 text-center font-bold">ACESSO NEGADO</h2>
                <svg
                    className="h-12 w-12 text-slate-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>

                <br />
                <button onClick={loginAccess} className="bg-[#3E5875] hover:bg-[#2a3b4e] rounded-xl p-2 text-white">ACESSAR LOGIN</button>
            </Background>
        </div>
    )
}