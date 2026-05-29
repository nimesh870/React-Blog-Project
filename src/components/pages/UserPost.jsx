import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '../Button'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite_services/database";
import Container from "../container/Container";

// fetches the post posted by user and shows edit and delete button
export default function UserPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        // delete post, if successful -> status = true
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredImage); // remove image from storage
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 min-h-screen bg-slate-50">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border
                 border-slate-200 rounded-2xl p-2 shadow-sm overflow-hidden">
                    <img
                        src={databaseService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full max-w-125 object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-emerald-500 hover:bg-emerald-600" className="mr-3 cursor-pointer shadow-md">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-600" className="cursor-pointer shadow-md" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 pb-6 border-b border-slate-400">
                    <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
                    <p className="text-md font-medium text-slate-700 leading-tight mt-1">By {post.authorName}</p>
                </div>
                <div className="browser-css prose prose-slate max-w-none
                            text-slate-700 leading-relaxed">
                    {parse(post.content)} {/* Parsing Html string from TinyMce editor to React Component */}
                    </div>
            </Container>
        </div>
    ) : null;
}