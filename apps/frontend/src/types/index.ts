export interface Post {
  postId: number;
  title: string;
  content: string;
  visible: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  comments: Comment[];
}

export interface CreatePost {
  title: string;
  content: string;
  visible: boolean;
  authorId: string;
}

export interface User {
  authSchId: string;
  email: string;
  username: string;
}

export interface Comment {
  commentId: number;
  postId: number;
  authorId: string;
  content: string;
  createdAt: Date;
  user: User;
}
