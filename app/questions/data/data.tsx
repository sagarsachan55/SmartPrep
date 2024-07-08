import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
    Half2Icon,
} from "@radix-ui/react-icons";
import { createClient} from "@/utils/supabase/client";
const supabase = createClient()
export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
];
export const statuses = [
    {
        value: "backlog",
        label: "Backlog",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "todo",
        label: "Todo",
        icon: CircleIcon,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: StopwatchIcon,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircledIcon,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: CrossCircledIcon,
    },
];
export const priorities = [
    {
        label: "Low",
        value: "low",
        icon: ArrowDownIcon,
    },
    {
        label: "Medium",
        value: "medium",
        icon: ArrowRightIcon,
    },
    {
        label: "High",
        value: "high",
        icon: ArrowUpIcon,
    },
];

export const questionStatus = [
    {
        label: "Attempted",
        value: 'attempted',
        icons: Half2Icon
    },
    {
        label: "Wrong Answer",
        value: "wrong_answer",
        icons: CrossCircledIcon,
    },
    {
        label: "Accepted",
        value: "accepted",
        icon: CheckCircledIcon
    }
]

export const questionDificulty = [
    {
        label: "Easy",
        value: "Easy",
        icon: ArrowDownIcon,

    },
    {
        label: "Medium",
        value: "Medium",
        icon: ArrowRightIcon,
    },
    {
        label: "Hard",
        value: "Hard",
        icon: ArrowUpIcon,
    },
]

async function fetchCompanyNames(){
    try{
        let {data,error} = await supabase.from("company_names")
            .select("company_name");

        if(error) throw error;

        // Check if data is truthy before proceeding
        if(!data) return [];

        let companyNames = data.map(company => ({
            label: company.company_name,
            value: company.company_name
        }));

        return companyNames;
    }catch (error){
        console.error('Error fetching company names: ',error);
        return [];
    }
}
export const companyNames = fetchCompanyNames();

