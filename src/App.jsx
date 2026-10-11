import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './errorBoundary';
import { Home } from './home';
import { PostDetail } from './postDetail';
// import NotFound from './NotFound';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
      </ErrorBoundary>    
    </BrowserRouter>
  );
}
export default App
