import { News } from "../interface/Database";

interface GetAllNewsParams {
  page: number;
  query?: string;
}

// async function getNewsData(): Promise<News[]> {
//   const res = await fetch(
//     "https://demo2.upgradedigitalsolutions.in/api/AuthStoredProcedure/execute/sp_News/2"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch news data");
//   }

//   const data = await res.json();
//   return data as News[];
// }

const data: News[] = [
  {
    Id: 1,
    Title: "SSC CGL 2025 Notification Released",
    Slug: "ssc-cgl-2025-notification",
    ShortDescription: "Official notification released for SSC CGL 2025.",
    Content:
      "<p>The SSC CGL 2025 notification is out. Check eligibility, dates, and syllabus.</p>",
    SourceUrl: "https://ssc.nic.in/notice/cgl",
    PublishDate: "2025-07-01T16:43:28.903",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 1,
        Name: "SSC CGL 2025",
        Slug: "ssc-cgl-2025",
        Description: "Combined Graduate Level Exam by SSC",
        OrganizationId: 1,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 3,
        Name: "Eligibility",
      },
    ],
  },
  {
    Id: 2,
    Title: "UPSC CSE 2025 Application Opens",
    Slug: "upsc-cse-2025-apply-online",
    ShortDescription: "Apply for UPSC Civil Services Exam 2025 now!",
    Content:
      "<p>UPSC CSE 2025 application is now open. Apply before deadline.</p>",
    SourceUrl: "https://upsc.gov.in/exams/cse",
    PublishDate: "2025-07-01T16:43:28.903",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 2,
        Name: "UPSC Civil Services 2025",
        Slug: "upsc-cse-2025",
        Description: "Civil Services Exam by UPSC",
        OrganizationId: 2,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 4,
        Name: "Syllabus",
      },
    ],
  },
  {
    Id: 3,
    Title: "IBPS PO 2025 Registration Started",
    Slug: "ibps-po-2025-registration",
    ShortDescription: "IBPS PO 2025 online form available now.",
    Content:
      "<p>IBPS PO 2025 registration is now live. Apply before the last date.</p>",
    SourceUrl: "https://www.ibps.in/po-2025",
    PublishDate: "2025-07-01T16:43:40.787",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 3,
        Name: "IBPS PO 2025",
        Slug: "ibps-po-2025",
        Description: "Probationary Officer recruitment by IBPS",
        OrganizationId: 3,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 5,
        Name: "Admit Card",
      },
    ],
  },
  {
    Id: 4,
    Title: "RRB NTPC 2025 Vacancy Details Announced",
    Slug: "rrb-ntpc-2025-vacancy",
    ShortDescription: "Check total vacancies for RRB NTPC 2025.",
    Content:
      "<p>RRB NTPC 2025 notification includes zone-wise vacancy details.</p>",
    SourceUrl: "https://indianrailways.gov.in/ntpc2025",
    PublishDate: "2025-07-01T16:43:40.787",
    IsPublished: true,
    Category: [
      {
        Name: "Government Jobs",
        Id: 1,
        Slug: "government-jobs",
      },
    ],
    Exam: [
      {
        Id: 4,
        Name: "RRB NTPC 2025",
        Slug: "rrb-ntpc-2025",
        Description: "Non-Technical Popular Categories exam by RRB",
        OrganizationId: 4,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 3,
        Name: "Eligibility",
      },
    ],
  },
  {
    Id: 5,
    Title: "NTA UGC NET June 2025 Admit Card Released",
    Slug: "nta-ugc-net-june-2025-admit-card",
    ShortDescription: "Download UGC NET 2025 admit card now.",
    Content:
      "<p>Admit cards for UGC NET June 2025 are available on the NTA website.</p>",
    SourceUrl: "https://nta.ac.in/ugc-net",
    PublishDate: "2025-07-01T16:43:40.787",
    IsPublished: true,
    Category: [
      {
        Name: "Admit Cards",
        Id: 4,
        Slug: "admit-cards",
      },
    ],
    Exam: [
      {
        Id: 5,
        Name: "NTA UGC NET June 2025",
        Slug: "nta-ugc-net-june-2025",
        Description: "National Eligibility Test by NTA for June 2025",
        OrganizationId: 5,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 4,
        Name: "Syllabus",
      },
    ],
  },
  {
    Id: 6,
    Title: "SSC CHSL 2025 Tier 1 Exam Dates Out",
    Slug: "ssc-chsl-2025-exam-dates",
    ShortDescription: "Check official Tier 1 dates for SSC CHSL 2025.",
    Content: "<p>SSC has announced exam dates for CHSL 2025 Tier 1.</p>",
    SourceUrl: "https://ssc.nic.in/chsl-dates",
    PublishDate: "2025-07-01T16:43:40.787",
    IsPublished: true,
    Category: [
      {
        Name: "Syllabus & Preparation",
        Id: 5,
        Slug: "syllabus-preparation",
      },
    ],
    Exam: [
      {
        Id: 6,
        Name: "SSC CHSL 2025",
        Slug: "ssc-chsl-2025",
        Description: "Combined Higher Secondary Level Exam by SSC",
        OrganizationId: 1,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 5,
        Name: "Admit Card",
      },
    ],
  },
  {
    Id: 7,
    Title: "UPSC NDA 2025 Notification Released",
    Slug: "upsc-nda-2025-notification",
    ShortDescription: "UPSC NDA 2025 official notice published.",
    Content:
      "<p>The NDA 2025 notification is out. Eligibility, application dates, and syllabus included.</p>",
    SourceUrl: "https://upsc.gov.in/nda2025",
    PublishDate: "2025-07-01T16:43:40.787",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 7,
        Name: "UPSC NDA 2025",
        Slug: "upsc-nda-2025",
        Description: "National Defence Academy exam by UPSC",
        OrganizationId: 2,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 3,
        Name: "Eligibility",
      },
      {
        Id: 9,
        Name: "Important Dates",
      },
    ],
  },
  {
    Id: 8,
    Title: "IBPS PO 2025 Prelims Admit Card Out",
    Slug: "ibps-po-2025-admit-card",
    ShortDescription: "IBPS PO 2025 prelims admit card available.",
    Content:
      "<p>IBPS has released the prelims admit card for PO 2025 exam. Download from official portal.</p>",
    SourceUrl: "https://www.ibps.in/po-2025-admit",
    PublishDate: "2025-07-01T16:44:17.583",
    IsPublished: true,
    Category: [
      {
        Name: "Admit Cards",
        Id: 4,
        Slug: "admit-cards",
      },
    ],
    Exam: [
      {
        Id: 3,
        Name: "IBPS PO 2025",
        Slug: "ibps-po-2025",
        Description: "Probationary Officer recruitment by IBPS",
        OrganizationId: 3,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 6,
        Name: "Results",
      },
    ],
  },
  {
    Id: 9,
    Title: "RRB NTPC 2025 Syllabus PDF Download",
    Slug: "rrb-ntpc-2025-syllabus",
    ShortDescription: "RRB NTPC 2025 syllabus PDF available now.",
    Content:
      "<p>Download the official RRB NTPC 2025 syllabus including CBT 1 & CBT 2 topics.</p>",
    SourceUrl: "https://indianrailways.gov.in/ntpc-syllabus",
    PublishDate: "2025-07-01T16:44:17.583",
    IsPublished: true,
    Category: [
      {
        Name: "Syllabus & Preparation",
        Id: 5,
        Slug: "syllabus-preparation",
      },
    ],
    Exam: [
      {
        Id: 4,
        Name: "RRB NTPC 2025",
        Slug: "rrb-ntpc-2025",
        Description: "Non-Technical Popular Categories exam by RRB",
        OrganizationId: 4,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 10,
    Title: "UGC NET June 2025 Exam City Slip Released",
    Slug: "ugc-net-2025-exam-city-slip",
    ShortDescription: "Check your UGC NET June 2025 exam city.",
    Content:
      "<p>UGC NET 2025 city information slip released. Know your exam city now.</p>",
    SourceUrl: "https://nta.ac.in/ugcnet-city-slip",
    PublishDate: "2025-07-01T16:44:17.583",
    IsPublished: true,
    Category: [
      {
        Name: "Admit Cards",
        Id: 4,
        Slug: "admit-cards",
      },
    ],
    Exam: [
      {
        Id: 5,
        Name: "NTA UGC NET June 2025",
        Slug: "nta-ugc-net-june-2025",
        Description: "National Eligibility Test by NTA for June 2025",
        OrganizationId: 5,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 5,
        Name: "Admit Card",
      },
    ],
  },
  {
    Id: 11,
    Title: "SSC CHSL 2025 Tier 1 Result Declared",
    Slug: "ssc-chsl-2025-result",
    ShortDescription: "CHSL 2025 Tier 1 results now available.",
    Content:
      "<p>SSC CHSL 2025 Tier 1 results are declared. Check your result online.</p>",
    SourceUrl: "https://ssc.nic.in/chsl-result",
    PublishDate: "2025-07-01T16:44:17.583",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 6,
        Name: "SSC CHSL 2025",
        Slug: "ssc-chsl-2025",
        Description: "Combined Higher Secondary Level Exam by SSC",
        OrganizationId: 1,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 12,
    Title: "UPSC NDA 2025 Application Last Date Extended",
    Slug: "upsc-nda-2025-extended",
    ShortDescription: "New NDA 2025 application deadline announced.",
    Content:
      "<p>UPSC has extended the last date for NDA 2025 application submission by 7 days.</p>",
    SourceUrl: "https://upsc.gov.in/nda2025-extension",
    PublishDate: "2025-07-01T16:44:17.583",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 7,
        Name: "UPSC NDA 2025",
        Slug: "upsc-nda-2025",
        Description: "National Defence Academy exam by UPSC",
        OrganizationId: 2,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 9,
        Name: "Important Dates",
      },
    ],
  },
  {
    Id: 13,
    Title: "IBPS PO 2025 Mains Exam Date Announced",
    Slug: "ibps-po-2025-mains-date",
    ShortDescription: "IBPS PO 2025 mains exam date out now.",
    Content:
      "<p>IBPS has announced the mains exam date for PO 2025. Check the full schedule.</p>",
    SourceUrl: "https://www.ibps.in/po-2025-mains",
    PublishDate: "2025-07-01T16:45:45.467",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 3,
        Name: "IBPS PO 2025",
        Slug: "ibps-po-2025",
        Description: "Probationary Officer recruitment by IBPS",
        OrganizationId: 3,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 14,
    Title: "RRB NTPC 2025 Admit Card Download Begins",
    Slug: "rrb-ntpc-2025-admit-download",
    ShortDescription: "RRB NTPC 2025 admit card is now available.",
    Content:
      "<p>RRB NTPC 2025 admit card download has started. Get your hall ticket online.</p>",
    SourceUrl: "https://indianrailways.gov.in/ntpc-admit",
    PublishDate: "2025-07-01T16:45:45.467",
    IsPublished: true,
    Category: [
      {
        Name: "Admit Cards",
        Id: 4,
        Slug: "admit-cards",
      },
    ],
    Exam: [
      {
        Id: 4,
        Name: "RRB NTPC 2025",
        Slug: "rrb-ntpc-2025",
        Description: "Non-Technical Popular Categories exam by RRB",
        OrganizationId: 4,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 8,
        Name: "Application Form",
      },
    ],
  },
  {
    Id: 15,
    Title: "UGC NET 2025 Final Answer Key Released",
    Slug: "ugc-net-2025-final-answer-key",
    ShortDescription: "UGC NET 2025 answer key is out.",
    Content:
      "<p>NTA has released the final answer key for UGC NET 2025. Check subject-wise responses.</p>",
    SourceUrl: "https://nta.ac.in/ugcnet-answerkey",
    PublishDate: "2025-07-01T16:45:45.467",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 5,
        Name: "NTA UGC NET June 2025",
        Slug: "nta-ugc-net-june-2025",
        Description: "National Eligibility Test by NTA for June 2025",
        OrganizationId: 5,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 5,
        Name: "Admit Card",
      },
    ],
  },
  {
    Id: 16,
    Title: "IBPS PO 2025 Interview Schedule Released",
    Slug: "ibps-po-2025-interview-schedule",
    ShortDescription: "Check your interview dates for IBPS PO 2025.",
    Content:
      "<p>IBPS has released the interview schedule for PO 2025 qualified candidates.</p>",
    SourceUrl: "https://www.ibps.in/po-interview-2025",
    PublishDate: "2025-07-01T16:46:22.057",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 3,
        Name: "IBPS PO 2025",
        Slug: "ibps-po-2025",
        Description: "Probationary Officer recruitment by IBPS",
        OrganizationId: 3,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 17,
    Title: "RRB NTPC 2025 CBT-2 Exam Pattern Explained",
    Slug: "rrb-ntpc-2025-cbt2-pattern",
    ShortDescription: "RRB NTPC 2025 CBT-2 pattern released.",
    Content:
      "<p>RRB NTPC 2025 CBT-2 pattern includes subject-wise marks and time limits. Check now.</p>",
    SourceUrl: "https://indianrailways.gov.in/ntpc-cbt2",
    PublishDate: "2025-07-01T16:46:22.057",
    IsPublished: true,
    Category: [
      {
        Name: "Syllabus & Preparation",
        Id: 5,
        Slug: "syllabus-preparation",
      },
    ],
    Exam: [
      {
        Id: 4,
        Name: "RRB NTPC 2025",
        Slug: "rrb-ntpc-2025",
        Description: "Non-Technical Popular Categories exam by RRB",
        OrganizationId: 4,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 18,
    Title: "UGC NET 2025 Cutoff Marks Published",
    Slug: "ugc-net-2025-cutoff",
    ShortDescription: "UGC NET June 2025 cutoff declared.",
    Content:
      "<p>NTA has declared the official cutoff marks for UGC NET June 2025 exam.</p>",
    SourceUrl: "https://nta.ac.in/ugcnet-cutoff",
    PublishDate: "2025-07-01T16:46:22.057",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 5,
        Name: "NTA UGC NET June 2025",
        Slug: "nta-ugc-net-june-2025",
        Description: "National Eligibility Test by NTA for June 2025",
        OrganizationId: 5,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 7,
        Name: "Cutoff",
      },
    ],
  },
  {
    Id: 19,
    Title: "SSC CHSL 2025 Syllabus & Preparation Tips",
    Slug: "ssc-chsl-2025-syllabus-tips",
    ShortDescription: "CHSL 2025 syllabus and strategy guide.",
    Content:
      "<p>SSC CHSL 2025 syllabus with expert preparation tips for Tier 1 and Tier 2 exams.</p>",
    SourceUrl: "https://ssc.nic.in/chsl-syllabus-tips",
    PublishDate: "2025-07-01T16:46:22.057",
    IsPublished: true,
    Category: [
      {
        Name: "Syllabus & Preparation",
        Id: 5,
        Slug: "syllabus-preparation",
      },
    ],
    Exam: [
      {
        Id: 6,
        Name: "SSC CHSL 2025",
        Slug: "ssc-chsl-2025",
        Description: "Combined Higher Secondary Level Exam by SSC",
        OrganizationId: 1,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 1,
        Name: "UPSC",
      },
      {
        Id: 9,
        Name: "Important Dates",
      },
    ],
  },
  {
    Id: 20,
    Title: "UPSC NDA 2025 Admit Card Released",
    Slug: "upsc-nda-2025-admit-card",
    ShortDescription: "NDA 2025 admit card is now available.",
    Content:
      "<p>UPSC has released the NDA 2025 admit card. Download yours from the official site.</p>",
    SourceUrl: "https://upsc.gov.in/nda-admit",
    PublishDate: "2025-07-01T16:46:22.057",
    IsPublished: true,
    Category: [
      {
        Name: "Admit Cards",
        Id: 4,
        Slug: "admit-cards",
      },
    ],
    Exam: [
      {
        Id: 7,
        Name: "UPSC NDA 2025",
        Slug: "upsc-nda-2025",
        Description: "National Defence Academy exam by UPSC",
        OrganizationId: 2,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 7,
        Name: "Cutoff",
      },
    ],
  },
  {
    Id: 21,
    Title: "IBPS PO 2025 Final Result Out",
    Slug: "ibps-po-2025-final-result",
    ShortDescription: "IBPS PO 2025 final result released.",
    Content:
      "<p>The final result for IBPS PO 2025 is out now. Candidates can check their status online.</p>",
    SourceUrl: "https://www.ibps.in/po-final-result",
    PublishDate: "2025-07-01T16:47:16.820",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 3,
        Name: "IBPS PO 2025",
        Slug: "ibps-po-2025",
        Description: "Probationary Officer recruitment by IBPS",
        OrganizationId: 3,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 22,
    Title: "RRB NTPC 2025 Typing Test Schedule Published",
    Slug: "rrb-ntpc-2025-typing-schedule",
    ShortDescription: "RRB NTPC 2025 typing test dates announced.",
    Content:
      "<p>RRB has released the typing test schedule for NTPC 2025 qualified candidates.</p>",
    SourceUrl: "https://indianrailways.gov.in/ntpc-typing",
    PublishDate: "2025-07-01T16:47:16.820",
    IsPublished: true,
    Category: [
      {
        Name: "Exam Notifications",
        Id: 2,
        Slug: "exam-notifications",
      },
    ],
    Exam: [
      {
        Id: 4,
        Name: "RRB NTPC 2025",
        Slug: "rrb-ntpc-2025",
        Description: "Non-Technical Popular Categories exam by RRB",
        OrganizationId: 4,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 7,
        Name: "Cutoff",
      },
    ],
  },
  {
    Id: 23,
    Title: "UGC NET 2025 Result Declared",
    Slug: "ugc-net-2025-result",
    ShortDescription: "UGC NET 2025 result is now available.",
    Content:
      "<p>NTA has declared the UGC NET 2025 results. Candidates can check subject-wise scores.</p>",
    SourceUrl: "https://nta.ac.in/ugcnet-result",
    PublishDate: "2025-07-01T16:47:16.820",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 5,
        Name: "NTA UGC NET June 2025",
        Slug: "nta-ugc-net-june-2025",
        Description: "National Eligibility Test by NTA for June 2025",
        OrganizationId: 5,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
    Tags: [
      {
        Id: 2,
        Name: "Notification",
      },
      {
        Id: 7,
        Name: "Cutoff",
      },
    ],
  },
  {
    Id: 24,
    Title: "SSC CHSL 2025 Final Answer Key Out",
    Slug: "ssc-chsl-2025-final-key",
    ShortDescription: "SSC CHSL 2025 answer key released.",
    Content:
      "<p>SSC has released the final answer key for CHSL 2025. Candidates can download PDFs.</p>",
    SourceUrl: "https://ssc.nic.in/chsl-answer-key",
    PublishDate: "2025-07-01T16:47:16.820",
    IsPublished: true,
    Category: [
      {
        Name: "Admit Cards",
        Id: 4,
        Slug: "admit-cards",
      },
    ],
    Exam: [
      {
        Id: 6,
        Name: "SSC CHSL 2025",
        Slug: "ssc-chsl-2025",
        Description: "Combined Higher Secondary Level Exam by SSC",
        OrganizationId: 1,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
  {
    Id: 25,
    Title: "UPSC NDA 2025 Result Announced",
    Slug: "upsc-nda-2025-result",
    ShortDescription: "UPSC NDA 2025 result and merit list available.",
    Content:
      "<p>UPSC has announced the NDA 2025 results. Merit list is available on the official website.</p>",
    SourceUrl: "https://upsc.gov.in/nda-result",
    PublishDate: "2025-07-01T16:47:16.820",
    IsPublished: true,
    Category: [
      {
        Name: "Results & Cutoffs",
        Id: 3,
        Slug: "results-cutoffs",
      },
    ],
    Exam: [
      {
        Id: 7,
        Name: "UPSC NDA 2025",
        Slug: "upsc-nda-2025",
        Description: "National Defence Academy exam by UPSC",
        OrganizationId: 2,
        IsDeleted: false,
        IsActive: true,
        CreatedOn: "2025-07-01T16:41:16.040",
        ModifiedOn: "2025-07-01T16:41:16.040",
        CreatedBy: "admin",
        ModifiedBy: "admin",
      },
    ],
  },
].map((x) => ({
  ...x,
  Category: x.Category[0],
  Exam: x.Exam[0],
  ImageUrl: "/assets/images/temp/SSC-CGL2.jpeg",
}));

export async function getAllNews({
  page,
  query = "",
}: GetAllNewsParams): Promise<{ news: News[]; totalPages: number }> {
  const pageSize = 18;

  // Replace this with real DB or fetch logic
  const allNews: News[] = await data;

  const filtered = query
    ? allNews.filter((n) => n.Title.toLowerCase().includes(query.toLowerCase()))
    : allNews;

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return { news: paginated, totalPages };
}


// get single news by slug
export async function getNewsBySlug(slug: string) {
  return data.find(x => x.Slug === slug)
}

export async function getRecommendedNews(tags: string[], excludeId: number) {
  const lowerTags = tags.map((t) => t.toLowerCase());

  return data
    .filter((news) => {
      if (news.Id === excludeId || !news.Tags?.length) return false;

      return news.Tags.some((tag: { Name: string }) =>
        lowerTags.includes(tag.Name.toLowerCase())
      );
    })
    .slice(0, 6);
}