"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowBigLeft, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import toastNotify from "@/components/commonJs/toastNotify";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import rtkErrorRead from "@/components/commonJs/rtkErrorRead";
import { fromSqlDateTime, toSqlDateTime } from "@/lib/dateUtils";
import { SelectComp } from "@/lib/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const UploadComp = dynamic(() => import("@/components/common/UploadComp"), {
  ssr: false,
});
const SelectClient = dynamic(
  () => import("@/components/common/SelectClientWrapper"),
  { ssr: false }
);

export interface FormDTO {
  Title: string;
  Slug: string;
  SourceUrl?: string | null;
  Content: string;
  ShortDescription?: string | null;
  CategoryId: string;
  ExamId?: string | null;
  PublishDate?: Date | null;
  IsPublished: boolean;
  DocumentImageId: string;
  ExpiredPostDate?: Date | null;
  PreviewUrl?: string;
}

const fullSchema = yup.object({
  Title: yup.string().required("Title is required"),
  Slug: yup.string().required("Slug is required"),
  Content: yup.string().required("Content is required"),
  CategoryId: yup.string().required("Category is required"),
  DocumentImageId: yup.string().required("Image is required"),
  IsPublished: yup.boolean().required(),
});

export default function NewsForm({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const { id } = use(params),
    newsId = id?.[0];
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [catOpts, setCatOpts] = useState<SelectComp[]>([]);
  const [examOpts, setExamOpts] = useState<SelectComp[]>([]);

  const stepFields: Record<number, (keyof FormDTO)[]> = {
    1: ["Title", "Slug", "CategoryId"],
    2: ["Content", "DocumentImageId"],
    3: ["IsPublished"],
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    reset,
    watch,
    setValue,
  } = useForm<FormDTO>({
    resolver: yupResolver(fullSchema),
    defaultValues: {
      Title: "",
      Slug: "",
      SourceUrl: "",
      Content: "",
      ShortDescription: "",
      CategoryId: "",
      ExamId: "",
      PublishDate: undefined,
      IsPublished: false,
      DocumentImageId: "",
      ExpiredPostDate: undefined,
      PreviewUrl: ""
    },
  });

  const handleUploadSuccess = (result: { documentId: number; url: string }) => {
    setValue("DocumentImageId", result.documentId.toString());
    setValue("PreviewUrl", result.url);
  };

  const fetchLookups = async () => {
    const c = await apiCallPostRequest("sp_NewsCategory", 2);
    const e = await apiCallPostRequest("sp_Exam", 2);
    if (c.isSuccess)
      setCatOpts(
        c.result.map((o: any) => ({ value: String(o.Id), label: o.Name }))
      );
    if (e.isSuccess)
      setExamOpts(
        e.result.map((o: any) => ({ value: String(o.Id), label: o.Name }))
      );
  };

  const fetchNews = async () => {
    const res = await apiCallPostRequest("sp_News", 3, { Id: newsId });
    if (res.isSuccess) {
      const v = res.result[0];
      reset({
        ...v,
        CategoryId: String(v.CategoryId),
        ExamId: v.ExamId ? String(v.ExamId) : undefined,
        PublishDate: fromSqlDateTime(v.PublishDate),
        ExpiredPostDate: v.ExpiredPostDate
          ? fromSqlDateTime(v.ExpiredPostDate)
          : undefined,
      });
    }
  };

  useEffect(() => {
    fetchLookups();
    newsId && fetchNews();
  }, []);

  const handleNext = async () => {
    const isValid = await trigger(stepFields[step]);
    if (isValid && step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormDTO) => {
    if (step === 3) {
      const payload = {
        ...data,
        CategoryId: Number(data.CategoryId),
        ExamId: data.ExamId ? Number(data.ExamId) : null,
        PublishDate: data.PublishDate ? toSqlDateTime(data.PublishDate) : null,
        ExpiredPostDate: data.ExpiredPostDate
          ? toSqlDateTime(data.ExpiredPostDate)
          : null,
      };
      const res = await apiCallPostRequest("sp_News", 1, payload);
      if (res.isSuccess) {
        toastNotify(res.result);
        router.push("/admin/news");
      } else {
        rtkErrorRead(res.errorMessage);
      }
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-4">
      <Card className="w-full max-w-5xl shadow-lg border bg-white rounded-2xl">
        <CardHeader className="flex justify-between items-center p-6 border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {newsId ? "Update" : "Create"} News
          </CardTitle>
          <Link href="/admin/news">
            <Button variant="secondary">
              <ArrowBigLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="text-center text-lg font-medium text-gray-600">
            Step {step} of 3
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2 mb-8">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input {...register("Title")} />
                  {errors.Title && (
                    <p className="text-sm text-red-600">
                      {errors.Title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Exam</Label>
                  <Controller
                    name="ExamId"
                    control={control}
                    render={({ field }) => (
                      <SelectClient
                        options={examOpts}
                        value={
                          examOpts.find((o) => o.value === field.value) ?? null
                        }
                        onChange={(opt: any) => field.onChange(opt?.value)}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Controller
                    name="CategoryId"
                    control={control}
                    render={({ field }) => (
                      <SelectClient
                        options={catOpts}
                        value={
                          catOpts.find((o) => o.value === field.value) ?? null
                        }
                        onChange={(opt: any) => field.onChange(opt?.value)}
                      />
                    )}
                  />
                  {errors.CategoryId && (
                    <p className="text-sm text-red-600">
                      {errors.CategoryId.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Slug</Label>
                  <Input {...register("Slug")} />
                  {errors.Slug && (
                    <p className="text-sm text-red-600">
                      {errors.Slug.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Source URL</Label>
                  <Input {...register("SourceUrl")} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Content</Label>
                  <Controller
                    name="Content"
                    control={control}
                    render={({ field }) => (
                      <MDEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={300}
                      />
                    )}
                  />
                  {errors.Content && (
                    <p className="text-sm text-red-600">
                      {errors.Content.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Short Description</Label>
                  <Input {...register("ShortDescription")} />
                </div>

                <div>
                  <Label>Document Image</Label>
                  <UploadComp
                    onUploadSuccess={handleUploadSuccess}
                    title="newsImage"
                    previewUrl={watch("PreviewUrl")}
                  />
                  {errors.DocumentImageId && (
                    <p className="text-sm text-red-600">
                      {errors.DocumentImageId.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Toggle Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <ToggleSwitch
                      checked={!!watch("PublishDate")}
                      onChange={(checked) => {
                        if (checked) {
                          setValue("PublishDate", new Date());
                        } else {
                          setValue("PublishDate", null as any);
                        }
                      }}
                    />
                    <Label>Enable Schedule On</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ToggleSwitch
                      checked={!!watch("ExpiredPostDate")}
                      onChange={(checked) => {
                        if (checked) {
                          setValue("ExpiredPostDate", new Date());
                        } else {
                          setValue("ExpiredPostDate", null);
                        }
                      }}
                    />
                    <Label>Enable Expired Post Date</Label>
                  </div>
                </div>

                {/* Date Pickers (conditionally rendered) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Schedule On (PublishDate) */}
                  {watch("PublishDate") && (
                    <div>
                      <Label>Schedule On</Label>
                      <Controller
                        name="PublishDate"
                        control={control}
                        render={({ field }) => (
                          <div className="flex gap-2 mt-2">
                            {/* Date Picker */}
                            <div className="w-[70%]">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field?.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field?.value instanceof Date &&
                                    !isNaN(field.value.getTime()) ? (
                                      format(field?.value, "PPP")
                                    ) : (
                                      <span>Pick date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value!}
                                    onSelect={(date) => {
                                      if (date) {
                                        const newDate = new Date(date);
                                        newDate.setHours(
                                          field.value?.getHours() || 0
                                        );
                                        newDate.setMinutes(
                                          field.value?.getMinutes() || 0
                                        );
                                        field.onChange(newDate);
                                      }
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            {/* Time Picker */}
                            <Input
                              type="time"
                              className="w-36"
                              value={
                                field?.value instanceof Date &&
                                !isNaN(field.value.getTime())
                                  ? format(field?.value, "HH:mm")
                                  : ""
                              }
                              onChange={(e) => {
                                const [hours, minutes] = e.target.value
                                  .split(":")
                                  .map(Number);
                                const newDate = new Date(
                                  field?.value || new Date()
                                );
                                newDate.setHours(hours);
                                newDate.setMinutes(minutes);
                                field.onChange(newDate);
                              }}
                            />
                          </div>
                        )}
                      />
                      {errors.PublishDate && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.PublishDate.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Expired Post Date */}
                  {watch("ExpiredPostDate") && (
                    <div>
                      <Label>Expired Post Date</Label>
                      <Controller
                        name="ExpiredPostDate"
                        control={control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal mt-2",
                                  !field?.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field?.value instanceof Date &&
                                !isNaN(field.value.getTime()) ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value ?? undefined}
                                onSelect={(date) => field.onChange(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Is Published Checkbox */}
                <div className="flex items-center space-x-3 pt-2">
                  <Controller
                    name="IsPublished"
                    control={control}
                    render={({ field }) => (
                      <>
                        <ToggleSwitch
                          checked={field.value}
                          onChange={(checked) => field.onChange(checked)}
                        />
                        <Label>Is Published?</Label>
                      </>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
                disabled={step === 1}
                className={`px-6 py-2 w-[50%] ${step === 1 ? "cursor-crosshair" :"cursor-pointer"}`}
              >
                Previous
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 w-[50%] cursor-pointer"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="px-6 py-2 w-[50%] cursor-pointer"
                >
                  {isSubmitting ? "Saving..." : "Submit"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
