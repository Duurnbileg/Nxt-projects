export default function SecondBtn({
    onClick,
}) {
    return (
        <button
            className={`w-full bg-white py-3 rounded-lg font-medium border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors duration-300`}
            onClick={onClick}
        >
            Back
        </button>
    )
}
