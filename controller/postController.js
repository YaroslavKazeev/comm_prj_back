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
        .then(()=> {
            res.send('/')
        })
        .catch(err =>{ console.log(err)});
}


const getEditPage = (req, res) => {

    postModel.findById(req.params.id)
        .then(result => res.send({posts: result}))
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

                    res.send({
                        posts: result,
                        comments: comments
                    });
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


    const txt = req.body.txt
    const postId = req.params.id;
    const ownerId = req.body.user;
    const userName = req.body.userName;
    let postObj = {
        userName: userName,
        owner: ownerId,
        fromPost: postId,
        comment: txt
    };


    let newComment = new commentModel(postObj);
    newComment.save()
        .then(() => {
            res.send(`/fullPage/${postId}`)
        }).catch(err =>
        console.log(err)
    )


}

const deleteComment = (req, res) => {

    commentModel.findByIdAndDelete(req.params.id)

        .populate('fromPost')
                .then(result => {
                    console.log(result.fromPost._id)

                    res.send(`/fullPage/${result.fromPost._id}`)


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

    getEditPage,
    postEdited,
    deleteQuestion,
    getFullPage,
    addComment,
    deleteComment


}
