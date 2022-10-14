import {Comments} from '../../types/comment';

type CommentListProps = {
  comments: Comments
}

function CommentList ({comments}: CommentListProps) {
  return (
    <ul className="comments-list">
      {
        comments.map((comment, index) => {
          const keyValue = `${index}-${comment.id}`;
          return (
            <li key={keyValue}>
              <div className="comment-card">
                <div className="comment-card__header">
                  <div className="comment-card__avatar avatar--no-hover">
                    <img
                      src={comment.user.avatar}
                      alt={`Аватар пользователя ${comment.user.name} ${comment.user.surname}`}
                    />
                  </div>
                  <p className="comment-card__author">
                    {`${comment.user.name} ${comment.user.surname}`}
                  </p>
                </div>
                <div className="comment-card__content">
                  <p>
                    {comment.text}
                  </p>
                </div>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}

export default CommentList;
