import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import { List, AutoSizer } from 'react-virtualized';


const FilterableSelect = ({
    options,
    value,
    onChange,
    placeholder = "Selecione..."
}: {
    options: { data?: string; description?: string; extraInformation?: string }[],
    value: string,
    onChange: (value: any) => void,
    placeholder?: string
}) => {
    const [filter, setFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    const filteredOptions = options.filter(option =>
        typeof option.description === 'string' && option.description.toLowerCase().includes(filter.toLowerCase())

    );


    const handleOptionClick = (selectedDescription: string) => {
        const selectedOption = options.find(option => option.description === selectedDescription);

        if (selectedOption) {
            onChange(selectedOption);
            setFilter('');
            setIsOpen(false);
        }
    };


    const rowRenderer = ({ index, key, style }: any) => (
        <div
            key={key}
            style={style}
            className="p-2 hover:bg-[#aeaeb1] cursor-pointer text-left pl-3 bg-[#c7c7ca] border-[#c0c0c5] dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={() => handleOptionClick(filteredOptions[index].description!)}
        >
            {filteredOptions[index].description}
        </div>
    );


    const closeSelect = () => { //logica mais dicifil do mundo meu deus
        if (isOpen) {
            setIsOpen(false)
        }
    }


    return (
        <ClickAwayListener onClickAway={closeSelect}>
            <div className="relative">
                <div
                    className="bg-gray-100 w-11/12 p-1 m-2 border border-slate-500 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className='flex justify-between'>
                        {value || placeholder}
                        <span className="ml-2 font-extrabold text-xs">{isOpen ? '∧' : '∨'}</span>
                    </div>
                </div>
                {isOpen && (
                    <div className="absolute z-10 bg-white border dark:bg-gray-600 dark:border-gray-600 border-gray-500 rounded shadow-lg w-full">
                        <input
                            type="text"
                            className="w-full p-2 border-b border-gray-600 dark:text-white bg-gray-300 dark:bg-gray-800 "
                            placeholder="Digite para filtrar..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <div style={{ height: 200, width: '100%' }}>
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                        width={width}
                                        height={height}
                                        rowCount={filteredOptions.length}
                                        rowHeight={35}
                                        rowRenderer={rowRenderer}
                                    />
                                )}
                            </AutoSizer>
                        </div>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default FilterableSelect;
