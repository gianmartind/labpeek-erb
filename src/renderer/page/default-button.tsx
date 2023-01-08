function DefaultButton(props: any) {
    const _classNames: Array<string> = [
        'bg-white', 
        'hover:bg-gray-100', 
        'text-gray-800', 
        'font-semibold', 
        'py-2', 
        'px-4', 
        'border', 
        'border-gray-100', 
        'rounded', 
        'shadow'
    ]

    const classNames: string = _classNames.join(' ')

    return (
        <button className={classNames} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default DefaultButton;