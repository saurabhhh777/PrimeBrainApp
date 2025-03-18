import React from "react";

const Blog = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      description:
        "Learn the basics of React and how to build your first application.",
      date: "October 10, 2023",
      author: "John Doe",
      tags: ["React", "JavaScript", "Frontend"],
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      description:
        "A comprehensive guide to using Tailwind CSS for modern web development.",
      date: "October 15, 2023",
      author: "Jane Smith",
      tags: ["Tailwind CSS", "CSS", "Frontend"],
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      title: "Introduction to Node.js",
      description:
        "Understand the fundamentals of Node.js and how to build scalable backend applications.",
      date: "October 20, 2023",
      author: "Alice Johnson",
      tags: ["Node.js", "JavaScript", "Backend"],
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              {/* Blog Content */}
              <div className="p-6">
                {/* Blog Title */}
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

                {/* Blog Description */}
                <p className="text-gray-600 mb-4">{blog.description}</p>

                {/* Blog Metadata */}
                <div className="text-sm text-gray-500 mb-4">
                  <span>By {blog.author}</span> | <span>{blog.date}</span>
                </div>

                {/* Blog Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;