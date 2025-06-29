"use client";
import { TableComp } from "@/components/common/TableComp";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import { NewsCategory as NewsCategoryInterface } from "@/lib/interface/Database";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const userColumns: ColumnDef<NewsCategoryInterface>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Slug",
    header: "Slug",
  },
];

const NewsCategory = () => {
  const [newsCategoryData, setNewsCategoryData] = useState<
    NewsCategoryInterface[]
  >([]);

  const getAllDropDownOptions = async () => {
    const response = await apiCallPostRequest("sp_NewsCategory", 2);
    if (response.isSuccess) {
      setNewsCategoryData(response?.result || []);
    } else {
      setNewsCategoryData([]);
    }
  };

  useEffect(() => {
    getAllDropDownOptions();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await apiCallPostRequest("sp_NewsCategory", 4, {
        Id: id,
      });

      if (response.isSuccess) {
        await Swal.fire(
          "Deleted!",
          "News category has been deleted.",
          "success"
        );
        getAllDropDownOptions();
      } else {
        Swal.fire("Error", response.result || "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">News Category List</h1>
      <TableComp
        data={newsCategoryData}
        columns={userColumns}
        createUrl={"/admin/news/news-category-create"}
        renderActions={(row) => (
          <div className="flex gap-3">
            <Link
              href={`/admin/news/news-category-create/${row.Id}`}
              className="text-yellow-600"
            >
              <Pencil className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(Number(row?.Id))}
              className="text-red-600"
            >
              <Trash className="h-[18px] w-[18px]" />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default NewsCategory;
