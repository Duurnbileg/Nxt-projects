export default function List({ savedInput, toggleTask, deleteTask }) {
    return (
        <div className="p-2 flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <input
                    type="checkbox"
                    className="h-4 w-4"
                    onChange={() => toggleTask(savedInput.id)}
                    checked={savedInput.isDone}
                />
                {savedInput.isDone !== true
                    ? <label className="text-black text-base">{savedInput.text}</label>
                    : <label className="text-black text-base line-through">{savedInput.text}</label>}

            </div>
            <button className="px-4 py-2 bg-red-200 text-red-500 rounded-md" onClick={() => deleteTask(savedInput.id)}>Delete</button>
        </div>
    )
}