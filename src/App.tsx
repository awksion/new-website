import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Waitlist from './pages/Waitlist';
import ArtistPlaybook from './pages/ArtistPlaybook';
import VenueIntelligence from './pages/VenueIntelligence';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/artist-playbook" element={<ArtistPlaybook />} />
          <Route path="/venue-intelligence" element={<VenueIntelligence />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
