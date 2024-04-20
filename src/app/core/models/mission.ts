export interface Mission {
    name: string;
    start_date: Date;
    end_date: Date;
    number_value: string;
    evaluation_method: string;
    procedure: "accept" | "implementation" | "evaluation" | "submit_reports";
    procedure_date: Date;
    description: string;
}
