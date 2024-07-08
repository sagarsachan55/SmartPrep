"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import {labels, priorities, questionDificulty, statuses} from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import Link from "next/link";

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ID",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Q. No." />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("ID")}</div>,
        enableHiding: false,
        enableSorting: false
    },
    {
        accessorKey: "Title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            // const label = labels.find((label) => label.value === row.original.label)
            let link:string = row.original.LeetcodeQuestionLink

            return (
                <div className="flex space-x-2">
                    {/*{label && <Badge variant="outline">{label.label}</Badge>}*/}

                    <Link href={link} target={'_blank'}>
                    <span className="max-w-[500px] truncate font-medium hover:text-muted-foreground">
                        {row.getValue("Title")}
                    </span>
                </Link>
                </div>
            )
        },
    },
    {
        accessorKey: "Company",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Company" />
        ),
        cell: ({row}) => {
            return(
                <div className={'flex w-[100px] items-center capitalize'}>
                    <span>{row.getValue("Company")}</span>
                </div>
            )
        }

    },
    {
        accessorKey: "Difficulty",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Difficulty" />
        ),
        cell: ({ row }) => {
            const priority = questionDificulty.find(
                (priority) => priority.value === row.getValue("Difficulty")
            )

            if (!priority) {
                return null
            }
            const colorMap: { [key: string]: string } = {
                'Medium': 'text-yellow-500',
                'Hard': 'text-red-500',
                'Easy': 'text-green-500',
            };

            let color = colorMap[priority.label];
            return (
                <div className="flex items-center">

                    <span className={color}>{priority.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
]