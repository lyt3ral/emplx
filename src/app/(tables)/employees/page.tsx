// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { api } from "@/trpc/server";

// export default async function DepartmentsView() {
//   const employees = await api.employee.list.query();
//   console.log(employees);
//   return (
//     <div>
//       <p className="my-6 text-xl">Employees Table:</p>
//       <Table className="font-mono border border-black">
//         <TableHeader>
//           <TableRow >
//             <TableHead className=" text-black text-lg [w-50]">ID</TableHead>
//             <TableHead className=" text-black text-lg">Name</TableHead>
//             <TableHead className=" text-black text-lg">Phone</TableHead>
//             <TableHead className=" text-black text-lg">Email</TableHead>
//             <TableHead className=" text-black text-lg">Salary</TableHead>
//             <TableHead className=" text-black text-lg">HireDate</TableHead>
//             <TableHead className=" text-black text-lg">Job Title</TableHead>
//             <TableHead className=" text-black text-lg">Department</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {employees.map((employee) => {
//             return (
//               <TableRow>
//                 <TableCell>{employee.id}</TableCell>
//                 <TableCell>{employee.firstName + " " + employee.lastName}</TableCell>
//                 <TableCell>{employee.phone}</TableCell>
//                 <TableCell>{employee.email}</TableCell>
//                 <TableCell>{employee.salary}</TableCell>
//                 <TableCell>{employee.hireDate.toLocaleDateString()}</TableCell>
//                 <TableCell>{employee.jobTitle}</TableCell>
//                 <TableCell>{employee.Department.name}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
// import { writeFile, type WorkBook, utils } from "xlsx";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  // SlidersHorizontal,
  Trash2,
  // MoreHorizontal

  // Download,
} from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";

import { ChevronLeftCircle } from "lucide-react";
import toast from "react-hot-toast";
import { MoreVertical } from "lucide-react";
import { Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  data: RouterOutputs["employee"]["list"];
  pageCount?: number;
}
const BookTable = () => {
  // const pathname = usePathname();

  const [isPending, startTransition] = React.useTransition();

  const getEmployees = api.employee.list.useQuery();
  const deleteEmployee = api.employee.delete.useMutation();

  const columns: ColumnDef<RouterOutputs["employee"]["list"][number]>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      enableSorting: true,
      // id: "select",
      // header: ({ table }) => (
      //   <Checkbox
      //     checked={
      //       table.getIsAllPageRowsSelected() ||
      //       (table.getIsSomePageRowsSelected() && "indeterminate")
      //     }
      //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      //     aria-label="Select all"
      //   />
      // ),
      // cell: ({ row }) => (
      //   <Checkbox
      //     checked={row.getIsSelected()}
      //     onCheckedChange={(value) => row.toggleSelected(!!value)}
      //     aria-label="Select row"
      //   />
      // ),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "salary",
      header: "Salary",
    },
    {
      accessorKey: "hireDate",
      header: "Hire Date",
      cell: ({ cell }) => {
        const date = cell.getValue() as Date;
        const formatted = new Intl.DateTimeFormat("en-IN")
          .format(date)
          .replace(/\//g, "-");
        return <span>{formatted}</span>;
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "jobTitle",
      header: "Job Title",
    },
    {
      accessorKey: "Department.name",
      header: "Department",
    },
    // {
    //   accessorKey: "isSelected",
    //   id: "selected",
    //   header: "Is Selected",
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.original.isSelected}
    //       onCheckedChange={() => {
    //         startTransition(() => {
    //           try {
    //             async () => {
    //               await updateSelected.mutateAsync({
    //                 id: row.original.id,
    //                 selected: !row.original.isSelected,
    //               });

    //               router.refresh();
    //             };
    //           } catch (error) {
    //             error instanceof Error
    //               ? toast.error(error.message)
    //               : toast.error("Something went wrong");
    //           }
    //         });
    //       }}
    //       // aria-label="Select row"
    //       // className="flex items-center justify-center"
    //     />
    //   ),
    //   // enableSorting: false,
    //   // enableHiding: false,
    // },
    {
      accessorKey: "publishedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="-m-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ cell }) => {
        const date = cell.getValue() as Date;
        const formatted = new Intl.DateTimeFormat("en-IN")
          .format(date)
          .replace(/\//g, "-");
        return <span>{formatted}</span>;
      },

      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      // Column for row actions
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuItem asChild>
                <Link
                  href={`/edit/employee/${row.original.id}`}
                  target="_blank"
                >
                  <Edit
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:bg-red-500"
                onClick={() => {
                  startTransition(async () => {
                    try {
                      await deleteEmployee.mutateAsync(row.original.id);
                      await getEmployees.refetch();
                    } catch (error) {
                      error instanceof Error
                        ? toast.error(error.message)
                        : toast.error("Something went wrong");
                    }
                    table.resetRowSelection();
                  });
                }}
              >
                <Trash2
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data =
    React.useMemo(() => getEmployees.data, [getEmployees.data]) ?? [];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [searchRow, setSearchRow] = React.useState<string>(
    table.getAllColumns()[1]?.id ?? "",
  );

  return (
    <div className="my-4 w-full font-mono dark:text-white">
      <div className="flex items-center justify-between pb-6">
        <div className="flex gap-x-2  ">
          <Input
            placeholder="Filter records..."
            value={
              (table.getColumn(searchRow)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchRow)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={buttonVariants({ variant: "outline" })}>
                <span className="capitalize">{searchRow}</span>{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanFilter())
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() => setSearchRow(column.id)}
                    >
                      {column.id}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="whitespace-nowrap rounded-md border-2 border-transparent bg-primary px-6 font-bold text-white transition duration-200 hover:border-primary hover:bg-white hover:text-black">
            <Link href="/new/employee" target="_blank">
              Add Employee
            </Link>
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          {!(table.getFilteredSelectedRowModel().rows.length === 0) && (
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              size="sm"
              onClick={() => {
                startTransition(async () => {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    table
                      .getSelectedRowModel()
                      .rows.map(
                        async (row) =>
                          await deleteEmployee.mutateAsync(row.original.id),
                      );
                    await getEmployees.refetch();
                  } catch (error) {
                    error instanceof Error
                      ? toast.error(error.message)
                      : toast.error("Something went wrong");
                  }
                  table.resetRowSelection();
                });
              }}
              disabled={!table.getSelectedRowModel().rows.length || isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" aria-hidden />
              Delete ({table.getSelectedRowModel().rows.length})
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  // className="ml-2"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="mt-4 flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {String(pageSize)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="my-4 border-t border-black" />
      <Link
        className="flex h-10 w-24 items-center justify-center gap-1 rounded border border-black hover:bg-slate-200"
        href={`/`}
      >
        <ChevronLeftCircle className="h-7 w-7" />
        <p className="font-mono text-xl">Home</p>
      </Link>
    </div>
  );
};

export default BookTable;
