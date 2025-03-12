import { objectInputType } from 'zod';
import { objectOutputType } from 'zod';
import { ZodLiteral } from 'zod';
import { ZodObject } from 'zod';
import { ZodOptional } from 'zod';
import { ZodString } from 'zod';
import { ZodTypeAny } from 'zod';

export declare function runWorker(): Promise<objectOutputType<    {
name: ZodString;
description: ZodOptional<ZodString>;
inputSchema: ZodObject<    {
type: ZodLiteral<"object">;
properties: ZodOptional<ZodObject<    {}, "passthrough", ZodTypeAny, objectOutputType<    {}, ZodTypeAny, "passthrough">, objectInputType<    {}, ZodTypeAny, "passthrough">>>;
}, "passthrough", ZodTypeAny, objectOutputType<    {
type: ZodLiteral<"object">;
properties: ZodOptional<ZodObject<    {}, "passthrough", ZodTypeAny, objectOutputType<    {}, ZodTypeAny, "passthrough">, objectInputType<    {}, ZodTypeAny, "passthrough">>>;
}, ZodTypeAny, "passthrough">, objectInputType<    {
type: ZodLiteral<"object">;
properties: ZodOptional<ZodObject<    {}, "passthrough", ZodTypeAny, objectOutputType<    {}, ZodTypeAny, "passthrough">, objectInputType<    {}, ZodTypeAny, "passthrough">>>;
}, ZodTypeAny, "passthrough">>;
}, ZodTypeAny, "passthrough">[]>;

export { }
