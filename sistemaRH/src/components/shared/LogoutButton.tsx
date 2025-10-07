import { useNavigate } from "react-router-dom";

function LogoutButton() {

    const navigate = useNavigate()


    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return(
        <button
        onClick={logout}
        className="w-full px-4 py-3 flex items-center space-x-3 rounded-lg bg-[#34495e] hover:bg-red-700 transition-all duration-300 shadow-sm group"
      >
        <svg
          className="h-5 w-5 text-white group-hover:text-white transition-colors duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H3m7 7l-7-7 7-7" />
        </svg>
        <span className="font-medium text-white">Sair</span>
      </button>
    )

}

export default LogoutButton