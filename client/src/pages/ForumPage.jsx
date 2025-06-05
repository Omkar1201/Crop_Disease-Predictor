import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FiPlus, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { TbPlant2, TbMessageCircle } from 'react-icons/tb';
import { Dialog } from '@headlessui/react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForumPage = () => {
    const { threads, setThreads, getRelativeTime } = useContext(AppContext)

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: 'diseases'
    });

    // Categories with 'all' option
    const categories = [
        { id: 'all', name: 'All Topics', icon: <TbPlant2 />, color: 'bg-emerald-100' },
        { id: 'diseases', name: 'Plant Diseases', icon: <TbPlant2 />, color: 'bg-red-100' },
        { id: 'gardening', name: 'Gardening Tips', icon: <TbPlant2 />, color: 'bg-green-100' },
        { id: 'tools', name: 'Tools & Equipment', icon: <TbPlant2 />, color: 'bg-blue-100' },
    ];

    // Filter threads based on active category and search
    const filteredThreads = threads.filter(thread => {
        const matchesCategory = activeCategory === 'all' || thread.category === activeCategory;
        const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || thread.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const responseData = await axios.post(`${import.meta.env.VITE_BASE_URL_NODE}/api/v1/createpost`,
                { formData: newPost },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            const newThread = responseData.data?.responseData

            setThreads([newThread, ...threads]);
            setIsModalOpen(false);
            setNewPost({ title: '', content: '', category: 'diseases' });
            toast.success(responseData.data?.message)
        }
        catch (error) {
            console.log(error);
            toast.error(error.response?.data.message)
        }
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
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                        <FiPlus className="w-5 h-5" />
                        New Discussion
                    </button>
                </div>

                {/* Categories */}
                <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-xl ${category.color} cursor-pointer transition-all duration-300 ${activeCategory === category.id ? 'ring-2 ring-emerald-500 scale-[1.02]' : ''
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

                    {/* Filtered Threads */}
                    <AnimatePresence>
                        {filteredThreads.map((thread, index) => (
                            <motion.div
                                key={index}
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
                                            <Link to={`/community-forum/thread/${thread._id}`} className="hover:text-emerald-600">
                                                {thread.title}
                                            </Link>
                                            {/* <h3 className="font-medium text-emerald-900">{thread.title}</h3> */}
                                            <div className="flex items-center gap-2 mt-2">
                                                {thread.views >= 10 && (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                                                        <FiTrendingUp className="w-4 h-4" />
                                                        Trending
                                                    </span>
                                                )}
                                                <span className="text-sm text-emerald-600">{thread.author?.userName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-emerald-700">{thread.comments.length}</div>
                                    <div className="col-span-2 text-emerald-700">{thread.views}</div>
                                    <div className="col-span-2 text-sm text-emerald-600">{getRelativeTime(thread.createdAt)}</div>
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
                                        {categories.slice(1).map((cat) => (
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
                                        className="px-6 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
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