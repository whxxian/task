export interface Project {
  id: number;
  name: string;
  personId: number | undefined;
  pin: boolean; // 收藏
  organization: string;
  created: number;
}
