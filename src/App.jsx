import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="min-h-screen bg-gray-100 flex justify-center">
          <div className="w-9/12 p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Posts Application</h1>
            {/* Add Post Form */}
            <AddPostForm />

            {/* Posts List */}
            <PostsList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
