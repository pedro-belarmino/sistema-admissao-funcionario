export default function NotFound() {
    return (
        <div className="grid place-content-center">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
                PÁGINA NÃO ENCONTRADA
                </h1>
            <div className="flex justify-center">
                <svg className="h-64 w-64 text-gray-900"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="8" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="8" y2="12" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="
                  text-white
                  bg-blue-700
                  hover:bg-blue-800
                    focus:outline-none 
                    focus:ring-4
                  focus:ring-blue-300 
                    font-medium 
                    rounded-full 
                    text-sm px-5
                    py-2.5 
                    text-center
                    me-2 mb-2
                  dark:bg-blue-600
                  dark:hover:bg-blue-700
                  dark:focus:ring-blue-800
                  "
                    onClick={() => window.history.back()}
                >
                    Voltar
                </button>


            </div>
        </div>
    )
}