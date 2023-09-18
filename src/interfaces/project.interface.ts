interface imagePack {
  desktopImage?: string;
  mobileImage?: string;
}

export interface IProject {
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;

  images: imagePack[];
  type: string;
  mobile?: boolean;
}
