import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { AddressPayload } from "@/types/api";

const schema = z.object({
  label: z.string().min(2),
  fullName: z.string().min(2),
  phone: z.string().min(8),
  line1: z.string().min(4),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  isDefault: z.boolean(),
});

type Values = z.infer<typeof schema>;

interface AddressFormProps {
  defaultValues?: Partial<AddressPayload>;
  onSubmit: (values: AddressPayload) => void;
  isSubmitting?: boolean;
}

export function AddressForm({ defaultValues, onSubmit, isSubmitting }: AddressFormProps) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: "Home",
      fullName: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Pakistan",
      isDefault: false,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["label", "Label"],
            ["fullName", "Full name"],
            ["phone", "Phone"],
            ["line1", "Address line 1"],
            ["line2", "Address line 2"],
            ["city", "City"],
            ["state", "State"],
            ["postalCode", "Postal code"],
            ["country", "Country"],
          ] as const
        ).map(([name, label]) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={name === "line1" || name === "line2" ? "sm:col-span-2" : undefined}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="isDefault"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 sm:col-span-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} />
              </FormControl>
              <FormLabel>Set as default address</FormLabel>
            </FormItem>
          )}
        />
        <div className="sm:col-span-2">
          <Button type="submit" disabled={isSubmitting}>
            Save address
          </Button>
        </div>
      </form>
    </Form>
  );
}
