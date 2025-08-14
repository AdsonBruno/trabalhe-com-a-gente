export interface Repository {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  starCount: number;
  forksCount: number;
  updatedAt: string;
  ownerLogin: string;
  ownerAvatarUrl: string;
  topics: string[];
}
