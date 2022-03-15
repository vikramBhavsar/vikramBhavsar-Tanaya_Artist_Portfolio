export interface ProjectContents {

    //  ***** THIS IS TEMPORARY OR PROPERLY DESIGNED JOIN OF ALL THE DATA FROM THE DATABASE.
    //  ***** IDEA IS TO MERGE EVERYTHING AND SEND IT TO GALLERY APP AND DO THE PROCESSING THERE.
 
    // Project part of the model
    projectID:string;
    projectHeader:string;
    projectDescription:String;

    // section part of the model
    sectionID:string;
    sectionType:string;
    sectionProjectID:string;
    sectionHeader:string;
    sectionDescription:string;


    // Image part of the model
    imgId:string;
    imgLink:string;
    imgDescription:string;

    // **************** THE TYPES OF SECTION SHOULD BE DECIDED PRIOR ******************
    // Currently there are three ways that section is divided.
    // 1: Single photo with description.                           SD
    // 2: single photo without description                         S
    // 3: Multiple photos carousal with description                MCD
    // 4: Multiple photos carousal without description             MC
    // 5: Multiple photos GRID layout                              MG
    // ********************************************************************************
}
