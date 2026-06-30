export default function PrimaryBtn({
    onClick,
    children = "Continue",
}) {
    return (
        <button
            className={`w-full bg-gray-800 py-3 rounded-lg font-medium text-white hover:bg-black transition-colors duration-300`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
