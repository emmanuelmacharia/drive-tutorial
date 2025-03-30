export interface File {
    id: string
    name: string
    type: "file";
    url: string
    parent: string;
    size: string
  }

  export type Folder = {
    id: string
    name: string
    type: "folder"
    parent: string | null
  }

  export const mockFolders: Folder[] = [
    { id: "root", name: "My Drive", type: "folder", parent: null },
    { id: "1", name: "Documents", type: "folder", parent: 'root' },
    { id: "2", name: "Images", type: "folder", parent: 'root' },
    { id: "3", name: "Work", type: "folder", parent: 'root' },
    { id: "8", name: "Presentations", type: "folder", parent: "3" },
  ]
  
  export const mockFiles = [
    {
      name: 'Resume.pdf',
      size: 1258291,  // ~1.2 MB
      url: '/files/resume.pdf',
      parent: 1
    },
    {
      name: 'Project Proposal.docx',
      size: 2621440,  // ~2.5 MB
      url: '/files/proposal.docx',
      parent: 1
    },
    {
      name: 'Vacation.jpg',
      size: 3880181,  // ~3.7 MB
      url: '/files/vacation.jpg',
      parent: 2
    },
    {
      name: 'Profile Picture.png',
      size: 1887437,  // ~1.8 MB
      url: '/files/profile.png',
      parent: 1
    },
    {
      name: 'Q4 Report.pptx',
      size: 5452595,  // ~5.2 MB
      url: '/files/q4-report.pptx',
      parent: 2
    },
    {
      name: 'Budget.xlsx',
      size: 1572864,  // ~1.5 MB
      url: '/files/budget.xlsx',
      parent: 3
    }
  ];