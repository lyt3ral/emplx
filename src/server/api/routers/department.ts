import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const department = await ctx.db.department.create({
        data: {
          name: input.name,
        },
      });
      return department;
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const departments = await ctx.db.department.findMany({
      include: {
        Employee: true,
      },
    });
    return departments;
  }),
});
