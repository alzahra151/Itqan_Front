import { Mission } from "./mission";

export interface ExectivePlan {
    name: string;
    main_goal: string;
    Requirements: string;
    expected_impact: string;
    cost: number;
    description: string;
    activity_id: {
        type: number;
        allowNull: false;
    };
    beneficiary_id: {
        type: number;
        allowNull: false;
    };
    Strategic_plan_id: {
        type: number;
        allowNull: false;
    };
    repetition: {
        type: boolean;
        defaultValue: false;
    };
    automated_reports: {
        type: boolean;
        defaultValue: false;
    };
    follow_up: {
        type: boolean;
        defaultValue: false;
    };
    out_of_plan: {
        type: boolean;
        defaultValue: false;
    };
    missions: Array<Mission>
}
