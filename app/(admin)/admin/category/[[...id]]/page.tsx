"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectComp } from "@/lib/interface";
import Select from "react-select";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import { useEffect, useState } from "react";
import toastNotify from "@/components/commonJs/toastNotify";
import rtkErrorRead from "@/components/commonJs/rtkErrorRead";

const validationSchema: any = Yup.object({
  optionName: Yup.string()
    .required("Option name is required")
    .min(3, "Must be at least 3 characters"),

  isDependent: Yup.boolean().required(),

  dependentOn: Yup.string().when("isDependent", {
    is: true,
    then: (schema) => schema.required("Please select a parent option"),
    otherwise: (schema) => schema.optional(),
  }),

  values: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Option value is required"),
        dependentValue: Yup.string().when("isDependent", {
          is: true,
          then: (schema) => schema.required("Dependent value is required"),
          otherwise: (schema) => schema.optional(),
        }),
      })
    )
    .min(1, "At least one option is required"),

  byDefaultNotShow: Yup.boolean().required(),

  defaultOptionName: Yup.string().when("byDefaultNotShow", {
    is: true,
    then: (schema) => schema.required("Select default option name"),
    otherwise: (schema) => schema.optional(),
  }),

  defaultOptionListId: Yup.string().when("byDefaultNotShow", {
    is: true,
    then: (schema) => schema.required("Select default option list"),
    otherwise: (schema) => schema.optional(),
  }),
});

interface CategoryFormInterface {
  dropdownHeadingId?: string;
  optionName: string;
  isDependent: boolean;
  dependentOn?: string | null;
  values: { name: string; dependentValue?: string | null; optionId?: string }[];
  byDefaultNotShow: boolean;
  defaultOptionName?: string;
  defaultOptionListId?: string;
}

interface OptionsInterface extends SelectComp {
  options: SelectComp[];
}

export default function Category({ params }: { params: { id?: string[0] } }) {
  const id = params.id?.[0];
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<CategoryFormInterface>({
    defaultValues: {
      byDefaultNotShow: false,
      values: [{ name: "", dependentValue: null }],
      isDependent: false,
      dependentOn: null,
    },
    // resolver: yupResolver(validationSchema),
  });

  const [mockOptions, setMockOptions] = useState<SelectComp[]>([]);
  const [allOptions, setAllOptions] = useState<OptionsInterface[]>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  const isDependent = watch("isDependent");
  const byDefaultNotShow = watch("byDefaultNotShow");
  const dependentOn = watch("dependentOn");
  const defaultOptionName = watch("defaultOptionName");

  const getAllDropDownOptions = async () => {
    const response = await apiCallPostRequest("SpDropdownCategory", 2);
    if (response.isSuccess) {
      setAllOptions(response.result);
      setMockOptions(
        response.result.map((o: SelectComp) => ({
          label: o.label,
          value: o.value,
        }))
      );
    }
  };

  const getUpdateValueOptions = async () => {
    const response = await apiCallPostRequest<{ DropdownHeadingId: string }>(
      "SpDropdownCategory",
      4,
      { DropdownHeadingId: String(id) }
    );
    if (response.isSuccess) {
      console.log(response);
      reset(response.result[0]);
    }
  };

  useEffect(() => {
    getAllDropDownOptions();
    id && getUpdateValueOptions();
  }, []);

  const onSubmit = async (data: CategoryFormInterface) => {
    const response = await apiCallPostRequest("SpDropdownCategory", 1, {
      ...data,
      ...(id ? { dropdownHeadingId: id } : {}),
    });
    if (response.isSuccess) {
      toastNotify(response.result);
      reset();
    } else {
      rtkErrorRead(response.errorMessage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white border border-gray-200 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Option</h2>

        {/* Option Name */}
        <div className="space-y-2">
          <label className="block font-medium">Write Option Name</label>
          <Input
            {...register("optionName")}
            placeholder="e.g., Country, Business Type"
          />
        </div>

        {/* Is Dependent */}
        <div className="flex items-center space-x-3">
          <Controller
            name="isDependent"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="isDependent"
              />
            )}
          />
          <label htmlFor="isDependent" className="text-sm font-medium">
            Is Dependent?
          </label>
        </div>

        {/* Dependent Dropdown */}
        {isDependent && (
          <div className="space-y-2">
            <label className="block font-medium">Dependent On</label>
            <Controller
              name="dependentOn"
              control={control}
              render={({ field }) => (
                <Select
                  options={mockOptions}
                  value={
                    mockOptions.find(
                      (opt) => String(opt.value) === String(field.value)
                    ) || null
                  }
                  onChange={(selected: SelectComp | null) => {
                    field.onChange(selected?.value);
                    console.log(selected, field);
                  }}
                  placeholder="Select Parent Option"
                />
              )}
            />
          </div>
        )}

        {/* Dynamic Option List */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Add Option Values</h3>
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "flex flex-col sm:flex-row gap-2 items-start sm:items-center border border-gray-200 p-4 rounded-lg"
                )}
              >
                <Input
                  {...register(`values.${index}.name`)}
                  placeholder="Option value"
                  className="flex-1"
                />
                {isDependent && (
                  <Controller
                    name={`values.${index}.dependentValue`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={
                          allOptions?.find(
                            (x) => String(x.value) === String(dependentOn)
                          )?.options
                        }
                        value={allOptions
                          ?.find((x) => String(x.value) === String(dependentOn))
                          ?.options?.find(
                            (opt) => String(opt.value) === String(field.value)
                          )}
                        onChange={(selected) => field.onChange(selected?.value)}
                        placeholder="Select Value"
                      />
                    )}
                  />
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="mt-1 sm:mt-0"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "" })}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
        </div>

        {/* By Default Not Show */}
        <div className="flex items-center space-x-3">
          <Controller
            name="byDefaultNotShow"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="byDefaultNotShow"
              />
            )}
          />
          <label htmlFor="byDefaultNotShow" className="text-sm font-medium">
            By default not show
          </label>
        </div>

        {/* Default Option Dropdowns */}
        {byDefaultNotShow && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">
                Choose Option Name
              </label>
              <Controller
                name="defaultOptionName"
                control={control}
                render={({ field }) => (
                  <Select
                    options={mockOptions}
                    value={mockOptions.find(
                      (opt) => String(opt.value) === String(field.value)
                    )}
                    onChange={(selected) => field.onChange(selected?.value)}
                    placeholder="Select Option Name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Choose Option List
              </label>
              <Controller
                name="defaultOptionListId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={
                      allOptions?.find(
                        (x) => String(x.value) === String(defaultOptionName)
                      )?.options
                    }
                    value={allOptions
                      ?.find(
                        (x) => String(x.value) === String(defaultOptionName)
                      )
                      ?.options?.find(
                        (opt) => String(opt.value) === String(field.value)
                      )}
                    onChange={(selected) => field.onChange(selected?.value)}
                    placeholder="Select Option List"
                  />
                )}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : id ? "Update Option" : "Save Option"}
          </Button>
        </div>
      </form>
    </div>
  );
}
