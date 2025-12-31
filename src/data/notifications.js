export const activityTemplates = {
  PROJECT_VIEW: (title) => ({
    title: "Project Insight",
    body: `You are currently exploring details for ${title}.`,
    time: "Just now"
  }),
  CERT_VIEW: (cert) => ({
    title: "Achievement Verified",
    body: `Viewed ${cert} credential.`,
    time: "Just now"
  }),
  CONTACT_COPY: {
    title: "Clipboard",
    body: "Email address copied to clipboard!",
    time: "Just now"
  }
};