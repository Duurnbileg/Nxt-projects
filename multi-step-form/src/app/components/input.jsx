export default function Input({
    inputType = "text",
    placeholder,
    value,
    onChange,
    error,
}) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-black text-sm font-semibold">
                {placeholder}
                <span className="text-red-500">*</span>
            </p>
            <input
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border rounded-md px-3 py-2 text-black font-medium outline-none focus:border-black ${error ? "border-red-500" : "border-gray-300"}`}
            />

            {error && (
                <p className="text-red-500 text-sm border-red-200 pl-2">{error}</p>
            )}
        </div>
    );
}
