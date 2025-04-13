import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMessageSquare, FiCornerDownLeft } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';

const ThreadDetail = () => {
    const { threads, getRelativeTime } = useContext(AppContext);
    const { threadId } = useParams();
    const [newReply, setNewReply] = useState('');

    const thread = threads.find((th) => th._id.toString() === threadId);

    // Handle case where thread is not found
    if (!thread) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center"
            >
                <div className="max-w-2xl text-center px-4">
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="mb-8 text-9xl text-emerald-600"
                    >
                        🌱
                    </motion.div>
                    <h1 className="text-4xl font-bold text-emerald-900 mb-4">
                        Thread Not Found
                    </h1>
                    <p className="text-lg text-emerald-700 mb-8">
                        The discussion you're looking for has either been removed or never existed.
                        Let's get you back to the community garden!
                    </p>
                    <Link
                        to="/community-forum"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-lg"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Return to Forum
                    </Link>
                </div>
            </motion.div>
        );
    }

    const handleReplySubmit = (e) => {
        e.preventDefault();
        // Add your reply submission logic here
        console.log('New reply:', newReply);
        setNewReply('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
        >
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Navigation Back */}
                <Link
                    to="/community-forum"
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    <span>Back to Forum</span>
                </Link>

                {/* Main Thread */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 mb-8"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <FiMessageSquare className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-emerald-900 mb-2">
                                {thread.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-emerald-600">
                                <span>Posted by {thread.author.userName}</span>
                                <span>•</span>
                                <span>{getRelativeTime(thread.updatedAt)}</span>
                                <span>•</span>
                                <span>{thread.comments.length === 1 ? 'reply' : 'replies'} </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-emerald-800 leading-relaxed mb-8">
                        {thread.content}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-8">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                            #{thread.category}
                        </span>
                    </div>
                </motion.div>

                {/* Replies Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <h2 className="text-xl font-semibold text-emerald-900 mb-6">
                        Replies ({thread.comments.length})
                    </h2>

                    {thread.comments.map((comment, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <FiMessageSquare className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-medium text-emerald-900">
                                            {comment.author.userName}
                                        </span>
                                        <span className="text-sm text-emerald-600">
                                            {comment.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-emerald-800">{comment.commentBody}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Reply Form */}
                <motion.form
                    onSubmit={handleReplySubmit}
                    className="mt-12 bg-white rounded-xl shadow-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4">
                        Post a Reply
                    </h3>
                    <textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg mb-4"
                        placeholder="Share your thoughts..."
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                        <FiCornerDownLeft className="w-5 h-5" />
                        Post Reply
                    </button>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default ThreadDetail;