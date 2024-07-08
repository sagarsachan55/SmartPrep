"use client"
import React,{useEffect,useState} from "react";
import {createClient} from "@/utils/supabase/client";

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { QuestionsTableViewOptions } from "@/app/questions/components/questions-table-view-options";
import { questionDificulty, questionStatus,companyNames } from "@/app/questions/data/data";
import {DataTableFacetedFilter} from "@/app/questions/components/data-table-faceted-filter";

interface  QuestionsTableToolbarProps<TData> {
    table: Table<TData>
}

export function QuestionTableToolbar<TData>({table}:QuestionsTableToolbarProps<TData>){
    const isFiltered = table.getState().columnFilters.length > 0

    const [companyNames,setCompanyNames] = useState<{label: string, value: string}[]>([]);
    const supabase = createClient();
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        async function fetchCompanyNames() {
            try {
                let { data, error } = await supabase
                    .from("company_names")
                    .select("company_name");

                if (error) throw error;

                // Check if data is truthy before proceeding
                if (!data) return [];

                let companyNames = data.map(company => ({
                    label: capitalizeFirstLetter(company.company_name),
                    value: capitalizeFirstLetter(company.company_name)
                }));

                setCompanyNames(companyNames);
            } catch (error) {
                console.error('Error fetching company names: ', error);
            }
        }

        fetchCompanyNames();
    }, []);

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter questions..."
                    value={(table.getColumn("Title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("Title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("Company") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("Company")}
                        title="Company"
                        options={companyNames}
                    />
                )}
                {table.getColumn("Difficulty") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("Difficulty")}
                        title="Difficulty"
                        options={questionDificulty}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <QuestionsTableViewOptions table={table} />
        </div>
    )
}