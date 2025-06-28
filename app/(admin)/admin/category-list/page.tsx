"use client";
import { TableComp } from "@/components/common/TableComp";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import { DropdownHeading } from "@/lib/interface/Database";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const userColumns: ColumnDef<DropdownHeading>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "IsAlwaysVisible",
    header: "IsAlwaysVisible",
  },
];

export default function CategoryList() {
  const [allOptions, setAllOptions] = useState<DropdownHeading[]>([]);

  const getAllDropDownOptions = async () => {
    const response = await apiCallPostRequest("SpDropdownCategory", 3);
    if (response.isSuccess) {
      setAllOptions(response.result);
    }
  };

  useEffect(() => {
    getAllDropDownOptions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <TableComp
        data={allOptions}
        columns={userColumns}
        createUrl={"/admin/category"}
        renderActions={(row) => (
          <div className="flex gap-3">
            <Link href={`/admin/category/${row.Id}`} className="text-yellow-600">
              {" "}
              <Pencil className="h-[18px] w-[18px]" />{" "}
            </Link>
            <Link href={""} className="text-red-600">
              {" "}
              <Trash className="h-[18px] w-[18px]" />{" "}
            </Link>
          </div>
        )}
      />
    </div>
  );
}
