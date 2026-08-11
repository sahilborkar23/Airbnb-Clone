import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Medal, MapPin, DoorOpen, Star, ChevronDown, Flag, UserRound, BedDouble, Wifi, Car, Tv, Utensils, Snowflake, X, Monitor, Waves, Bath, PawPrint, Video, Bell, Baby, Briefcase, Check, Coffee, Cross, Droplets, Dumbbell, Fan, FireExtinguisher, Key, Luggage, Microwave, Minus, Refrigerator, Shirt, SprayCan, Thermometer, Trees, Wind, Keyboard, Gem } from 'lucide-react';
import {
  KitchenIcon, DedicatedWorkspaceIcon, PoolIcon, HotTubIcon, PetsIcon,
  SecurityCameraIcon, CarbonMonoxideAlarmIcon, SmokeAlarmIcon, WifiIcon, ParkingIcon,
  TvIcon, AirConditioningIcon, WasherIcon, HairdryerIcon, IronIcon, FirstAidKitIcon,
  MicrowaveIcon, FridgeIcon, CoffeeIcon, PrivateEntranceIcon, GymIcon, LiftIcon, CotIcon,
  FireExtinguisherIcon, GenericAmenityIcon, BedIcon, WineGlassesIcon,
  CleaningProductsIcon, ShampooIcon, HotWaterIcon, ShowerGelIcon,
  HangersIcon, BedLinenIcon, RoomDarkeningBlindsIcon, WardrobeIcon,
  ExerciseEquipmentIcon, CeilingFanIcon, HeatingIcon,
  CookingBasicsIcon, CookerIcon, KettleIcon, ToasterIcon, BlenderIcon, DiningTableIcon,
  GardenIcon, OutdoorDiningIcon, LuggageIcon, LongTermStaysIcon, SelfCheckInIcon,
  BuildingStaffIcon, CleaningAvailableIcon, TumbleDryerIcon, EssentialsIcon
} from '../assets/icons/AmenityIcons';
import { format, differenceInDays } from 'date-fns';

const getIconForAmenity = (name, unavailable = false) => {
  const str = name.toLowerCase();
  
  if (str.includes('wifi')) return <WifiIcon />;
  if (str.includes('tv')) return <TvIcon />;
  if (str.includes('air conditioning')) return <AirConditioningIcon />;
  if (str.includes('fan')) return <CeilingFanIcon />;
  if (str.includes('heating')) return <HeatingIcon />;
  if (str.includes('pool')) return <PoolIcon />;
  if (str.includes('hot tub')) return <HotTubIcon />;
  if (str.includes('kitchen') || str.includes('crockery') || str.includes('cutlery')) return <KitchenIcon />;
  if (str.includes('cooking basics')) return <CookingBasicsIcon />;
  if (str.includes('cooker')) return <CookerIcon />;
  if (str.includes('kettle')) return <KettleIcon />;
  if (str.includes('toaster')) return <ToasterIcon />;
  if (str.includes('blender')) return <BlenderIcon />;
  if (str.includes('dining')) return <DiningTableIcon />;
  if (str.includes('fridge') || str.includes('freezer')) return <FridgeIcon />;
  if (str.includes('microwave')) return <MicrowaveIcon />;
  if (str.includes('coffee')) return <CoffeeIcon />;
  if (str.includes('wine')) return <WineGlassesIcon />;
  if (str.includes('workspace')) return <DedicatedWorkspaceIcon />;
  if (str.includes('parking')) return <ParkingIcon />;
  if (str.includes('pets')) return <PetsIcon />;
  if (str.includes('camera') || str.includes('video')) return <SecurityCameraIcon />;
  if (str.includes('smoke')) return <SmokeAlarmIcon />;
  if (str.includes('carbon monoxide')) return <CarbonMonoxideAlarmIcon />;
  if (str.includes('hairdryer')) return <HairdryerIcon />;
  if (str.includes('cleaning available')) return <CleaningAvailableIcon />;
  if (str.includes('cleaning')) return <CleaningProductsIcon />;
  if (str.includes('shampoo')) return <ShampooIcon />;
  if (str.includes('water')) return <HotWaterIcon />;
  if (str.includes('gel')) return <ShowerGelIcon />;
  if (str.includes('tumble dryer')) return <TumbleDryerIcon />;
  if (str.includes('machine') || str.includes('dryer')) return <WasherIcon />;
  if (str.includes('iron')) return <IronIcon />;
  if (str.includes('hanger') || str.includes('rack')) return <HangersIcon />;
  if (str.includes('linen')) return <BedLinenIcon />;
  if (str.includes('blinds')) return <RoomDarkeningBlindsIcon />;
  if (str.includes('wardrobe')) return <WardrobeIcon />;
  if (str.includes('cot') || str.includes('baby')) return <CotIcon />;
  if (str.includes('fire extinguisher')) return <FireExtinguisherIcon />;
  if (str.includes('first aid')) return <FirstAidKitIcon />;
  if (str.includes('entrance') || str.includes('door')) return <PrivateEntranceIcon />;
  if (str.includes('exercise')) return <ExerciseEquipmentIcon />;
  if (str.includes('gym')) return <GymIcon />;
  if (str.includes('lift')) return <LiftIcon />;
  if (str.includes('garden')) return <GardenIcon />;
  if (str.includes('outdoor dining')) return <OutdoorDiningIcon />;
  if (str.includes('luggage')) return <LuggageIcon />;
  if (str.includes('long-term') || str.includes('long term')) return <LongTermStaysIcon />;
  if (str.includes('self check-in') || str.includes('self check in')) return <SelfCheckInIcon />;
  if (str.includes('staff')) return <BuildingStaffIcon />;
  if (str.includes('essentials')) return <EssentialsIcon />;
  if (str.includes('bed')) return <BedIcon />;
  
  // Generic fallback for others
  return <GenericAmenityIcon />;
};
import data from '../assets/data.json';
import sleep1 from '../assets/sleep-1.jpeg';
import sleep2 from '../assets/sleep-2.jpeg';
import CalendarWidget from './CalendarWidget';
const allAmenities = [
  { category: "Bathroom", items: ["Hairdryer", "Cleaning products", "Shampoo", "Hot water", "Shower gel"] },
  { category: "Bedroom and laundry", items: [
    "Washing machine", 
    "Hangers", 
    { name: "Bed linen", description: "Cotton linen" }, 
    "Room-darkening blinds", 
    "Iron", 
    "Clothes drying rack", 
    "Clothes storage: wardrobe"
  ] },
  { category: "Entertainment", items: ["TV", "Exercise equipment"] },
  { category: "Family", items: [
    { name: "Cot – available upon request", description: "Standard – 52 inches long x 28 inches wide (132cm x 71cm)" }
  ] },
  { category: "Heating and cooling", items: ["Air conditioning", "Ceiling fan", "Heating"] },
  { category: "Home safety", items: [
    { name: "Exterior security cameras on property", description: "Cameras are located in the exterior area." },
    "Fire extinguisher", 
    "First aid kit"
  ] },
  { category: "Internet and office", items: ["Wifi", "Dedicated workspace"] },
  { category: "Kitchen and dining", items: [
    { name: "Kitchen", description: "Space where guests can cook their own meals" },
    "Fridge", 
    "Microwave", 
    { name: "Cooking basics", description: "Pots and pans, oil, salt and pepper" }, 
    { name: "Crockery and cutlery", description: "Bowls, chopsticks, plates, cups, etc." }, 
    "Freezer", 
    "Cooker", 
    "Kettle", 
    "Wine glasses", 
    "Toaster", 
    "Blender", 
    "Dining table", 
    "Coffee"
  ] },
  { category: "Location features", items: [
    { name: "Private entrance", description: "Separate street or building entrance" }
  ] },
  { category: "Outdoor", items: [
    { name: "Back garden", description: "An open space on the property usually covered in grass" },
    "Outdoor dining area"
  ] },
  { category: "Parking and facilities", items: [
    "Free parking on premises", 
    "Pool", 
    "Hot tub", 
    { name: "Lift", description: "The home or building has a lift that’s at least 52 inches (132cm) deep and a doorway at least 32 inches (81cm) wide" }, 
    "Shared gym in building"
  ] },
  { category: "Services", items: [
    { name: "Pets allowed", description: "Assistance animals are always allowed" }, 
    { name: "Luggage drop-off allowed", description: "For guests' convenience when they are arriving early or departing late" }, 
    { name: "Long-term stays allowed", description: "Allow stays of 28 days or more" }, 
    "Self check-in", 
    { name: "Building staff", description: "Someone is available 24 hours a day to let guests in" }, 
    "Cleaning available during stay"
  ] },
  { category: "Not included", items: [
    "Tumble dryer", 
    "Essentials", 
    { name: "Smoke alarm", description: "This place may not have a smoke detector. Contact the host with any questions." }, 
    { name: "Carbon monoxide alarm", description: "This place may not have a carbon monoxide detector. Contact the host with any questions." }
  ], unavailable: true }
];

const ListingDetails = ({ dateRange, setDateRange, guests, setGuests, nights, pricePerNight, totalPrice }) => {
  const [showAmenities, setShowAmenities] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const totalGuests = guests.adults + guests.children;
  const maxGuests = 3;

  const updateGuest = (type, increment) => {
    setGuests(prev => {
      const newValue = prev[type] + increment;
      if (newValue < 0) return prev;
      if (type === 'adults' && newValue < 1) return prev;
      if ((type === 'adults' || type === 'children') && increment > 0 && totalGuests >= maxGuests) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  const formatGuestLabel = () => {
    let label = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;
    if (guests.infants > 0) label += `, ${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`;
    if (guests.pets > 0) label += `, ${guests.pets} pet${guests.pets !== 1 ? 's' : ''}`;
    return label;
  };

  let title = "Select check-in date";
  let subtitle = "Add your travel dates for exact pricing";

  if (dateRange?.from && dateRange?.to && nights > 0) {
    title = `${nights} nights in Candolim`;
    subtitle = `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`;
  }

  useEffect(() => {
    if (showAmenities || showAboutModal) {
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
  }, [showAmenities, showAboutModal]);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-20 pt-6 pb-12 flex flex-col md:flex-row gap-10 lg:gap-20">
      
      {/* Left Column */}
      <div className="w-full md:w-[60%] lg:w-[65%]">
        <div className="">
          <h2 className="text-[22px] font-semibold text-[#222222]">
            Entire serviced apartment in Candolim, India
          </h2>
          <div className="text-[16px] text-[#222222]">
            3 guests &middot; 1 bedroom &middot; 1 bed &middot; 1 bathroom
          </div>
        </div>

        {/* Guest Favourite Badge */}
        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-6 py-5 my-6 mt-6">
          {/* Left: Guest Favourite */}
          <div className="flex items-center gap-2">
            {/* Left wreath SVG */}
            <svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="48">
              <g clipPath="url(#clip0_5880_37773)">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222"></path>
              </g>
              <defs>
                <clipPath id="clip0_5880_37773">
                  <rect width="18.8235" height="32" fill="white" transform="translate(0.453125 0.000488281)"></rect>
                </clipPath>
              </defs>
            </svg>
            <div className="text-[15px] font-bold text-[#222222] text-center leading-[1.15]">
              Guest<br/>favourite
            </div>
            {/* Right wreath SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" fill="none" height="48">
              <g clipPath="url(#clip0_5880_37786)">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z" fill="#222222"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z" fill="#F7F7F7"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z" fill="#222222"></path>
              </g>
              <defs>
                <clipPath id="clip0_5880_37786">
                  <rect width="18.8235" height="32" fill="white" transform="matrix(-1 0 0 1 19.1016 0.000488281)"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          
          {/* Middle: Text */}
          <div className="text-[15px] ml-5 font-bold text-[#222222] max-w-[300px] leading-[1.35]">
            One of the most loved homes on Airbnb, according to guests
          </div>

          {/* Right: Rating and Reviews */}
          <div className="flex items-stretch gap-0">
            <div className="flex flex-col items-center justify-center px-5">
              <span className="text-[22px] font-extrabold text-[#222222] leading-none">4.95</span>
              <div className="flex gap-[2px] text-black mt-[3px]">
                <Star size={10} fill="black" strokeWidth={0} />
                <Star size={10} fill="black" strokeWidth={0} />
                <Star size={10} fill="black" strokeWidth={0} />
                <Star size={10} fill="black" strokeWidth={0} />
                <Star size={10} fill="black" strokeWidth={0} />
              </div>
            </div>
            <div className="w-[1px] bg-gray-300 self-stretch"></div>
            <div className="flex flex-col items-center justify-center px-5">
              <span className="text-[22px] font-extrabold text-[#222222] leading-none">21</span>
              <span className="text-[13px] font-medium underline text-[#222222] mt-[3px]">Reviews</span>
            </div>
          </div>
        </div>

        <div className="py-6 border-b border-gray-200 flex items-center gap-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://a0.muscache.com/im/pictures/user/User/original/6b72f8b5-0e66-4bf1-8ba3-ff0f87ff3687.jpeg?im_w=120" alt="Host" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[16px] font-semibold text-[#222222]">
              Hosted by Mirashya Homes
            </div>
            <div className="text-[14px] text-[#717171] mt-0.5">
              2 years hosting
            </div>
          </div>
        </div>

        <div className="py-8 border-b border-gray-200 flex flex-col gap-6 text-[#222222]">
          <div className="flex gap-6 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}><path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path></svg>
            <div>
              <div className="text-[15px] font-semibold text-[#222222]">Great check-in experience</div>
              <div className="text-[14px] text-[#717171]">Recent guests loved the smooth start to this stay.</div>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}><path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path></svg>
            <div>
              <div className="text-[15px] font-semibold text-[#222222]">Self check-in</div>
              <div className="text-[14px] text-[#717171] ">You can check in with the building staff.</div>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor' }}><path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z"></path></svg>
            <div>
              <div className="text-[15px] font-semibold text-[#222222]">Dive right in</div>
              <div className="text-[14px] text-[#717171]">This is one of the few places in the area with a pool.</div>
            </div>
          </div>
        </div>

        {/* About this space */}
        <div className="py-8 border-b border-gray-200">
          <div className="bg-gray-100 p-3.5 rounded-xl mb-5 text-[14px]">
            <span className="font-medium text-[#222222]">Some info has been automatically translated.</span>
            <a href="#" className="underline font-bold ml-1 text-[#222222]">Show original</a>
          </div>

          {/* Collapsed preview — matches screenshot */}
          <div className="text-[16px] text-[#222222] leading-[1.65]">
            <p>
              🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴
            </p>
            <p className="mt-4">
              <span className="font-semibold">The space</span><br />
              Escape to Amor de Goa by Mirashya Homes, a serene 1BHK retreat in the heart of&nbsp;...
            </p>
          </div>

          {/* Show more pill button — Airbnb style */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="mt-5 bg-gray-200 hover:bg-gray-100 text-[#303030] font-bold text-[16px] px-6 py-3 rounded-lg transition cursor-pointer"
          >
            Show more
          </button>
        </div>

        {/* Where you'll sleep */}
        <div className="py-12 border-b border-gray-200">
          <h2 className="text-[23px] font-semibold text-[#222222] mb-5">Where you'll sleep</h2>
          <div className="flex gap-4 overflow-x-auto snap-x pb-4 custom-scrollbar">
            <div className="min-w-[280px] sm:min-w-[320px] snap-start">
              <img src={sleep1} alt="Bedroom" className="w-full h-48 sm:h-56 object-cover rounded-xl mb-4" />
              <div className="font-semibold text-[16px] text-[#222222]">Bedroom</div>
              <div className="text-[15px] text-[#222222] ">1 king bed</div>
            </div>
            <div className="min-w-[280px] sm:min-w-[320px] snap-start">
              <img src={sleep2} alt="Living room" className="w-full h-48 sm:h-56 object-cover rounded-xl mb-4" />
              <div className="font-semibold text-[16px] text-[#222222]">Living room</div>
              <div className="text-[15px] text-[#222222]">1 sofa bed</div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div id="amenities" className="py-12 border-b border-gray-200">
          <h2 className="text-[22px] font-semibold text-[#222222] mb-6">What this place offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-2 mb-8">
            <div className="flex items-center gap-4 text-[#222222]">
              <KitchenIcon />
              <span className="text-[16px]">Kitchen</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <WifiIcon />
              <span className="text-[16px]">Wifi</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <DedicatedWorkspaceIcon />
              <span className="text-[16px]">Dedicated workspace</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <ParkingIcon />
              <span className="text-[16px]">Free parking on premises</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <PoolIcon />
              <span className="text-[16px]">Pool</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <HotTubIcon />
              <span className="text-[16px]">Hot tub</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <PetsIcon />
              <span className="text-[16px]">Pets allowed</span>
            </div>
            <div className="flex items-center gap-4 text-[#222222]">
              <SecurityCameraIcon />
              <span className="text-[16px]">Exterior security cameras on property</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <CarbonMonoxideAlarmIcon />
              <span className="text-[16px] line-through text-gray-400">Carbon monoxide alarm</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <SmokeAlarmIcon />
              <span className="text-[16px] line-through text-gray-400">Smoke alarm</span>
            </div>
          </div>
          <button 
            className="mt-5 bg-gray-200 hover:bg-gray-100 text-[#303030] font-bold text-[16px] px-6 py-3 rounded-lg transition cursor-pointer"
            onClick={() => setShowAmenities(true)}
          >
            Show all 50 amenities
          </button>
        </div>
        
        {/* Calendar Section */}
        <div className="py-12">
          <h2 className="text-[22px] font-semibold text-[#222222]">{title}</h2>
          <div className="text-[14px] text-gray-500 mb-6 mt-1">{subtitle}</div>
          
          <div className="flex w-full overflow-hidden">
            <CalendarWidget range={dateRange} setRange={setDateRange} />
          </div>

          <div className="flex justify-between items-center mt-4 text-[#222222]">
            <button className="p-2 hover:bg-gray-100 rounded-full transition -ml-2 cursor-pointer">
              <Keyboard size={24} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setDateRange(undefined)}
              className="underline font-semibold text-[14px] hover:bg-gray-100 p-2 rounded-lg transition -mr-2 cursor-pointer"
            >
              Clear dates
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Booking Widget */}
      <div className="w-full md:w-[40%] lg:w-[37%] relative">
        <div className="sticky top-24">
          
          {/* Rare Find Banner */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-2 md:px-4 flex items-center justify-center gap-2 mb-4">
            <Gem className="text-[#FF385C] min-w-[22px]" size={24} fill="#FF385C" strokeWidth={1} />
            <span className="text-[14px] font-semibold text-[#222222]">Rare find! This place is usually booked</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-5">
            {nights > 0 ? (
              <div className="flex flex-col mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-semibold text-[#222222]">₹{totalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-[16px] text-[#222222]">for {nights} night{nights !== 1 ? 's' : ''}</span>
                </div>
                <div className="text-[14px] text-[#717171] underline cursor-pointer mt-1 font-medium hover:text-[#222222] transition-colors">Show price breakdown</div>
              </div>
            ) : (
              <div className="mb-5 flex items-baseline gap-1">
                <span className="text-[22px] font-semibold text-[#222222]">₹{Math.round(pricePerNight).toLocaleString('en-IN')}</span>
                <span className="text-[16px] text-[#222222]">night</span>
              </div>
            )}

          <div className="border border-gray-400 rounded-xl mb-4 mx-2">
            <div className="flex w-full border-b border-gray-400">
              <div className="w-1/2 p-3 border-r border-gray-400 cursor-pointer hover:bg-gray-50 transition rounded-tl-xl">
                <div className="text-[11px] font-extrabold uppercase ">Check-in</div>
                <div className={`text-[14px] ${dateRange?.from ? 'text-[#222222]' : 'text-[#717171]'}`}>
                  {dateRange?.from ? format(dateRange.from, 'dd/MM/yyyy') : 'Add date'}
                </div>
              </div>
              <div className="w-1/2 p-3 cursor-pointer hover:bg-gray-50 transition rounded-tr-xl">
                <div className="text-[11px] font-extrabold uppercase ">Checkout</div>
                <div className={`text-[14px] ${dateRange?.to ? 'text-[#222222]' : 'text-[#717171]'}`}>
                  {dateRange?.to ? format(dateRange.to, 'dd/MM/yyyy') : 'Add date'}
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <div 
                onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                className="w-full p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition rounded-b-xl"
              >
                <div>
                  <div className="text-[11px] font-extrabold uppercase">Guests</div>
                  <div className="text-[14px] text-[#222222]">{formatGuestLabel()}</div>
                </div>
                <ChevronDown size={20} className={`text-[#222222] transition-transform ${showGuestsDropdown ? 'rotate-180' : ''}`} />
              </div>

              {/* Guest Dropdown Modal */}
              <AnimatePresence>
                {showGuestsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 p-4 z-50 flex flex-col gap-6"
                  >
                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#222222]">Adults</span>
                        <span className="text-[14px] text-[#717171]">Age 13+</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuest('adults', -1)}
                          disabled={guests.adults <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-[16px] w-4 text-center">{guests.adults}</span>
                        <button 
                          onClick={() => updateGuest('adults', 1)}
                          disabled={totalGuests >= maxGuests}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible'}}><path d="m2 16h28"></path><path d="m16 2v28"></path></svg>
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#222222]">Children</span>
                        <span className="text-[14px] text-[#717171]">Ages 2–12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuest('children', -1)}
                          disabled={guests.children <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-[16px] w-4 text-center">{guests.children}</span>
                        <button 
                          onClick={() => updateGuest('children', 1)}
                          disabled={totalGuests >= maxGuests}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible'}}><path d="m2 16h28"></path><path d="m16 2v28"></path></svg>
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#222222]">Infants</span>
                        <span className="text-[14px] text-[#717171]">Under 2</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuest('infants', -1)}
                          disabled={guests.infants <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-[16px] w-4 text-center">{guests.infants}</span>
                        <button 
                          onClick={() => updateGuest('infants', 1)}
                          disabled={guests.infants >= 5}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible'}}><path d="m2 16h28"></path><path d="m16 2v28"></path></svg>
                        </button>
                      </div>
                    </div>

                    {/* Pets */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[16px] font-semibold text-[#222222]">Pets</span>
                        <span className="text-[14px] text-[#222222] underline cursor-pointer font-medium hover:text-[#000]">Bringing a service animal?</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuest('pets', -1)}
                          disabled={guests.pets <= 0}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-[16px] w-4 text-center">{guests.pets}</span>
                        <button 
                          onClick={() => updateGuest('pets', 1)}
                          disabled={guests.pets >= 5}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:cursor-not-allowed cursor-pointer transition"
                        >
                          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible'}}><path d="m2 16h28"></path><path d="m16 2v28"></path></svg>
                        </button>
                      </div>
                    </div>

                    <div className="text-[12px] text-[#717171] mt-2">
                      This place has a maximum of {maxGuests} guests, not including infants. If you're bringing more than 2 pets, please let your host know.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button className="w-full text-white py-3 rounded-full text-[16px] font-semibold transition bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:from-[#D70466] hover:via-[#D70466] hover:to-[#C90060] active:scale-[0.99]">
            Check availability
          </button>

          </div>
          <div className="flex justify-center mt-4">
              <button className="flex items-center gap-1.5 text-[14px] font-semibold text-[#454545] underline transition cursor-pointer">
                <Flag size={13} />
                Report this listing
              </button>
          </div>
        </div>
      </div>
      
      {/* About This Space Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50" 
            onClick={() => setShowAboutModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white w-full h-[100dvh] md:h-[88vh] md:max-w-[800px] md:rounded-2xl flex flex-col shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Modal Header */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200 shrink-0">
              <button
                onClick={() => setShowAboutModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition -ml-2 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 overflow-y-auto custom-scrollbar flex-1">
              <h2 className="text-[26px] font-bold text-[#222222] mb-6">About this space</h2>

              <div className="text-[16px] text-[#222222] leading-[1.7] flex flex-col gap-5">
                <p>
                  🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴
                </p>

                <div>
                  <p className="font-semibold text-[17px] mb-2">The space</p>
                  <p>Escape to Amor de Goa by Mirashya Homes, a serene 1BHK retreat in the heart of Candolim—perfect for couples, families, solo travelers, and work-from-anywhere stays. Thoughtfully designed with modern comforts and a touch of Goan charm, this space blends relaxation with convenience.</p>
                </div>

                <div>
                  <p className="font-semibold mb-1">🛁 Highlights You'll Love</p>
                  <ul className="list-none flex flex-col gap-0.5">
                    <li>• Private Jacuzzi for a relaxing unwind</li>
                    <li>• Cozy, stylish living space with modern interiors</li>
                    <li>• Private balcony for peaceful mornings &amp; evenings</li>
                    <li>• Access to a tranquil shared swimming pool</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-1">🛏️ Comfort &amp; Living</p>
                  <ul className="list-none flex flex-col gap-0.5">
                    <li>• Plush bedroom for restful sleep</li>
                    <li>• Bright, well-designed living area</li>
                    <li>• Clean bathroom with essential toiletries</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-1">🍳 Fully Equipped Kitchen</p>
                  <p>Cook with ease—includes cookware, utensils &amp; appliances for short or long stays</p>
                </div>

                <div>
                  <p className="font-semibold mb-1">📍 Prime Location – Candolim</p>
                  <ul className="list-none flex flex-col gap-0.5">
                    <li>• 10 mins to Candolim Beach</li>
                    <li>• Easy access to Baga, Calangute, Sinquerim &amp; Fort Aguada</li>
                    <li>• Surrounded by cafés, restaurants, bars &amp; supermarkets</li>
                    <li>• ~35–40 mins from MOPA Airport</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-1">✨ Amenities for a Perfect Stay</p>
                  <ul className="list-none flex flex-col gap-0.5">
                    <li>• High-speed Wi-Fi + dedicated workspace (WFH ready)</li>
                    <li>• Smart TV with streaming apps</li>
                    <li>• Housekeeping support</li>
                    <li>• Free parking</li>
                    <li>• Secure gated community with caretaker</li>
                    <li>• Pet-friendly 🐾</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-1">🌴 Ideal For</p>
                  <ul className="list-none flex flex-col gap-0.5">
                    <li>• Romantic getaways</li>
                    <li>• Family vacations</li>
                    <li>• Workations</li>
                    <li>• Peaceful staycations</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-1">🌟 Experience Goa, the Right Way</p>
                  <p>Whether you're here to explore or simply unwind, Amor de Goa offers the perfect mix of comfort, location, and tranquility.</p>
                </div>

                <p>📅 Book your Goa escape now—dates fill fast!</p>
                <p>Warm regards,<br />Team Mirashya Homes</p>

                <hr className="border-gray-200" />

                <div>
                  <p className="font-semibold text-[17px] mb-2">Guest access</p>
                  <p>Guests have access to all the amenities of the apartment including the room and the common areas like gym, parking area and swimming pool.</p>
                </div>

                <div>
                  <p className="font-semibold text-[17px] mb-2">Other things to note</p>
                  <div className="flex flex-col gap-2">
                    <p>Our property is Vastu compliant and has been professionally verified by a certified Vastu consultant.</p>
                    <p>- Guest capacity should be respected. Unaccounted guests are not allowed.</p>
                    <p>- Pool timings are 9 am to 7 pm. No eating/drinking/smoking near the pool area.</p>
                    <p>- The apartment has an inverter backup in case of any occasional power outages that occur in Goa.</p>
                    <p>- Being located in a gated community, we don't allow loud music in the property.</p>
                    <p>- Early check-ins/Late checkouts are subject to availability and will be charged additionally. Late checkout is permitted only with prior approval.</p>
                    <p>- Linen (bed linen &amp; towels) will be changed every 3 days. Requests for the linen and towels to be changed daily will be chargeable.</p>
                    <p>- We provide soap, shower gel and shampoo in all properties; other amenities like dental kits, shaving kits etc are all on request.</p>
                    <p>- Check-in and Luggage assistance to be provided.</p>
                    <p>- Housekeeping Staff will be available between 9 am to 6 pm.</p>
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Amenities Modal */}
      <AnimatePresence>
        {showAmenities && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50" 
            onClick={() => setShowAmenities(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white w-full h-[100dvh] md:h-[90vh] md:max-w-[800px] md:rounded-2xl flex flex-col shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center p-6 pb-2">
              <button 
                onClick={() => setShowAmenities(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition -ml-2 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:px-8 overflow-y-auto custom-scrollbar flex-1">
              <h2 className="text-[26px] md:text-[28px] font-bold text-[#222222] mb-8">What this place offers</h2>
              {allAmenities.map((group, idx) => (
                <div key={idx} className="mb-8">
                  <h3 className="text-[18px] font-semibold text-[#222222] mb-2">{group.category}</h3>
                  <div className="flex flex-col">
                    {group.items.map((item, itemIdx) => {
                      const itemName = typeof item === 'object' ? item.name : item;
                      const itemDesc = typeof item === 'object' ? item.description : null;
                      return (
                        <div 
                          key={itemIdx} 
                          className={`flex items-center gap-4 py-5 border-b border-gray-200 text-[16px] ${group.unavailable ? 'text-[#717171]' : 'text-[#222222]'}`}
                        >
                          <div className={group.unavailable ? 'text-[#717171]' : 'text-[#222222]'}>
                             {getIconForAmenity(itemName, group.unavailable)}
                          </div>
                          <div className="flex flex-col">
                            <span className={group.unavailable ? 'line-through text-[#717171]' : 'text-[#222222]'}>{itemName}</span>
                            {itemDesc && <span className="text-[14px] text-[#717171] leading-5">{itemDesc}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ListingDetails;
