"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toastNotify from "@/components/commonJs/toastNotify";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import rtkErrorRead from "@/components/commonJs/rtkErrorRead";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import dynamic from "next/dynamic";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SelectComp } from "@/lib/interface";
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
  PublishDate: Date;
  IsPublished: boolean;
  DocumentImageId: string;
  ExpiredPostDate?: Date | null;
}

const schema = yup.object({
  Title: yup.string().required("Title is required"),
  Slug: yup.string().required("Slug is required"),
  Content: yup.string().required("Content is required"),
  CategoryId: yup.string().required("Category is required"),
  PublishDate: yup.date().required("Publish date is required"),
  IsPublished: yup.boolean().required(),
  DocumentImageId: yup.string().required("Image is required"),
});

export default function NewsForm({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const { id } = use(params),
    newsId = id?.[0];
  const router = useRouter();

  const [catOpts, setCatOpts] = useState<SelectComp[]>([]);
  const [examOpts, setExamOpts] = useState<SelectComp[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      Title: "",
      Slug: "",
      SourceUrl: "",
      Content: "",
      ShortDescription: "",
      CategoryId: "",
      ExamId: "",
      PublishDate: new Date(),
      IsPublished: false,
      DocumentImageId: "",
      ExpiredPostDate: undefined,
    },
  });

  const uploadedDocId = watch("DocumentImageId");

  const handleUploadSuccess = (result: { documentId: number; url: string }) => {
    setValue("DocumentImageId", result.documentId.toString());
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
        PublishDate: new Date(v.PublishDate),
        ExpiredPostDate: v.ExpiredPostDate
          ? new Date(v.ExpiredPostDate)
          : undefined,
      });
    }
  };

  useEffect(() => {
    fetchLookups();
    newsId && fetchNews();
  }, []);

  const onSubmit = async (data: FormDTO) => {
    const payload = {
      ...data,
      CategoryId: Number(data.CategoryId),
      ExamId: data.ExamId ? Number(data.ExamId) : null,
      PublishDate: data.PublishDate.toISOString(),
      ExpiredPostDate: data.ExpiredPostDate?.toISOString() ?? null,
    };
    const res = await apiCallPostRequest("sp_News", 1, payload);
    if (res.isSuccess) {
      toastNotify(res.result);
      router.push("/admin/news");
    } else {
      rtkErrorRead(res.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10 px-4">
      <Card className="w-full max-w-6xl shadow-xl border border-gray-200 bg-white rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b p-6">
          <CardTitle className="text-3xl font-semibold text-gray-800">
            {newsId ? "Update" : "Create"} News
          </CardTitle>
          <Link href="/admin/news">
            <Button>
              <ArrowBigLeft className="mr-2 h-5 w-5" />
              Back to List
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input {...register("Title")} className="mt-2" />
              {errors.Title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Title.message}
                </p>
              )}
            </div>

            {/* Slug + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Exam (optional)</Label>
                <Controller
                  name="ExamId"
                  control={control}
                  render={({ field }) => (
                    <SelectClient
                      options={examOpts}
                      className="mt-2"
                      getOptionLabel={(e: any) => e.label}
                      getOptionValue={(e: any) => e.value}
                      onChange={(opt: any) => field.onChange(opt?.value)}
                      value={
                        examOpts.find((o) => o.value === field.value) ?? null
                      }
                      placeholder="Select exam"
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
                      {...field}
                      className="mt-2"
                      options={catOpts}
                      getOptionLabel={(e: any) => e.label}
                      getOptionValue={(e: any) => e.value}
                      onChange={(opt: any) => field.onChange(opt?.value)}
                      value={
                        catOpts.find((o) => o.value === field.value) ?? null
                      }
                      placeholder="Select category"
                    />
                  )}
                />
                {errors.CategoryId && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.CategoryId.message}
                  </p>
                )}
              </div>
            </div>

            {/* Exam + Publish Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Slug</Label>
                <Input {...register("Slug")} className="mt-2" />
                {errors.Slug && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.Slug.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Source URL</Label>
                <Input {...register("SourceUrl")} className="mt-2" />
              </div>
            </div>

            {/* Short Description + SourceUrl */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Publish Date</Label>
                <Controller
                  name="PublishDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      placeholderText="Select publish date & time"
                    />
                  )}
                />
                {errors.PublishDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.PublishDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Expired Post Date</Label>
                <Controller
                  name="ExpiredPostDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      className="mt-2 p-2 border border-gray-300 rounded w-full"
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="yyyy-MM-dd h:mm aa"
                      placeholderText="Select expiry date & time"
                      isClearable
                    />
                  )}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <Label>Content</Label>
              <Controller
                name="Content"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 border rounded overflow-hidden">
                    <MDEditor
                      value={field.value}
                      onChange={field.onChange}
                      height={300}
                    />
                  </div>
                )}
              />
              {errors.Content && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Content.message}
                </p>
              )}
            </div>

            {/* Expired Date + Published Checkbox */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div>
                <Label>Short Description</Label>
                <Input {...register("ShortDescription")} className="mt-2" />
              </div>
              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  {...register("IsPublished")}
                  className="h-5 w-5 border-gray-400"
                />
                <Label className="text-gray-700">Is Published?</Label>
              </div>
            </div>

            {/* Document Image ID */}
            <div>
              <Label>Document Image</Label>
              <UploadComp
                onUploadSuccess={handleUploadSuccess}
                title="newsImage"
              />
              {errors.DocumentImageId && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.DocumentImageId.message}
                </p>
              )}
              {uploadedDocId && (
                <p className="text-sm text-green-600 mt-2">
                  File uploaded. Document ID: {uploadedDocId}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg"
              >
                {isSubmitting ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
