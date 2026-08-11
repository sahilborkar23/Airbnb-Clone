import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import data from '../assets/data.json';

const photoModules = import.meta.glob('../assets/photos/*.jpeg', { eager: true });

const getPhotosForPrefix = (prefix) => {
  return Object.keys(photoModules)
    .filter(path => {
       const filename = path.split('/').pop().toLowerCase();
       return filename.startsWith(prefix) || 
              (prefix === 'gym' && filename.startsWith('hym')) ||
              (prefix === 'additional' && filename.startsWith('addtional'));
    })
    .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}))
    .map(path => photoModules[path].default);
};

const photoSections = [
  { id: 'living1', title: 'Living room 1', subtitle: 'Sofa · Air conditioning · Ceiling fan · TV', photos: getPhotosForPrefix('living_room1') },
  { id: 'living2', title: 'Living room 2', subtitle: '', photos: getPhotosForPrefix('living_room2') },
  { id: 'kitchen', title: 'Full kitchen', subtitle: '', photos: getPhotosForPrefix('kitchen') },
  { id: 'bedroom', title: 'Bedroom', subtitle: '1 king bed', photos: getPhotosForPrefix('bedroom') },
  { id: 'bathroom', title: 'Full bathroom', subtitle: '', photos: getPhotosForPrefix('bathroom') },
  { id: 'gym', title: 'Gym', subtitle: '', photos: getPhotosForPrefix('gym') },
  { id: 'exterior', title: 'Exterior', subtitle: '', photos: getPhotosForPrefix('exterior') },
  { id: 'pool', title: 'Pool', subtitle: '', photos: getPhotosForPrefix('pool') },
  { id: 'additional', title: 'Additional photos', subtitle: '', photos: getPhotosForPrefix('additional') }
];

const allPhotosFlat = photoSections.flatMap(s => s.photos.map(url => ({ url, title: s.title })));

import image1 from '../assets/image-1.jpeg';
import image2 from '../assets/image-2.jpeg';
import image3 from '../assets/image-3.jpeg';
import image4 from '../assets/image-4.jpeg';
import image5 from '../assets/image-5.jpeg';

const Gallery = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentSliderIndex, setCurrentSliderIndex] = useState(null);

  useEffect(() => {
    let timer;
    if (toastMessage) {
      timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (showAllPhotos || currentSliderIndex !== null) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.paddingRight = '0px';
      document.body.style.overflow = 'unset'; 
    };
  }, [showAllPhotos, currentSliderIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentSliderIndex === null) return;
      if (e.key === 'ArrowRight' && currentSliderIndex < allPhotosFlat.length - 1) {
        setCurrentSliderIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSliderIndex > 0) {
        setCurrentSliderIndex(prev => prev - 1);
      } else if (e.key === 'Escape') {
        setCurrentSliderIndex(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSliderIndex]);

  const toggleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    setToastMessage(newState ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  const handleShare = () => {
    setToastMessage('Share options');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-20 pt-6 md:pt-8 pb-2">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-[26px] font-semibold text-[#222222]">
          {data.title}
        </h1>
        <div className="flex items-center text-sm font-medium underline">
          <button onClick={handleShare} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
            <Share size={16} />
            <span>Share</span>
          </button>
          <button onClick={toggleSave} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
            <Heart size={16} className={isSaved ? "fill-[#FF385C] text-[#FF385C]" : ""} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-[250px] sm:h-[300px] md:h-[465px] gap-2 md:rounded-xl overflow-hidden relative group -mx-5 md:mx-0">
        {/* Main large image */}
        <div className="w-full md:w-1/2 h-full cursor-pointer relative overflow-hidden" onClick={() => setCurrentSliderIndex(0)}>
          <img 
            src={image1} 
            alt="Main" 
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none z-10" />
        </div>

        {/* Right side 2x2 grid */}
        <div className="hidden md:grid w-1/2 h-full grid-cols-2 grid-rows-2 gap-2 relative">
          <div className="w-full h-full cursor-pointer overflow-hidden relative" onClick={() => setCurrentSliderIndex(1)}>
            <img src={image2} alt="Sub 1" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
          <div className="w-full h-full cursor-pointer overflow-hidden relative" onClick={() => setCurrentSliderIndex(2)}>
            <img src={image3} alt="Sub 2" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
          <div className="w-full h-full cursor-pointer overflow-hidden relative" onClick={() => setCurrentSliderIndex(3)}>
            <img src={image4} alt="Sub 3" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
          <div className="w-full h-full cursor-pointer overflow-hidden relative" onClick={() => setCurrentSliderIndex(4)}>
            <img src={image5} alt="Sub 4" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        </div>

        <button 
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-6 right-6 bg-white border border-black text-black px-4 py-1.5 rounded-lg text-sm font-medium shadow-md hover:bg-gray-50 transition z-20 flex items-center gap-2 cursor-pointer"
        >
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '16px', width: '16px', fill: 'currentcolor'}}><path d="M3 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3zm0 1.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5z"></path><circle cx="6" cy="6" r="1.5"></circle><circle cx="10" cy="6" r="1.5"></circle><circle cx="6" cy="10" r="1.5"></circle><circle cx="10" cy="10" r="1.5"></circle></svg>
          Show all photos
        </button>
      </div>

      {/* Toast Notification Popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-12 left-1/2 bg-[#222222] text-white px-5 py-3 rounded-xl shadow-lg z-[999] text-[14px] font-medium"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show All Photos Modal */}
      <AnimatePresence>
        {showAllPhotos && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-transparent shrink-0">
              <button 
                onClick={() => setShowAllPhotos(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="text-[16px] font-semibold text-[#222222]">Photo tour</div>
              <div className="flex gap-4">
                <button onClick={handleShare} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer text-[14px] font-medium underline">
                  <Share size={16} />
                  Share
                </button>
                <button onClick={toggleSave} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer text-[14px] font-medium underline">
                  <Heart size={16} className={isSaved ? "fill-[#FF385C] text-[#FF385C]" : ""} />
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Scrollable Container (Thumbnails + Grid) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
              {/* Category Thumbnails */}
              <div className="px-6 md:px-10 py-8 w-full max-w-[1280px] mx-auto shrink-0 border-b border-gray-200 mb-8">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 gap-y-6">
                  {photoSections.map((section, idx) => {
                  const thumbUrl = section.photos[0];
                  if (!thumbUrl) return null;
                    return (
                      <div 
                        key={idx} 
                        onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="flex flex-col gap-2 cursor-pointer group"
                      >
                        <div className="w-full aspect-square rounded-xl overflow-hidden relative border border-gray-200">
                          <img src={thumbUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <span className="text-[14px] text-[#717171] group-hover:text-[#222222] transition-colors truncate">{section.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Body / Sections Grid */}
              <div className="px-6 md:px-10 lg:px-40 pb-20 w-full">
                <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
                {photoSections.map((section, idx) => {
                  const sectionPhotos = section.photos;
                  if (sectionPhotos.length === 0) return null;

                  return (
                    <div key={idx} id={section.id} className="flex flex-col md:flex-row gap-8 md:gap-16">
                      <div className="w-full md:w-[35%] flex-shrink-0">
                        <div className="sticky top-8">
                          <h2 className="text-[24px] md:text-[30px] font-semibold text-[#222222] tracking-tight">{section.title}</h2>
                          {section.subtitle && <p className="text-[15px] text-[#717171] mt-2">{section.subtitle}</p>}
                        </div>
                      </div>
                      <div className="w-full md:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sectionPhotos.map((url, i) => (
                          <div key={i} className={`w-full overflow-hidden rounded-2xl ${(sectionPhotos.length === 2 || i === 0) ? "md:col-span-2" : "col-span-1"}`}>
                            <img 
                              src={url} 
                              alt={`${section.title} photo ${i + 1}`} 
                              onClick={() => {
                                const flatIndex = allPhotosFlat.findIndex(p => p.url === url);
                                setCurrentSliderIndex(flatIndex);
                              }}
                              className="w-full h-auto object-cover hover:brightness-95 transition-all cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Slider Modal */}
      <AnimatePresence>
        {currentSliderIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[2000] bg-white flex flex-col"
          >
            {/* Slider Header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <button 
                onClick={() => setCurrentSliderIndex(null)}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer text-[14px] font-medium"
              >
                <X size={16} />
                Close
              </button>
              <div className="flex flex-col items-center">
                <span className="text-[16px] font-semibold text-[#222222]">{allPhotosFlat[currentSliderIndex]?.title}</span>
                <span className="text-[14px] text-[#717171]">{currentSliderIndex + 1} of {allPhotosFlat.length}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={handleShare} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
                  <Share size={16} />
                </button>
                <button onClick={toggleSave} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition cursor-pointer">
                  <Heart size={16} className={isSaved ? "fill-[#FF385C] text-[#FF385C]" : ""} />
                </button>
              </div>
            </div>

            {/* Slider Body */}
            <div className="flex-1 flex items-center justify-center relative px-4 md:px-20 pb-10 overflow-hidden">
               {/* Left Arrow */}
               {currentSliderIndex > 0 && (
                 <button 
                   onClick={() => setCurrentSliderIndex(prev => prev - 1)}
                   className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:scale-105 hover:shadow-md transition z-10 cursor-pointer"
                 >
                   <ChevronLeft size={24} />
                 </button>
               )}
               
               {/* Image */}
               <motion.img 
                 key={currentSliderIndex}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.3 }}
                 src={allPhotosFlat[currentSliderIndex]?.url} 
                 className="max-h-full max-w-full object-contain rounded-xl select-none"
               />

               {/* Right Arrow */}
               {currentSliderIndex < allPhotosFlat.length - 1 && (
                 <button 
                   onClick={() => setCurrentSliderIndex(prev => prev + 1)}
                   className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm hover:scale-105 hover:shadow-md transition z-10 cursor-pointer"
                 >
                   <ChevronRight size={24} />
                 </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
