"use client";

import { TableComp } from "@/components/common/TableComp";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import { Exam } from "@/lib/interface/Database";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const columns: ColumnDef<Exam>[] = [
  { accessorKey: "Name", header: "Name" },
  { accessorKey: "Slug", header: "Slug" },
  { accessorKey: "OrganizationId", header: "Organization" },
];

const ExamList = () => {
  const [data, setData] = useState<Exam[]>([]);

  const fetchExams = async () => {
    const res = await apiCallPostRequest("sp_Exam", 2);
    setData(res.isSuccess ? res.result : []);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete this exam?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await apiCallPostRequest("sp_Exam", 4, { Id: id });
      if (res.isSuccess) {
        Swal.fire("Deleted!", "Exam deleted.", "success");
        fetchExams();
      } else {
        Swal.fire("Error", res.result || "Failed to delete.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Exam List</h1>
      <TableComp
        data={data}
        columns={columns}
        createUrl="/admin/news/exam-create"
        renderActions={(row) => (
          <div className="flex gap-3">
            <Link
              href={`/admin/news/exam-create/${row.Id}`}
              className="text-yellow-600"
            >
              <Pencil className="h-5 w-5" />
            </Link>
            <button
              onClick={() => handleDelete(Number(row.Id))}
              className="text-red-600"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default ExamList;
