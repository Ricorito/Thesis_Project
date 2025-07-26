import { useState } from "react";
import CommunityCommentCard from "./CommunityCommentCard";

const REPLIES_STEP = 3;

const CommunityCommentTree = ({ comments, postId, onCommentsUpdated }) => {
  const repliesMap = comments.reduce((map, comment) => {
    const parentId = comment.parent_comment_id;
    if (parentId !== null) {
      if (!map[parentId]) map[parentId] = [];
      map[parentId].push(comment);
    }
    return map;
  }, {});

  const topLevelComments = comments.filter((c) => c.parent_comment_id === null);

  const [visibleRepliesCount, setVisibleRepliesCount] = useState({});

  const showMoreReplies = (commentId) => {
    setVisibleRepliesCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || REPLIES_STEP) + REPLIES_STEP,
    }));
  };

  const toggleRepliesVisibility = (parentId) => {
    setVisibleRepliesCount((prev) => {
      const allReplies = repliesMap[parentId] || [];
      const currentVisibleCount = prev[parentId];

      const isCurrentlyExpanded = currentVisibleCount === allReplies.length;

      return {
        ...prev,
        [parentId]: isCurrentlyExpanded ? 0 : allReplies.length,
      };
    });
  };

  const renderReplies = (parentId, currentDepth) => {
    const allRepliesForParent = repliesMap[parentId] || [];
    const currentVisibleCountForParent = visibleRepliesCount[parentId];

    const actualVisibleCount =
      currentVisibleCountForParent === 0 ? 0 : (currentVisibleCountForParent || REPLIES_STEP);

    const visibleReplies = allRepliesForParent.slice(0, actualVisibleCount);
    const hiddenCount = allRepliesForParent.length - actualVisibleCount;

    return (
      <>
        {visibleReplies.map((reply) => (
          <div key={reply.id} className={`ml-${(currentDepth + 1) * 4}`}>
            <CommunityCommentCard
              comment={reply}
              postId={postId}
              onCommentsUpdated={onCommentsUpdated}
              depth={currentDepth + 1}
              hasReplies={!!repliesMap[reply.id]?.length}
              areRepliesVisible={!!(visibleRepliesCount[reply.id] > 0)}
              onToggleReplies={() => toggleRepliesVisibility(reply.id)}
              onShowMoreReplies={() => showMoreReplies(reply.id)}
            />
            {visibleRepliesCount[reply.id] !== 0 && renderReplies(reply.id, currentDepth + 1)}
          </div>
        ))}

        {hiddenCount > 0 && (actualVisibleCount < allRepliesForParent.length) && (
          <button
            className={`ml-${(currentDepth + 1) * 4} mt-1 text-xs text-muted-foreground hover:underline`}
            onClick={() => showMoreReplies(parentId)}
          >
            + {hiddenCount} more
          </button>
        )}
      </>
    );
  };

  return (
    <div>
      {topLevelComments.length === 0 ? (
        <p className="text-muted-foreground text-sm">No comments yet. Be the first!</p>
      ) : (
        topLevelComments.map((comment) => {
          const topLevelReplies = repliesMap[comment.id] || [];
          const areTopLevelRepliesVisible = visibleRepliesCount[comment.id] !== 0;

          return (
            <div key={comment.id}>
              <CommunityCommentCard
                comment={comment}
                postId={postId}
                onCommentsUpdated={onCommentsUpdated}
                depth={0}
                hasReplies={!!topLevelReplies.length}
                areRepliesVisible={areTopLevelRepliesVisible}
                onToggleReplies={() => toggleRepliesVisibility(comment.id)}
                onShowMoreReplies={() => showMoreReplies(comment.id)}
              />
              {areTopLevelRepliesVisible && renderReplies(comment.id, 0)}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommunityCommentTree;