import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchPosts, setSearchTerm, setCurrentPage } from '../features/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const { filteredPosts, searchTerm, currentPage, postsPerPage, status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handlePageClick = ({ selected }) => {
    dispatch(setCurrentPage(selected));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading posts.</div>;
  }

  const offset = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);
  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Posts List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
        className="block w-full max-w-lg mx-auto mb-6 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Posts */}
      {currentPosts.length === 0 && <div className="space-y-6">Data is not found</div>}
      <ul className="space-y-6">
        {currentPosts.map(post => (
          <li key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center mt-8 space-x-2'}
        pageClassName={'bg-gray-200 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white '}
        previousClassName={'bg-blue-500 text-white px-4 py-2 rounded-md'}
        nextClassName={'bg-blue-500 text-white px-4 py-2 rounded-md'}
        activeClassName={'bg-blue-500 text-white px-4 py-2 rounded-md'}
      />
    </div>
  );
};

export default PostsList;
