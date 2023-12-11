import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  create: publicProcedure
  .input(
    z.object({
      name: z.string().min(1),
      location: z.string().min(1),
    })
  )
  .mutation(async ({ctx, input}) =>
  {
    const department = await ctx.db.department.create({
      data: {
        name: input.name,
      }
    })
    return department;
  })

})