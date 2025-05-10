export interface Post {
  postId: number;
  title: string;
  content: string;
  visible: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  userId: string;
  email: string;
  username: string;
}
