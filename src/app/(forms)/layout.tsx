import { api } from "@/trpc/server";
import Header from "@/components/client/Header";

export default async function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const employees = await api.employee.getEmployees.query();

  console.log(employees);

  return (
    <main className="flex min-h-screen justify-center bg-slate-300 p-1 md:p-8">
      <div className="container mx-auto rounded border border-black bg-white">
        <Header />
        <section className="my-4 flex justify-center">
          {children}
        </section>
      </div>
    </main>
  );
}