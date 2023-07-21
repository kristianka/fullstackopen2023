
import { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes } from "../src/utils/list_helper"

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test("dummy returns 1", () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe("total likes", () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test("total likes of the whole blog array", () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe("most liked", () => {
    test("returns blog object that has the most likes", () => {
        const result = favouriteBlog(blogs);
        expect(result).toEqual(blogs[2])
    })
})

describe("most blogs", () => {
    test("returns object that contains author name and amount of blogs", () => {
        const correctAnswerObj = {
            author: "Robert C. Martin",
            blogs: 3
        }
        const result = mostBlogs(blogs);
        expect(result).toEqual(correctAnswerObj);
    })
})

describe("most liked blog's author", () => {
    test("returns object that contains author name and amount of likes", () => {
        const correctAnswerObj = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        const result = mostLikes(blogs);
        expect(result).toEqual(correctAnswerObj);
    })
})