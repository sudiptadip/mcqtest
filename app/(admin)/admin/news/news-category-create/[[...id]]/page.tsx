"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toastNotify from "@/components/commonJs/toastNotify";
import { NewsCategory } from "@/lib/interface/Database";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import rtkErrorRead from "@/components/commonJs/rtkErrorRead";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

const schema = yup.object({
  Name: yup.string().required("Name is required"),
  Slug: yup.string().required("Slug is required"),
});

export default function NewsCategoryForm({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const { id } = use(params);
  const newsCategoryId = id?.[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsCategory>({
    resolver: yupResolver(schema),
    defaultValues: {
      Name: "",
      Slug: "",
    },
  });

  const getUpdateValueOfNewsCategory = async () => {
    const response = await apiCallPostRequest("sp_NewsCategory", 3, {
      Id: String(newsCategoryId),
    });
    if (response.isSuccess) {
      console.log(response);
      reset(response.result[0]);
    }
  };
  const router = useRouter();

  useEffect(() => {
    newsCategoryId && getUpdateValueOfNewsCategory();
  }, []);

  const onSubmit = async (data: NewsCategory) => {
    const response = await apiCallPostRequest("sp_NewsCategory", 1, data);
    if (response.isSuccess) {
      toastNotify(response.result);
      reset();
      router.push("/admin/news/news-category");
    } else {
      rtkErrorRead(response.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-sm border border-gray-200">
        <CardHeader className="border-b flex justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {newsCategoryId ? "Update" : "Create"} News Category
          </CardTitle>
          <Link href="/admin/news/news-category">
            <Button>
              {" "}
              <ArrowBigLeft /> Back To List
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="Name" className="text-base">
                Name
              </Label>
              <Input
                id="Name"
                {...register("Name")}
                className="mt-2 h-12 text-base"
                placeholder="Enter category name"
              />
              {errors.Name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="Slug" className="text-base">
                Slug
              </Label>
              <Input
                id="Slug"
                {...register("Slug")}
                className="mt-2 h-12 text-base"
                placeholder="Enter category slug"
              />
              {errors.Slug && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Slug.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
