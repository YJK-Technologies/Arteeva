const COMPANY_EMAIL = "notification.arteeva.co@gmail.com";
const COMPANY_NAME = "ARTEEVA Consultants & Contractors";


function doGet(e) {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        status: "active",
        message: "ARTEEVA Web App Service is active."
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}


function doPost(e) {
  try {

    Logger.log("POST request received");

    var data = {};

    // Read JSON data
    if (e.postData && e.postData.contents) {

      try {
        data = JSON.parse(e.postData.contents);

      } catch (jsonError) {

        // Read normal form data
        data = e.parameter || {};
      }

    } else {

      data = e.parameter || {};

    }


    // ARTEEVA form fields
    var name = data.name || "Not provided";
    var company = data.company || "Not provided";
    var email = data.email || "Not provided";
    var phone = data.phone || "Not provided";
    var projectType = data.projectType || "Not provided";
    var location = data.location || "Not provided";
    var serviceRequired = data.serviceRequired || "Not provided";
    var message = data.message || "Not provided";


    // Email subject
    var subject =
      "New Project Enquiry from ARTEEVA Website";


    // Email body
    var body =
      "You received a new project enquiry from the ARTEEVA website.\n\n" +

      "Name: " + name + "\n" +
      "Company: " + company + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n" +
      "Project Type: " + projectType + "\n" +
      "Project Location: " + location + "\n" +
      "Service Required: " + serviceRequired + "\n\n" +

      "Project Brief:\n" +
      message + "\n\n" +

      "Timestamp: " +
      new Date().toLocaleString();


    // Send email
    MailApp.sendEmail(
      COMPANY_EMAIL,
      subject,
      body
    );


    // Success response
    return ContentService
      .createTextOutput(
        JSON.stringify({
          status: "success",
          message: "Email sent successfully"
        })
      )
      .setMimeType(ContentService.MimeType.JSON);


  } catch (error) {

    Logger.log(error.toString());

    return ContentService
      .createTextOutput(
        JSON.stringify({
          status: "error",
          message: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  }
}