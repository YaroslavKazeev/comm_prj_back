const postModel = require('../model/postModel')
const commentModel = require('../model/commentModel')

const getStartPage = (req, res) => {
    postModel.find()
        .populate('owner')
        .sort({creat_at: '-1'})

        .then(allPosts => {


            res.send({
                    error: null,
                    allPosts: allPosts
                }
            )
        })
        .catch(err => {
            console.log(err);
        })
}

const deleteQuestion = (req, res) => {
    postModel.findByIdAndDelete(req.params.id)
        .then(res.send(''))
        .catch(err => console.log(err))
}


const getEditPage = (req, res) => {

    postModel.findById(req.params.id)
        .then(result => res.send({post: result}))
        .catch(err => (console.log(err)))
}

const postEdited = (req, res) => {
    postModel.findByIdAndUpdate({_id: req.params.id})
        .then(result => {
            result.title = req.body.title
            result.desc = req.body.desc
            result.save()
                .then(() =>
                    res.send(`/edit_page/${req.params.id}`))
                .catch(err => console.log(err))
        })
}

const addNewQuestion = (req, res) => {
    let postObj = {
        ...req.body,
        owner: req.params.id
    };

    let newPost = new postModel(postObj);
    newPost.save()
        .then(result => {
            res.send(result)
        }).catch(err =>
        console.log(err)
    )


}

const getFullPage = (req, res) => {
    postModel.findById(req.params.id)
        .then(result => {

            commentModel.find()
                .populate('owner')
                .populate('fromPost')
                .then(comments => {

                    res.send( {posts: result,
                        comments: comments});
                })
                .catch(err => {
                    console.log(err);

                });
        })
        .catch(err => {
            console.log(err);
           ;
        });
};


const addComment = (req, res) => {

    const postId = req.params.postId;
    const ownerId = req.params.ownerId;
    let postObj = {
        ...req.body,
        owner: ownerId,
        fromPost: postId,
    };


    let newComment = new commentModel(postObj);
    newComment.save()
        .then(() => {
            res.send(`/question/${req.body.postId}`)
        }).catch(err =>
        console.log(error)
    )


}

const deleteComment = (req, res) => {

    commentModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(`/fullPage/${req.body.postId}`);
        }).catch((err) => {
        console.log(err);
    });
};


const logOut = (req, res) => {
    res.clearCookie('userToken');
    res.render('startPage', {error: ''})
}


module.exports = {
    getStartPage,
    addNewQuestion,
    getMainPage,
    getEditPage,
    postEdited,
    deleteQuestion,
    getFullPage,
    addComment,
    deleteComment


}
