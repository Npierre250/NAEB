import { z } from "zod";
export const applicationSchema = z.object({
  tinNumber: z.string().min(1, {
    message: "Please provide a valid TIN number.",
  }),
  farmLocation: z.string().min(1, {
    message: "Please enter a valid location for the farm.",
  }),
  farmLength: z.string().min(1, {
    message: "Please specify a valid length for the farm.",
  }),
  productionSeason: z.string().min(1, {
    message: "Please enter a valid production season.",
  }),
  desiredProducts: z.string().min(1, {
    message: "Please specify a valid product.",
  }),
  idNumber: z
    .string()
    .min(16, {
      message: "The ID number should be exactly 16 characters long.",
    })
    .max(16, {
      message: "The ID number should be exactly 16 characters long.",
    }),
  name: z.string().min(3, {
    message: "Please enter a valid name.",
  }),
  phoneNumber: z
    .string()
    .regex(/^\+?(25)?0(\s)?-?7(\d){2}(\s|-)?(\d){3}(\s|-)?(\d){3}$/g, {
      message:
        "Please enter a valid phone number in the format +250 7XX XXX XXX.",
    }),
    email:z.string()
});
