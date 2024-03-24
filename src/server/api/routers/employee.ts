import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10).max(10),
        salary: z.number().min(0),
        hireDate: z.date(),
        jobTitle: z.string().min(1),
        departmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const employee = await ctx.db.employee.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          email: input.email,
          salary: input.salary,
          hireDate: input.hireDate,
          jobTitle: input.jobTitle,
          Department: {
            connect: {
              id: Number(input.departmentId),
            },
          },
        },
      });
      return employee;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10).max(10),
        salary: z.number().min(0),
        hireDate: z.date(),
        jobTitle: z.string().min(1),
        departmentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const employee = await ctx.db.employee.update({
        where: {
          id: input.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          email: input.email,
          salary: input.salary,
          hireDate: input.hireDate,
          jobTitle: input.jobTitle,
          Department: {
            connect: {
              id: Number(input.departmentId),
            },
          },
        },
      });
      return employee;
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const employees = await ctx.db.employee.findMany({
      include: {
        Department: true,
      },
    });
    return employees;
  }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const employee = await ctx.db.employee.delete({
      where: {
        id: input,
      },
    });
    return !!employee;
  }),

  fetchById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const employee = await ctx.db.employee.findUnique({
      where: {
        id: input,
      },
      include: {
        Department: true,
      },
    });
    return employee;
  }),
});
