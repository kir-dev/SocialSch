export interface Post {
  postId: string;
  title: string;
  content: string;
  visible: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
