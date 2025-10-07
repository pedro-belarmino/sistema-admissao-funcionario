import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import { List, AutoSizer } from 'react-virtualized';

const FilterableSelect = ({
    options,
    value,
    onChange,
    placeholder = "Selecione..."
}: any) => {
    const [filter, setFilter] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    if (!options || options.length === 0) return null;

    const columns = Object.keys(options[0]);

    const filteredOptions = options.filter((option: { [x: string]: { toString: () => string; }; }) =>
        columns.some(key =>
            option[key]?.toString().toLowerCase().includes(filter.toLowerCase())
        )
    );

    const handleOptionClick = (option: any) => {
        onChange(option);
        setIsOpen(false);
        setFilter('');
    };

    const rowRenderer = ({ index, key, style }: any) => (
        <div
            key={key}
            style={style}
            className="flex border-b border-gray-400 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => handleOptionClick(filteredOptions[index])}
        >
            {columns.map((col) => (
                <div key={col} className="flex-1 px-2">
                    {filteredOptions[index][col]}
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div className="relative">
                <div
                    className="inputHiringForm cursor-pointer justify-between"
                    onClick={() => setIsOpen(true)}
                >
                    {value
                        ? (typeof value === 'object'
                            ? columns.map(col => value[col]).join(' - ')
                            : value)
                        : placeholder}
                    <span className="ml-2 font-extrabold text-xs">∨</span>
                </div>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="lg" fullWidth>
                <DialogContent>
                    <input
                        type="text"
                        className="w-full p-2 border-b border-gray-600 dark:text-white bg-gray-300 dark:bg-gray-800"
                        placeholder="Digite para filtrar..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div className='text-sm' style={{ height: 400, width: '100%' }}>
                        <AutoSizer>
                            {({ height, width }) => (
                                <div style={{ width }}>
                                    {/* <div className="flex bg-gray-200 dark:bg-gray-700 font-bold p-2 border-b border-gray-400">
                                        {columns.map((col) => (
                                            <div key={col} className="flex-1 px-2">{col}</div>
                                        ))}
                                    </div> */}
                                    <List
                                        width={width}
                                        height={height - 40}
                                        rowCount={filteredOptions.length}
                                        rowHeight={35}
                                        rowRenderer={rowRenderer}
                                    />
                                </div>
                            )}
                        </AutoSizer>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FilterableSelect;
