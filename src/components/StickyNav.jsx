import React, { useState, useEffect } from 'react';

const StickyNav = ({ nights = 0, pricePerNight = 4999, totalPrice = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px (approx past header/gallery start)
      setIsVisible(window.scrollY > 500);

      // Determine active section
      const sections = ['photos', 'amenities', 'reviews', 'location'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above or near the top of the viewport
          if (rect.top <= 120) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY > 500) {
        setActiveSection('photos');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80; // Offset for nav height
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'photos', label: 'Photos' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' }
  ];

  return (
    <>
      <div className="hidden md:block fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ease-in-out transform translate-y-0">
        <div className="max-w-[1280px] mx-auto px-5 md:px-20 flex items-center justify-between h-20">
        {/* Left Side: Links */}
        <div className="flex items-center gap-6 h-full">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-semibold text-[14px] hover:text-black transition-colors relative flex items-center h-full cursor-pointer ${
                activeSection === item.id 
                  ? 'text-[#222222]' 
                  : 'text-[#717171]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#222222] rounded-t-sm" />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: Reserve Widget */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="text-[16px] text-[#222222]">
              {nights > 0 ? (
                <>
                  <span className="font-semibold">₹{totalPrice.toLocaleString('en-IN')}</span> <span className="font-normal text-[14px]">for {nights} night{nights !== 1 ? 's' : ''}</span>
                </>
              ) : (
                <>
                  <span className="font-semibold">₹{Math.round(pricePerNight).toLocaleString('en-IN')}</span> <span className="font-normal text-[14px]">night</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-[#222222]">
              <span className="text-[10px]">★</span>
              <span>4.95</span>
              <span className="text-[#717171]">&middot;</span>
              <span className="text-[#717171] underline cursor-pointer hover:text-[#222222]">19 reviews</span>
            </div>
          </div>
          <button className="bg-[#E61E4D] hover:bg-[#D70466] text-white font-semibold text-[16px] px-6 py-2.5 rounded-lg transition-colors cursor-pointer active:scale-95">
            Reserve
          </button>
        </div>
      </div>
      </div>
      
      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-[100]">
        <div className="flex flex-col">
            <div className="text-[15px] text-[#222222]">
              {nights > 0 ? (
                <>
                  <span className="font-semibold text-[16px]">₹{totalPrice.toLocaleString('en-IN')}</span> <span className="font-normal text-[14px]">for {nights} night{nights !== 1 ? 's' : ''}</span>
                </>
              ) : (
                <>
                  <span className="font-semibold text-[16px]">₹{Math.round(pricePerNight).toLocaleString('en-IN')}</span> <span className="font-normal text-[14px]">night</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-[13px] font-medium text-[#222222]">
              <span className="text-[#717171] underline cursor-pointer hover:text-[#222222]">Oct 2 - 7</span>
            </div>
        </div>
        <button className="bg-[#E61E4D] hover:bg-[#D70466] text-white font-semibold text-[16px] px-8 py-3 rounded-lg transition-colors cursor-pointer active:scale-95">
          Reserve
        </button>
      </div>
    </>
  );
};

export default StickyNav;
