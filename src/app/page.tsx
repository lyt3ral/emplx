import Link from "next/link";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

export default async function Home() {
  return (
    <>
      <section className="my-4 flex flex-col gap-2">
        <div className="my-2 flex w-full flex-col items-center gap-2">
          <Image
            src={`/employee.png`}
            height={256}
            width={256}
            alt="employee"
          />
          <p className="text-bold text-lg italic">
            A platform for adding and monitoring employee data ✨
          </p>
        </div>
        <div className="my-1 border-t border-black" />
        <p className="text-xl font-semibold">Functions: Add Data</p>
        <div className="my-2 flex flex-col gap-4 md:flex-row">
          <NewModelCard
            name="Department"
            href="/new/department"
            img="/department.png"
          />
          <NewModelCard
            name="Employee"
            href="/new/employee"
            img="/employee.png"
          />
        </div>
      </section>
    </>
  );
}

function NewModelCard({
  name,
  href,
  img,
}: {
  name: string;
  href: string;
  img?: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-2"
    >
      <div className="h-40 w-60 rounded border border-black p-2 hover:bg-slate-300">
        <div className="mb-2 flex gap-1">
          <p className="ml-2 font-mono text-xl hover:underline">Add {name}</p>
          <PlusCircle />
        </div>
        {img ? <Image src={img} height={100} width={100} alt={name} /> : null}
      </div>
    </Link>
  );
}
