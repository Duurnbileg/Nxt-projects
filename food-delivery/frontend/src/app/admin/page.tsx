"use client"
import { AdminOrderTable } from "./feature/adminOrderTable"
import { AdminSidebar } from "./feature/adminSidebar"

export default function Login() {

    return (
        <main className="w-full max-w-380 h-full flex gap-10 items-start justify-center bg-accent">
            <AdminSidebar />
            <section className="w-full flex flex-col mr-10 mt-4">
                <div className="w-full flex justify-end">
                    <div className="w-10 h-10 bg-red-400 rounded-full"></div>
                </div>
                <div className="w-full bg-white rounded-md mt-4 mr-20">
                    <AdminOrderTable />
                </div>
            </section>
        </main>
    )
}