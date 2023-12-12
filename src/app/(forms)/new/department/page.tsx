import DepartmentForm from "@/components/client/DepartmentForm";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export default function NewDepartment() {
  return (
    <>
      <p className="my-4 text-xl font-semibold">Add New Department</p>
      <DepartmentForm />
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
