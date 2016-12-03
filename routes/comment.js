"use strict";
/*
 Created by Qingzheng on 2016/12/01
 Name: Qingzheng Liu
 */
const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comment;
// router get 顺序？



// get-1: Return all the comments
router.get("/", (req, res) => {
    commentData.getAllComments().then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
         res.json(commentList);
    }, () => {
        res.sendStatus(500);
    });
});

// get-2: Return the comment information of the given comment name.
router.get("/:name", (req, res) => {
    commentData.getCommentByName(req.params.name).then((comment) => {
        //res.render('comment/commentList', { list: commentList });
         res.json(comment);
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});

// get-3: Return the comment information of the given comment id.
router.get("/id/:id", (req, res) => {
    commentData.getCommentById(req.params.id).then((comment) => {
        //res.render('comment/commentInfo', { comment: comment });
         res.json(comment);
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});

// get-4: Return all the comment information of the given user id
router.get("/userId/:userId", (req, res) => {
    commentData.getCommentByUserId(req.params.userId).then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
         res.json(commentList);
    }, (error) => {
        res.sendStatus(404);
    });
});

// get-5: Return all the comment information of the given blog id
router.get("/blogId/:blogId", (req, res) => {

    commentData.getCommentByBlogId(req.params.blogId).then((commentList) => {
        //res.render('comment/commentList', { list: commentList });
        console.log(commentList)
        res.json(commentList);
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});

// post-1: Add a comment(at least provide a comment content ).
router.post("/", (req, res) => {
    let commentInfo = req.body;

    if (!commentInfo) {
        res.status(400).json({ error: "You must provide data to create a new comment." });
        return;
    }
    if (!commentInfo.content) {
        res.status(400).json({ error: "You must at least provide content of the comment." });
        return;
    }
    commentData.addComment(commentInfo.content, commentInfo.createTime, commentInfo.stars, commentInfo.userId, commentInfo.target, commentInfo.blogId, commentInfo.siteId, commentInfo.cityId)
        .then((newComment) => {
            res.json(newComment);
        }, () => {
            res.sendStatus(500);
        });
});

// put-1: Update comment with the given comment id.
router.put("/:id", (req, res) => {
    let commentInfo = req.body;

    if (!commentInfo) {
        res.status(400).json({ error: "You must provide data to update a comment." });
        return;
    }
    let getComment = commentData.getCommentById(req.params.id).then(() => {
        return commentData.updateComment(req.params.id, commentInfo)
            .then((updatedComment) => {
                res.json(updatedComment);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });

});


// delete-1: Delete comment with the given comment id.
router.delete("/:id", (req, res) => {
    let comment = commentData.getCommentById(req.params.id).then(() => {
        return commentData.removeComment(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});

// delete-2: Delete stars of comment with the given comment id.
router.delete("/stars/:id", (req, res) => {
    let starsInfo = req.body.stars;

    if (!starsInfo) {
        res.status(400).json({ error: "You must provide star to delete." });
        return;
    }
    let comment = commentData.getCommentById(req.params.id).then(() => {
        return commentData.removeCommentStars(req.params.id, stars)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "comment not found." });
    });
});

module.exports = router;