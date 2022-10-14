import {useAppSelector} from '../../hooks';

import CommentForm from '../comment-form/comment-form';
import CommentFormEmpty from '../comment-form-empty/comment-form-empty';
import CommentList from '../comment-list/comment-list';
import CommentListEmpty from '../comment-list-empty/comment-list-empty';

import {isAuthorization} from '../../util';
import {Comments} from '../../types/comment';
import {User} from '../../types/user';

import {getAuthorizationStatus} from '../../store/user-data/selectors';

type CommentsProps = {
  commentItems: Comments,
  user: User,
  ticketId: string,
}

function CommentsBlock({commentItems, user, ticketId}: CommentsProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <div className="ticket__comments">
      <h2 className="ticket__subtitle">Коментарии</h2>
      <div className="ticket__comment-form">
        {
          (isAuthorization(authorizationStatus))
            ?
            <CommentForm
              user={user}
              ticketId={ticketId}
            />
            : <CommentFormEmpty />
        }
      </div>
      <div className="ticket__comments-list">
        {
          (commentItems && commentItems.length > 0)
            ? <CommentList comments={commentItems} />
            : <CommentListEmpty/>
        }
      </div>
    </div>
  );
}

export default CommentsBlock;

