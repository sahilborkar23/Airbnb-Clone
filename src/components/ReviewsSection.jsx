import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronRight, ChevronLeft, Search, SprayCan, CheckCircle2, Key, MessageSquare, Map, Tag } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    name: "Shubhaw",
    yearsOnAirbnb: "8 years on Airbnb",
    date: "1 week ago",
    rating: 5,
    text: "It was a very pleasant stay for us. The place is exactly how it looks in photos and the highlight was the Jacuzzi area. Everything is of good quality and well maintained. I loved that the host was so attentive to our needs. Would definitely visit again.",
    img: "https://a0.muscache.com/im/pictures/user/cf4011e5-6251-457f-8b63-3c8ce6ef0344.jpg?im_w=120"
  },
  {
    id: 2,
    name: "Jyoti",
    yearsOnAirbnb: "2 years on Airbnb",
    date: "2 weeks ago",
    rating: 5,
    text: "Good place to stay, a nice cosy place for couples",
    img: "https://a0.muscache.com/im/pictures/user/User/original/afe64dc8-8e02-449b-a207-6c554de1a2b5.jpeg?im_w=120"
  },
  {
    id: 3,
    name: "Amit",
    yearsOnAirbnb: "3 months on Airbnb",
    date: "June 2026",
    rating: 5,
    text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    initial: "A",
    color: "bg-[#FFD4B2]"
  },
  {
    id: 4,
    name: "Aheesh",
    yearsOnAirbnb: "3 years on Airbnb",
    date: "June 2026",
    rating: 5,
    text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We highly recommend this place for anyone visiting Goa!",
    img: "https://a0.muscache.com/im/pictures/user/User/original/890b8e96-9a3f-40e7-bb41-5ae17db1344d.jpeg?im_w=120"
  },
  {
    id: 5,
    name: "Samiksha",
    yearsOnAirbnb: "9 months on Airbnb",
    date: "May 2026",
    rating: 5,
    text: "the host nitish was really great help",
    img: "https://a0.muscache.com/im/pictures/user/User/original/feaa268c-2b07-4217-826e-3cb6dbece4c2.jpeg?im_w=120"
  },
  {
    id: 6,
    name: "Vedant",
    yearsOnAirbnb: "4 years on Airbnb",
    date: "May 2026",
    rating: 5,
    text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The amenities were top notch and the location was perfect.",
    initial: "V",
    color: "bg-[#E6E6FF]"
  }
];

const categoryRatings = [
  { name: "Cleanliness", rating: "5.0", icon: <SprayCan size={32} strokeWidth={1} className="text-[#222222]"/> },
  { name: "Accuracy", rating: "5.0", icon: <CheckCircle2 size={32} strokeWidth={1} className="text-[#222222]"/> },
  { name: "Check-in", rating: "5.0", icon: <Key size={32} strokeWidth={1} className="text-[#222222]"/> },
  { name: "Communication", rating: "5.0", icon: <MessageSquare size={32} strokeWidth={1} className="text-[#222222]"/> },
  { name: "Location", rating: "4.8", icon: <Map size={32} strokeWidth={1} className="text-[#222222]"/> },
  { name: "Value", rating: "4.8", icon: <Tag size={32} strokeWidth={1} className="text-[#222222]"/> }
];

const tags = [
  { icon: "🪣", text: "Condition", count: 5 },
  { icon: "🪵", text: "Hot tub", count: 6 },
  { icon: "✅", text: "Accuracy", count: 6 },
  { icon: "🛋️", text: "Comfort", count: 6 },
  { icon: "🎁", text: "Hospitality", count: 9 },
  { icon: "🖼️", text: "Decor", count: 3 },
  { icon: "🛍️", text: "Cleanliness", count: 4 },
  { icon: "🧼", text: "Amenities", count: 2 },
  { icon: "🚆", text: "Getting around", count: 2 },
  { icon: "🪑", text: "Indoor spaces", count: 2 }
];

const ReviewsSection = () => {
  const scrollRef = useRef(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (id) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftChevron(scrollLeft > 0);
      setShowRightChevron(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      if (direction === 'left') {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-20 py-12 border-t border-gray-200">
      {/* Header Section */}
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-2">
          <img 
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png?im_w=120" 
            alt="Left wreath" 
            className="w-16 md:w-24 object-contain"
          />
          <div className="text-[80px] md:text-[100px] font-bold text-[#222222] leading-none tracking-tighter -mt-2">
            4.95
          </div>
          <img 
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png?im_w=120" 
            alt="Right wreath" 
            className="w-16 md:w-24 object-contain"
          />
        </div>
        <div className="text-[22px] font-semibold text-[#222222]">
          Guest favourite
        </div>
        <div className="text-[#717171] text-[18px] tracking-tight text-center">
          One of the most loved homes on Airbnb based on <br /> ratings, reviews, and reliability
        </div>
      </div>

      {/* Categories Grid and Histogram */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <a href="#" className="text-[14px] font-semibold text-[#717171] underline hover:text-[#222222] transition">
            How reviews work
          </a>
        </div>
        
        <div className="flex flex-col lg:flex-row py-2 items-stretch">
          {/* Overall Rating Histogram */}
          <div className="w-full lg:w-[16%] lg:border-r border-gray-200 pr-0 lg:pr-6 mb-8 lg:mb-0">
            <div className="text-[14px] font-semibold text-[#222222] mb-2">Overall rating</div>
            <div className="flex flex-col gap-1.5">
              {[5, 4, 3, 2, 1].map(num => (
                <div key={num} className="flex items-center gap-2 text-[12px] font-semibold text-[#222222]">
                  <span className="w-2">{num}</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#222222] rounded-full" 
                      style={{ width: num === 5 ? '90%' : num === 4 ? '5%' : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sub Categories */}
          <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {categoryRatings.map((cat, i) => (
              <div key={i} className="flex flex-col border-gray-200 lg:border-r last:border-0 pl-0 lg:pl-6 py-1">
                <div className="text-[14px] font-semibold text-[#222222] mb-1">{cat.name}</div>
                <div className="text-[18px] font-bold text-[#222222] mb-3">{cat.rating}</div>
                <div className="mt-auto">
                  {cat.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Tags Slider */}
      <div className="relative mb-12 flex items-center group">
        {showLeftChevron && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.18)] rounded-full flex items-center justify-center hover:scale-105 hover:shadow-[0_2px_4px_rgba(0,0,0,0.22)] transition z-20"
            >
              <ChevronLeft size={16} />
            </button>
          </>
        )}
        
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x w-full"
        >
          {tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-2 border border-gray-300 bg-white rounded-full px-4 py-2 snap-start whitespace-nowrap hover:border-black hover:bg-gray-50 transition cursor-pointer">
              <span className="text-[16px]">{tag.icon}</span>
              <span className="text-[14px] font-semibold text-[#222222]">{tag.text}</span>
              <span className="text-[14px] font-semibold text-[#222222]">{tag.count}</span>
            </div>
          ))}
        </div>

        {showRightChevron && (
          <>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.18)] rounded-full flex items-center justify-center hover:scale-105 hover:shadow-[0_2px_4px_rgba(0,0,0,0.22)] transition z-20"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-7">
        {mockReviews.map((review) => (
          <div key={review.id} className="flex flex-col mb-4">
            <div className="flex items-center gap-4 mb-3">
              {review.img ? (
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-semibold text-[#222222] ${review.color}`}>
                  {review.initial}
                </div>
              )}
              <div>
                <div className="font-semibold text-[#222222] text-[16px]">{review.name}</div>
                <div className="text-[14px] text-[#717171]">{review.yearsOnAirbnb}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[14px] text-[#222222] mb-3">
              <div className="flex gap-[1px]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#222222" strokeWidth={0} />
                ))}
              </div>
              <span>&middot;</span>
              <span className="font-semibold">{review.date}</span>
            </div>
            <p className="text-[#222222] text-[16px] leading-[24px]">
              {expandedReviews[review.id] || review.text.length <= 165 ? review.text : `${review.text.slice(0, 165)}...`}
            </p>
            {review.text.length > 165 && (
              <button 
                onClick={() => toggleReview(review.id)}
                className="underline font-semibold text-[16px] mt-1 flex items-center hover:text-gray-600 transition w-max cursor-pointer"
              >
                {expandedReviews[review.id] ? 'Show less' : 'Show more'}
                <ChevronRight size={16} className={`ml-1 transition-transform duration-300 ${expandedReviews[review.id] ? '-rotate-90' : ''}`} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="mt-10">
        <button className="border border-black text-black px-6 py-3 rounded-lg font-semibold text-[16px] hover:bg-gray-50 transition cursor-pointer">
          Show all 19 reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
