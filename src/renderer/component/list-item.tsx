/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface ListItemDetails {
    name: string;
    addr: string;
    status: boolean;
    checked: boolean;
    addCheck: any;
    removeCheck: any;
}

const ListItem = (props: ListItemDetails) => {
    const { name, addr, status, checked, addCheck, removeCheck } = props;

    const clickHandler = () => {
        if (!checked) {
            addCheck(addr);
        } else {
            removeCheck(addr);
        }
    };

    const [nameDisplay, setNameDisplay] = useState(name);

    return (
        <div className="flex flex-row border-b-2">
            <div className="flex flex-row grow p-2 hover:bg-gray-100 hover:shadow-sm hover:cursor-default">
                <div
                    className="grow"
                    onMouseEnter={() => setNameDisplay(addr)}
                    onMouseLeave={() => setNameDisplay(name)}
                >
                    {nameDisplay}
                </div>
                <div
                    className={
                        status
                            ? ' select-none text-green-600'
                            : ' select-none text-red-600'
                    }
                >
                    {status ? 'ON' : 'OFF'}
                </div>
            </div>
            <div
                className="flex p-3 hover:bg-gray-100 hover:shadow-sm hover:cursor-default"
                role="presentation"
                onClick={clickHandler}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    className="form-check-input"
                    onChange={clickHandler}
                />
            </div>
        </div>
    );
};

export default ListItem;
