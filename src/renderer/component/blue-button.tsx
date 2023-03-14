/* eslint-disable @typescript-eslint/no-explicit-any */
const BlueButton = (props: any) => {
    const classNamesArr: Array<string> = [
        'text-white',
        'bg-blue-700',
        'hover:bg-blue-800',
        'focus:ring-4',
        'focus:outline-none',
        'focus:ring-blue-300',
        'font-medium',
        'rounded-lg',
        'px-4',
        'py-2',
        'text-center',
        'dark:bg-blue-600',
        'dark:hover:bg-blue-700',
        'dark:focus:ring-blue-800',
    ];

    const classNames: string = classNamesArr.join(' ');
    const { onClick, children } = props;

    return (
        <button type="button" className={classNames} onClick={onClick}>
            {children}
        </button>
    );
};

export default BlueButton;
