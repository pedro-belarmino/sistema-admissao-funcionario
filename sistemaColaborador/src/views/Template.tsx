import { Outlet } from "react-router-dom";

const Template: React.FC = () => {


  return (
    <div
      className='flex flex-col w-full w-max-96 h-full'
    >
      <Outlet />
    </div>
  );
};

export default Template;
