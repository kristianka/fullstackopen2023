const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let likes = 0;
    blogs.forEach(el => {
        likes += el.likes
        // console.log(`LIKES ${likes} ELLIKES ${el.likes}`)
    });
    return likes;
}

const favouriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(b => b.likes));
    const mostLikedBlog = blogs.find(b => b.likes === mostLikes);
    // console.log(`mostLikes ${mostLikes} mostLikedBlog ${JSON.stringify(mostLikedBlog, null, 2)}`);
    return mostLikedBlog;
}

const mostBlogs = (blogs) => {
    const counts = {};
    for (const { author } of blogs) {
        counts[author] = (counts[author] || 0) + 1;
    }
    console.log(counts);
    const [author, blogsCount] = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b);
    return { author, blogs: blogsCount };
}

const mostLikes = (blogs) => {
    const likesCount = {};
    for (const { author, likes } of blogs) {
        likesCount[author] = (likesCount[author] || 0) + likes;
    }
    const [author, totalLikes] = Object.entries(likesCount).reduce((a, b) => a[1] > b[1] ? a : b);
    return { author, likes: totalLikes };
};


export { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }