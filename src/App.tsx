import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { JobDetail } from './pages/JobDetail';
import { SubmitResume } from './pages/SubmitResume';
import { PaidService } from './pages/PaidService';
import { Fleet } from './pages/Fleet';
import { Contact } from './pages/Contact';
import { PostJob } from './pages/PostJob';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/submit-resume" element={<SubmitResume />} />
            <Route path="/paid-service" element={<PaidService />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
