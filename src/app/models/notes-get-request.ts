
export class GetNotesRequest{
    siteService: string;
	start: string;
	end: string;
	facilityAssociations:  string [];
    pointAssociations:  string [];
    type: string;
	getBody: boolean;
	getAssociations: boolean;
}