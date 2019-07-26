
export class GetNotesResponse{
    notes: NoteRecord [];
}

export class NoteRecord
{
    noteTag: string;
    body: string;
    type: string;
    summary: string;
    createdUserId: string;
    startTimestamp: string;
    endTimestamp: string;
    updatedTimeStamp: string;
    facilityAssociations: string [];
    pointAssociations: string [];
    textAttributes: string [];
    tableAttributes: string [];
    yesNoAttributes: boolean [];
}
