export interface Quote{
    userName: String;
    quoteText: String;
    //profilePicture: File | null;
    profilePicture: String;
}

export interface helpCallDto{
    id: number | null;
    guestName: String;
    guestPhoneNumber: String;
    processed: boolean;
}