import { AdminSidebar } from "./_components/adminSidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen w-full max-w-380 flex justify-center bg-accent">
            <aside className="sticky top-1 h-screen">
                <AdminSidebar />
            </aside>
            <section className="flex-1 min-w-0 p-4">
                {children}
            </section>
        </main>
    )
}