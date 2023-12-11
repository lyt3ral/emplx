import Link from "next/link";
import { api } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  const employees = await api.employee.getEmployees.query();

  console.log(employees);

  return (
    <main className="flex min-h-screen justify-center bg-neutral-300 p-1 md:p-8">
      <div className="container mx-auto rounded border border-black bg-white">
        <Header />
        <section className="my-4 flex justify-center">
          <p>Welcome To Emplx 🎉</p>
        </section>
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="flex w-full flex-col items-center justify-evenly gap-1 border-b border-neutral-500 py-4 font-mono md:flex-row md:items-baseline">
      {/* <section className="flex items-baseline justify-between gap-2"> */}
      <h1 className="text-3xl font-bold ">Emplx 📝</h1>
      {/* <Image src={`/employee.png`} width={25} height={25} alt="logo"></Image> */}
      {/* </section> */}
      <section className="flex gap-4 ">
        <Link href={`/employee`} className="hover:underline">
          employees
        </Link>
        <Link href={`/department`} className="hover:underline">
          departments
        </Link>
      </section>
    </div>
  );
}
