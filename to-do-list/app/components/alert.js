export default function Alert({ number, taskNumber, clearAll, savedInput }) {
    return (
        <div>
            <hr className="pb-3" />
            <div className="flex justify-between">
                <p className="text-base p-2 text-gray-600">{taskNumber} of {number} tasks completed</p>
                <button className="p-2 text-red-500 text-base rounded-md" onClick={() => clearAll(savedInput.isDone)}>Clear completed</button>
            </div>
        </div >
    )
}