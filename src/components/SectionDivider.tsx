const SectionDivider = ({ dividerText }: { dividerText: string }) => {

    return (
        <div className="flex items-center my-5">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">{dividerText}</span>
            <hr className="flex-grow border-t border-gray-300" />
        </div>
    )
}

export default SectionDivider