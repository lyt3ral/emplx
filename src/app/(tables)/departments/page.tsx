import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/server";

export default async function DepartmentsView() {
  const departments = await api.department.list.query();
  console.log(departments);
  return (
    <div>
      <p className="my-6 text-xl">Departments Table:</p>
      <Table className="font-mono border border-black">
        <TableHeader>
          <TableRow >
            <TableHead className=" text-black text-lg">ID</TableHead>
            <TableHead className=" text-black text-lg">Name</TableHead>
            <TableHead className=" text-black text-lg">Employee Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department) => {
            return (
              <TableRow>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.Employee.length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
