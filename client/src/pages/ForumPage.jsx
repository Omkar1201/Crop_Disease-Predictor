import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiPlus, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { TbPlant2, TbMessageCircle } from 'react-icons/tb';
import { Dialog } from '@headlessui/react';

const ForumPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: 'diseases'
    });

    // Mock data
    const categories = [
        { id: 'all', name: 'All', icon: <TbPlant2 />, color: 'bg-amber-100' },
        { id: 'diseases', name: 'Plant Diseases', icon: <TbPlant2 />, color: 'bg-red-100' },
        { id: 'gardening', name: 'Gardening Tips', icon: <TbPlant2 />, color: 'bg-green-100' },
        { id: 'tools', name: 'Tools & Equipment', icon: <TbPlant2 />, color: 'bg-blue-100' },
    ];

    const [threads, setThreads] = useState([
        {
            id: 1,
            title: 'Help! Yellow spots on tomato leaves',
            category: 'diseases',
            author: 'UrbanGardener23',
            replies: 15,
            views: 245,
            timestamp: '2h ago',
            trending: true
        },
        // Add more threads...
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your API call here
        const newThread = {
            id: threads.length + 1,
            ...newPost,
            author: 'Current User',
            replies: 0,
            views: 0,
            timestamp: 'Just now',
            trending: false
        };

        setThreads([newThread, ...threads]);
        setIsModalOpen(false);
        setNewPost({ title: '', content: '', category: 'diseases' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-emerald-50 to-white"
        >
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent mb-4"
                    >
                        Plant Community Forum
                    </motion.h1>
                    <p className="text-lg text-emerald-800/90">
                        Connect with growers worldwide 🌍 Share knowledge 🌿 Solve problems together
                    </p>
                </div>

                {/* Search and Create */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-4 text-emerald-600 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Search discussions..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-100 bg-white focus:ring-2 focus:ring-emerald-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                        <FiPlus className="w-5 h-5" />
                        New Discussion
                    </button>
                </div>

                {/* Categories */}
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-xl ${category.color} cursor-pointer transition-colors ${activeCategory === category.id ? 'ring-2 ring-emerald-500' : ''
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-lg">{category.icon}</div>
                                <h3 className="text-xl font-semibold text-emerald-900">{category.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Discussion List */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-emerald-50 text-emerald-700 font-medium">
                        <div className="col-span-6">Discussion</div>
                        <div className="col-span-2">Replies</div>
                        <div className="col-span-2">Views</div>
                        <div className="col-span-2">Latest</div>
                    </div>

                    {/* Threads */}
                    <AnimatePresence>
                        {threads.map((thread) => (
                            <motion.div
                                key={thread.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="border-b border-emerald-100 last:border-0 hover:bg-emerald-50/50 transition-colors"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center">
                                    <div className="col-span-6 flex items-center gap-4">
                                        <div className="p-2 bg-emerald-100 rounded-lg">
                                            <TbMessageCircle className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-emerald-900">{thread.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                {thread.trending && (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                                                        <FiTrendingUp className="w-4 h-4" />
                                                        Trending
                                                    </span>
                                                )}
                                                <span className="text-sm text-emerald-600">{thread.author}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-emerald-700">{thread.replies}</div>
                                    <div className="col-span-2 text-emerald-700">{thread.views}</div>
                                    <div className="col-span-2 text-sm text-emerald-600">{thread.timestamp}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* New Discussion Modal */}
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className="relative z-50"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl p-8">
                            <Dialog.Title className="text-2xl font-bold text-emerald-900 mb-6">
                                Start New Discussion
                            </Dialog.Title>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-emerald-700 mb-2">
                                        Content
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                                    >
                                        Create Post
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </motion.div>
    );
};

export default ForumPage;