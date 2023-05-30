export interface MultiFormPayload {
    firstName:string;
    lastName:string;
    email:string;
    dateOfBirth:string;
    contact:string
}

export enum MultiFormValidation {
    firstName = "Validate First Name",
    lastName = "Validate Last Name",
    email = "Validate Email",
    dateOfBirth = "Validate Date Of Birth",
    contact = "Validate Contact Number",
    emalInvalid = "Invalid Email",
    dateOfBirthInvalid = "Invalid Date Of Birth",
    contactInvalid = "Invalid Contact"
}