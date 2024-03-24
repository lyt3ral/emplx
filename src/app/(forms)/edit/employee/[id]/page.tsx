import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/trpc/server";
import EmployeeForm from "@/components/client/UpdateEmployeeForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function NewEmployee({ params }: Props) {
  const departments = await api.department.list.query();
  const employee = await api.employee.fetchById.query(Number(params.id));

  return (
    <>
      <p className="my-4 text-xl font-semibold">Add New Employee</p>
      <EmployeeForm departments={departments} employee={employee} />
      <div className="my-4 border-t border-black" />
      <Link
        className="flex h-10 w-24 items-center justify-center gap-1 rounded border border-black hover:bg-slate-200"
        href={`/`}
      >
        <ChevronLeftCircle className="h-7 w-7" />
        <p className="font-mono text-xl">Home</p>
      </Link>
    </>
  );
}
