import React, { FC } from 'react';
import '../../index.css'

interface BackgroundProps {
    children: React.ReactNode;
    className?: string;
}

const Background: FC<BackgroundProps> = ({ children }) => {
    return (
        <div className='grid justify-items-center'>
            {children}
        </div>
    )
}

export default Background;