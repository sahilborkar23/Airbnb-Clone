import React, { useState } from 'react';
import { differenceInDays } from 'date-fns';
import Header from './components/Header';
import Gallery from './components/Gallery';
import ListingDetails from './components/ListingDetails';
import ReviewsSection from './components/ReviewsSection';
import MapSection from './components/MapSection';
import StickyNav from './components/StickyNav';
import HostSection from './components/HostSection';
import ThingsToKnow from './components/ThingsToKnow';
import Footer from './components/Footer';
import MoreStays from './components/MoreStays';


function App() {
  const [dateRange, setDateRange] = useState();
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });

  const totalGuests = guests.adults + guests.children;
  const pricePerNight = totalGuests > 2 ? 17998 / 3 : 14998 / 3;
  
  let nights = 0;
  if (dateRange?.from && dateRange?.to) {
    nights = differenceInDays(dateRange.to, dateRange.from);
  }
  
  const totalPrice = Math.round(pricePerNight * nights);

  return (
    <div className="min-h-screen text-[#222222] pb-24 md:pb-0">
      <Header />
      <StickyNav nights={nights} pricePerNight={pricePerNight} totalPrice={totalPrice} />
      <main>
        <div id="photos"><Gallery /></div>
        <ListingDetails 
          dateRange={dateRange}
          setDateRange={setDateRange}
          guests={guests}
          setGuests={setGuests}
          nights={nights}
          pricePerNight={pricePerNight}
          totalPrice={totalPrice}
        />
        <div id="reviews"><ReviewsSection /></div>
        <div id="location"><MapSection /></div>
        <HostSection />
        <ThingsToKnow />
        <MoreStays />
      </main>
      <Footer />
    </div>
  );
}

export default App;
