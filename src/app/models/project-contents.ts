export interface ServerData{
    // for list of projects
    PROJECTS:ProjectGLRY[];
}

export interface ProjectGLRY{
    // Project part of the model
    projectID:string;
    projectHeader:string;
    projectDescription:string;

    // for list of sections
    SECTIONS:SectionGLRY[];


    // ***** DIFFERENT TYPES OF SECTIONS ***** //
    // (MG) -- multiple gallery contents
    // (SD) -- Single image with description
    // (S) -- Single Image with no description (currently looks okay)
    // (MC) -- Multiple image with Carousal
    // (MC) -- multiple image with carousal description
    // (3W) -- Three images without description
    // (2W) -- Two images without description
}

export interface SectionGLRY{
    // section part of the model
    sectionID:string;
    sectionType:string;
    sectionProjectID:string;
    sectionHeader:string;
    sectionDescription:string;

    // for list of images
    IMAGES: ImagesGLRY[]
}


export interface ImagesGLRY{
    // Image part of the model
    imgId:string;
    imgLink:string;
    isVideo:string;
    imgDescription:string;
}