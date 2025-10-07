export default function FatalError() {
    return (
        <div className="m-10 bg-red-200 text-red-800 shadow-xl border border-red-300 font-semibold text-lg w-6/12 place-self-center p-5 rounded-xl">
            <p className="">Tivemos um erro que o impede de seguir o fluxo. Contate o suporte.</p>
            <svg className="h-6 w-6 text-red-800 place-self-center"
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