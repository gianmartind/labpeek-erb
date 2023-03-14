/* eslint-disable @typescript-eslint/no-explicit-any */
const DefaultButton = (props: any) => {
    const classNamesArr: Array<string> = [
        'bg-white',
        'hover:bg-gray-100',
        'active:ring',
        'text-gray-800',
        'font-semibold',
        'py-2',
        'px-4',
        'border',
        'border-gray-100',
        'rounded',
        'shadow',
    ];

    const classNames: string = classNamesArr.join(' ');
    const { onClick, children } = props;

    return (
        <button type="button" className={classNames} onClick={onClick}>
            {children}
        </button>
    );
};

export default DefaultButton;
