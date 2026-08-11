import { ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create the custom authentic Airbnb Marker bound to the map coordinates
const customAirbnbIcon = new L.divIcon({
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center;">
      <!-- Large semi-transparent neighborhood aura -->
      <div style="position: absolute; width: 180px; height: 180px; background-color: #E31C5F; border-radius: 50%; opacity: 0.15; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;"></div>
      
      <!-- Exact location pin -->
      <div style="position: relative; background-color: #222222; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 22px; width: 22px; fill: white;">
          <path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z"></path>
        </svg>
      </div>
    </div>
  `,
  className: '', // Removes default leaflet styling
  iconSize: [56, 56],
  iconAnchor: [28, 28] // Centers the icon perfectly on the coordinate
});

const MapSection = () => {
  // Candolim, Goa coordinates
  const position = [15.5242253, 73.7645107];

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-20 py-12 border-t border-gray-200">
      <h2 className="text-[22px] font-semibold text-[#222222] mb-1">Where you'll be</h2>
      <div className="text-[16px] text-[#222222] mb-6">Candolim, Goa, India</div>
      
      <div className="relative w-full h-[480px] rounded-2xl overflow-hidden mb-6 bg-[#e6e6e6]">
        {/* Fully Interactive React Leaflet Map */}
        <MapContainer 
          center={position} 
          zoom={14} 
          zoomControl={true}
          scrollWheelZoom={false} // Match Airbnb behavior: prevent accidental zooming while scrolling the page
          className="w-full h-full z-0"
        >
          {/* Carto Voyager tiles are extremely similar to Airbnb's clean map style */}
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position} icon={customAirbnbIcon} />
        </MapContainer>
      </div>

      <div className="pt-2">
        <p className="text-[16px] text-[#222222] mb-8">
          Exact location will be provided after booking.
        </p>
        
        <h3 className="font-semibold text-[18px] text-[#222222] mb-4">Neighbourhood highlights</h3>
        <p className="text-[16px] text-[#222222] mb-4">
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <p className="text-[16px] text-[#222222] mb-4">...</p>
        
        <button className="underline font-semibold text-[16px] mt-2 flex items-center hover:text-gray-600 transition w-max cursor-pointer">
          Show more <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default MapSection;
