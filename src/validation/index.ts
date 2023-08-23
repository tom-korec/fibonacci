import { z } from "zod";

export const fibonacciInputNumberSchema = z
  .number()
  .gte(0, "Input number must be greater or equal than 0")
  .int("Input number must be an integer")
