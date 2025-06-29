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
import { Organization } from "@/lib/interface/Database";
import { SelectComp } from "@/lib/interface";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export interface ExamFormDTO {
  Name: string;
  Slug: string;
  OrganizationId: string;
  Description?: string | null;
}

const schema = yup.object({
  Name: yup.string().required("Name is required"),
  Slug: yup.string().required("Slug is required"),
  OrganizationId: yup.string().required("Organization is required"),
});

export default function ExamForm({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const { id } = use(params);
  const examId = id?.[0];
  const router = useRouter();

  const [orgOptions, setOrgOptions] = useState<SelectComp[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExamFormDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      Name: "",
      Slug: "",
      OrganizationId: "",
      Description: "",
    },
  });

  const fetchOrganizations = async () => {
    const res = await apiCallPostRequest("sp_Organization", 2);
    if (res.isSuccess) {
      setOrgOptions(
        res.result.map((org: Organization) => ({
          value: String(org.Id),
          label: org.Name,
        }))
      );
    }
  };

  const fetchExam = async () => {
    const res = await apiCallPostRequest("sp_Exam", 3, { Id: examId });
    if (res.isSuccess) reset(res.result[0]);
  };

  useEffect(() => {
    fetchOrganizations();
    examId && fetchExam();
  }, []);

  const onSubmit = async (data: ExamFormDTO) => {
    const res = await apiCallPostRequest("sp_Exam", 1, data);
    if (res.isSuccess) {
      toastNotify(res.result);
      router.push("/admin/news/exam");
    } else {
      rtkErrorRead(res.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-5xl shadow-sm border border-gray-200">
        <CardHeader className="border-b flex justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {examId ? "Update" : "Create"} Exam
          </CardTitle>
          <Link href="/admin/news/exam">
            <Button>
              <ArrowBigLeft className="mr-2" /> Back To List
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                {...register("Name")}
                className="mt-2 h-12"
                placeholder="Enter exam name"
              />
              {errors.Name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="Slug">Slug</Label>
                <Input
                  id="Slug"
                  {...register("Slug")}
                  className="mt-2 h-12"
                  placeholder="Enter slug"
                />
                {errors.Slug && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.Slug.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="OrganizationId">Organization</Label>
                <Controller
                  name="OrganizationId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={orgOptions}
                      className="mt-2"
                      placeholder="Select organization"
                      onChange={(opt) =>
                        field.onChange(opt ? opt.value : undefined)
                      }
                      value={
                        orgOptions.find(
                          (o) => String(o.value) === String(field.value)
                        ) ?? null
                      }
                    />
                  )}
                />
                {errors.OrganizationId && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.OrganizationId.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="Description">Description</Label>
              <Controller
                name="Description"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 bg-white rounded-md border">
                    <MDEditor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      height={250}
                    />
                  </div>
                )}
              />
              {errors.Description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Description.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base"
            >
              {isSubmitting ? "Saving..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}