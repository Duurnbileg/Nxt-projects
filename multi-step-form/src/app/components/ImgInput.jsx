export default function ImgInput({ onChange, error }) {
    return (
        <div className="flex flex-col gap-2">
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className={`text-black file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-white ${error ? "border border-red-500" : "border border-transparent"}`}
            />
            {error && (
                <p className="text-red-500 text-sm border-red-200 pl-2">{error}</p>
            )}
        </div>
    )
}
