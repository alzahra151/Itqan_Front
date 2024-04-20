

export interface ActivityResult {
    // result: Array<Activity>,
    name?: string,
    description?: string
}

export interface Activity {
    result: Array<ActivityResult>,
}