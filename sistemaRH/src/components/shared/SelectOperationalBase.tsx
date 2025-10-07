import { useEffect, useState } from "react";
import { baseUrl } from "../../../shareUrl";
import axios from "axios";

interface BaseOptionsType {
    name: string;
    operationalBaseId: string;
    companyId: string;
}

const URL_LIST = `${baseUrl}opbase/list?userId=${localStorage.getItem("userId")}`;

export default function SelectOperationalBase() {
    const [operationalBase, setOperationalBase] = useState<string>("");
    const [operationalBaseOptions, setOperationalBaseOptions] = useState<BaseOptionsType[]>([]);
    const [erro, setError] = useState(false);

    const getBases = async () => {
        try {
            const response = await axios.get(URL_LIST, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const responseData = response.data.data;
            setOperationalBaseOptions(responseData);
            setError(false);
        } catch {
            setError(true);
            setOperationalBase("-1");
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as string;
        setOperationalBase(selectedValue);
        localStorage.setItem("operationalBase", selectedValue);

        const selectedBase = operationalBaseOptions.find(
            (base: any) => base.operationalBaseId === selectedValue
        );
        if (selectedBase) {
            localStorage.setItem('branchCode', selectedBase.companyId);
        }

        location.reload()
    };

    useEffect(() => {
        getBases();
        setOperationalBase(localStorage.getItem("operationalBase") || "-1");
    }, []);

    if (erro) {
        return (
            <div className="w-60 bg-red-100 p-2 rounded-xl text-red-900">
                <p>Tivemos um erro ao buscar suas bases operacionais.</p>
            </div>
        );
    }

    return (
        <div className="p-2 bg-gray-300 rounded-xl">
            <p className="text-left font-semibold">
                Selecione uma Base Operacional:
            </p>
            <div>
                <select
                    value={operationalBase}
                    onChange={handleSelectChange}
                    className="rounded-xl p-1"
                >
                    <option value="-1">Todas as Bases</option>
                    {operationalBaseOptions.map((base) => (
                        <option key={base.operationalBaseId} value={base.operationalBaseId}>
                            {base.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
