/* eslint-disable @typescript-eslint/no-explicit-any */
import PC_LIST from 'renderer/static/pc-list';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PCList from 'renderer/component/pc-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlueButton from 'renderer/component/blue-button';
import DefaultButton from '../component/default-button';

function Main() {
    const [state, setState] = useState(true);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);

    const killed = useRef(0);

    const lab1Checked = useRef(new Map<string, boolean>());
    const lab2Checked = useRef(new Map<string, boolean>());
    const lab3Checked = useRef(new Map<string, boolean>());
    const lab4Checked = useRef(new Map<string, boolean>());

    const [totalChecked, setTotalChecked] = useState(0);

    const sumTotal = () => {
        setTotalChecked(
            lab1Checked.current.size +
                lab2Checked.current.size +
                lab3Checked.current.size +
                lab4Checked.current.size
        );
    };

    const refreshAll = useCallback(() => {
        setState(!state);
    }, [state]);

    const killSelected = () => {
        if (totalChecked > 0) {
            setSending(true);
            setLoading(true);
            const lab1 = Array.from(lab1Checked.current.keys());
            const lab2 = Array.from(lab2Checked.current.keys());
            const lab3 = Array.from(lab3Checked.current.keys());
            const lab4 = Array.from(lab4Checked.current.keys());
            const allLab = lab1.concat(lab2, lab3, lab4);
            window.electron.ipcRenderer.sendMessage('kill', allLab);
        }
    };

    useEffect(() => {
        window.electron.ipcRenderer.on('kill', (reply: any) => {
            killed.current = reply;
            setLoading(false);
        });
    }, []);

    const syncLab1 = (checked: Map<string, boolean>) => {
        lab1Checked.current = checked;
        sumTotal();
    };

    const syncLab2 = (checked: Map<string, boolean>) => {
        lab2Checked.current = checked;
        sumTotal();
    };

    const syncLab3 = (checked: Map<string, boolean>) => {
        lab3Checked.current = checked;
        sumTotal();
    };

    const syncLab4 = (checked: Map<string, boolean>) => {
        lab4Checked.current = checked;
        sumTotal();
    };

    const modalContent = useMemo(() => {
        if (loading === true) {
            return (
                <div className="px-12">
                    <FontAwesomeIcon
                        icon={['fas', 'spinner']}
                        size="3x"
                        className="animate-spin"
                    />
                </div>
            );
        }
        return (
            <p className="text-lg">{`shutdown command sent to ${killed.current} PC(s)`}</p>
        );
    }, [loading]);

    const closeModal = useCallback(() => {
        setSending(false);
        refreshAll();
    }, [refreshAll]);

    return (
        <div>
            <div
                id="staticModal"
                data-modal-backdrop="static"
                tab-index="-1"
                aria-hidden={sending ? 'false' : 'true'}
                className={`absolute left-0 right-0 top-0 z-50 p-4 overflow-x-hidden overflow-y-auto h-modal md:h-full content-center ${
                    sending ? '' : 'hidden'
                }`}
            >
                <div
                    className="absolute md:h-auto"
                    style={{
                        left: '35%',
                        top: '40%',
                    }}
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-6 space-y-6 text-center">
                            {modalContent}
                        </div>
                        <div className="items-center p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            {loading ? (
                                ''
                            ) : (
                                <BlueButton
                                    className="hidden"
                                    onClick={closeModal}
                                >
                                    OK
                                </BlueButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`flex flex-col h-screen ${sending ? 'blur-sm' : ''}`}
            >
                <div className="flex flex-row grow gap-3 px-2">
                    <PCList
                        pcList={PC_LIST.LAB1}
                        labName="LAB01"
                        state={state}
                        syncChecked={syncLab1}
                    />
                    <PCList
                        pcList={PC_LIST.LAB2}
                        labName="LAB02"
                        state={state}
                        syncChecked={syncLab2}
                    />
                    <PCList
                        pcList={PC_LIST.LAB3}
                        labName="LAB03"
                        state={state}
                        syncChecked={syncLab3}
                    />
                    <PCList
                        pcList={PC_LIST.LAB4}
                        labName="LAB04"
                        state={state}
                        syncChecked={syncLab4}
                    />
                </div>
                <div className="p-4 flex justify-end">
                    <DefaultButton onClick={refreshAll}>
                        <FontAwesomeIcon
                            icon={['fas', 'rotate-right']}
                            size="1x"
                        />
                    </DefaultButton>
                    <BlueButton
                        onClick={killSelected}
                        disabled
                    >{`Kill Selected (${totalChecked})`}</BlueButton>
                </div>
            </div>
        </div>
    );
}

export default Main;
