import { Comment } from '@/types';

interface Props {
  userComments: Comment[];
}

export default function AccountComments({ userComments }: Props) {
  return (
    <div>
      {userComments.map((comment: Comment) => (
        <div key={comment.commentId}>
          <h1>{comment.commentId}</h1>
          <p>{comment.content}</p>
          <p>{comment.author.username}</p>
        </div>
      ))}
    </div>
  );
}
