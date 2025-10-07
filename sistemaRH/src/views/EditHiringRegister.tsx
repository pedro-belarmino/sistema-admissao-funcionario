import EditHiringRegister from "../components/pages/EditHiringRegister/EditHiringRegister";
import SelectOperationalBase from "../components/shared/SelectOperationalBase";


export default function EditiHiringRegister() {
    return <>
        <div className="flex justify-between p-3">
            <p className="text-2xl dark:text-white font-bold flex p-5">Processos Pendentes</p>
            <SelectOperationalBase />
        </div>
        <EditHiringRegister />
    </>
}