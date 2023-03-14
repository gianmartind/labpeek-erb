/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PCDetails } from 'renderer/static/pc-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PingResult } from 'main/main';
import ListItem from './list-item';

interface PCListProps {
    labName: string;
    pcList: PCDetails[];
    state: boolean;
    syncChecked: any;
}

const PCList = (props: PCListProps) => {
    const { labName, pcList, state, syncChecked } = props;

    const [pinging, setPinging] = useState(false);

    const alive = useRef(new Map<string, number>());
    const [numAlive, setNumAlive] = useState(0);

    const selected = useRef(new Map<string, boolean>());
    const [numSelected, setNumSelected] = useState(0);

    const setAlive = (addr: string) => {
        alive.current.set(addr, 1);
        setNumAlive(alive.current.size);
    };

    const unsetAlive = (addr: string) => {
        alive.current.delete(addr);
        setNumAlive(alive.current.size);
    };

    const addSelected = (addr: string) => {
        selected.current.set(addr, true);
        syncChecked(selected.current);
        setNumSelected(selected.current.size);
    };

    const removeSelected = (addr: string) => {
        selected.current.delete(addr);
        syncChecked(selected.current);
        setNumSelected(selected.current.size);
    };

    const pingAll = useCallback(() => {
        if (!pinging) {
            setPinging(true);
            const pcAddresses = pcList.map((pc) => {
                return pc.address;
            });
            window.electron.ipcRenderer.sendMessage('ping', [
                labName,
                pcAddresses,
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labName, pcList]);

    useEffect(() => {
        window.electron.ipcRenderer.on('ping', (reply: any) => {
            if (reply.labName === labName) {
                setPinging(false);
                const result = reply.results;
                result.forEach((res: PingResult) => {
                    if (res.isAlive) {
                        setAlive(res.addr);
                    } else {
                        unsetAlive(res.addr);
                    }
                });
            }
        });
    }, [labName]);

    useEffect(() => {
        pingAll();
    }, [state, pingAll]);

    const allSelected = useMemo(() => {
        if (selected.current.size === pcList.length) {
            return true;
        }
        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pcList, numSelected]);

    const checkAll = () => {
        if (!allSelected) {
            pcList.forEach((item) => {
                if (!selected.current.has(item.address)) {
                    addSelected(item.address);
                }
            });
        } else {
            selected.current = new Map<string, boolean>();
            syncChecked(selected.current);
            setNumSelected(selected.current.size);
        }
    };

    const labPcList = useMemo(() => {
        return pcList.map((val, idx) => {
            return (
                <ListItem
                    key={`item-${val.address}`}
                    name={val.name}
                    addr={val.address}
                    status={alive.current.has(val.address)}
                    checked={selected.current.has(val.address)}
                    addCheck={addSelected}
                    removeCheck={removeSelected}
                />
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numAlive, numSelected, pinging]);

    return (
        <div className="flex flex-col grow">
            <div className="flex flex-row p-2">
                <p className="flex grow font-semibold select-none">
                    {labName} -{' '}
                    {numSelected < 10 ? `0${numSelected}` : numSelected}
                </p>
                <div
                    className="flex flex-row align-center"
                    onClick={checkAll}
                    role="presentation"
                >
                    <label htmlFor="selectAll" className="px-2 select-none">
                        Select all
                    </label>
                    <input
                        name="selectAll"
                        type="checkbox"
                        checked={allSelected}
                        className="form-check-input"
                        onChange={() => {}}
                    />
                </div>
            </div>
            <div className="flex flex-row p-2">
                <p className="flex grow font-semibold select-none">
                    {numAlive < 10 ? `0${numAlive}` : numAlive} PC(s) alive
                </p>
                <div className="flex flex-row align-center">
                    <button
                        type="button"
                        onClick={pingAll}
                        className="rounded hover:bg-gray-100 active:ring px-2"
                    >
                        <FontAwesomeIcon
                            className={pinging ? 'animate-spin' : ''}
                            icon={['fas', 'rotate-right']}
                            size="1x"
                        />
                    </button>
                </div>
            </div>
            <div
                className="overflow-y-auto rounded-lg border-2 border-dotted hover:border-solid"
                style={{ maxHeight: '75vh' }}
            >
                {labPcList}
            </div>
        </div>
    );
};

export default PCList;
