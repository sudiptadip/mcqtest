"use client";

import { useForm } from "react-hook-form";
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
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Organization } from "@/lib/interface/Database";

const schema = yup.object({
  Name: yup.string().required("Name is required"),
  Slug: yup.string().required("Slug is required"),
});

export default function OrganizationForm({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const { id } = use(params);
  const orgId = id?.[0];

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Organization>({
    resolver: yupResolver(schema),
    defaultValues: {
      Name: "",
      Slug: "",
      WebsiteUrl: "",
    },
  });

  const fetchOrganization = async () => {
    const res = await apiCallPostRequest("sp_Organization", 3, { Id: orgId });
    if (res.isSuccess) reset(res.result[0]);
  };

  useEffect(() => {
    orgId && fetchOrganization();
  }, []);

  const onSubmit = async (data: Organization) => {
    const res = await apiCallPostRequest("sp_Organization", 1, data);
    if (res.isSuccess) {
      toastNotify(res.result);
      router.push("/admin/news/organization");
    } else {
      rtkErrorRead(res.errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-sm border border-gray-200">
        <CardHeader className="border-b flex justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {orgId ? "Update" : "Create"} Organization
          </CardTitle>
          <Link href="/admin/news/organization">
            <Button>
              <ArrowBigLeft className="mr-2" /> Back To List
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                {...register("Name")}
                className="mt-2 h-12"
                placeholder="Enter organization name"
              />
              {errors.Name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>

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
              <Label htmlFor="WebsiteUrl">Website URL</Label>
              <Input
                id="WebsiteUrl"
                {...register("WebsiteUrl")}
                className="mt-2 h-12"
                placeholder="https://example.com"
              />
              {errors.WebsiteUrl && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.WebsiteUrl.message}
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