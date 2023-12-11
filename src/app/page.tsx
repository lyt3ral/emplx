import Link from "next/link";
import { api } from "@/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen justify-center p-8">
      <div className="flex h-full justify-center gap-4 font-mono">
        <Link href={`/employee`}>employees</Link>
        <p className=" text-3xl font-bold ">Emplx</p>
        <Link href={`/department`}>departments</Link>
      </div>
      <section id="form"></section>
    </main>
  );
}
