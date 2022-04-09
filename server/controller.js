
// Temporary until we have a proper database
// Post object format: { id: Int, caption: String, content: String, date: Date }
const fs = require("fs");
const db = JSON.parse(fs.readFileSync("./db.json", "utf8"));

const getPosts = (req, res) => {
    // Authorize the user
    
    const posts = db.posts;
    res.status(200).send(posts);
};

const createPost = (req, res) => {
    // Authorize the user
    
    const { caption, content } = req.body;
    const newPost = {
        id: db.posts.length + 1,
        caption,
        content,
        date: Date.now() // Maybe named created/createdAt instead?
    };

    db.posts.push(newPost);
    fs.writeFile("./db.json", JSON.stringify(db), error => {
        if (error) {
            console.log(error);
            res.status(500).send("error saving to database");
        }
    });

    res.status(201).send(newPost);
};

const deletePost = (req, res) => {
    // Authorize the user

    const { id } = req.params;
    const postIndex = db.posts.findIndex(post => post.id === +id);
    if (postIndex === -1) {
        res.status(404).send("Post not found");
    } else {
        db.posts.splice(postIndex, 1);
        fs.writeFile("./db.json", JSON.stringify(db), error => {
            if (error) {
                console.log(error);
                res.status(500).send("error saving to database");
            }
        });

        res.status(204).send();
    }
};

module.exports = {
    getPosts,
    createPost,
    deletePost
};