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
  const employees = await api.employee.list.query();
  console.log(employees);
  return (
    <div>
      <p className="my-6 text-xl">Employees Table:</p>
      <Table className="font-mono border border-black">
        <TableHeader>
          <TableRow >
            <TableHead className=" text-black text-lg [w-50]">ID</TableHead>
            <TableHead className=" text-black text-lg">Name</TableHead>
            <TableHead className=" text-black text-lg">Phone</TableHead>
            <TableHead className=" text-black text-lg">Email</TableHead>
            <TableHead className=" text-black text-lg">Salary</TableHead>
            <TableHead className=" text-black text-lg">HireDate</TableHead>
            <TableHead className=" text-black text-lg">Job Title</TableHead>
            <TableHead className=" text-black text-lg">Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => {
            return (
              <TableRow>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.firstName + " " + employee.lastName}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.hireDate.toLocaleDateString()}</TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>{employee.Department.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
