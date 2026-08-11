import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const stays = [
    {
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        title: "Beautiful Studio with a view to die for",
        price: "₹23,600",
        rating: "4.91",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        title: "NAQAB - 1bhk with private pool",
        price: "₹42,218",
        rating: "4.95",
    },
    {
        image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        title: "Greentique Luxury Flat with plunge pool, Calangute",
        price: "₹44,506",
        rating: "4.94",
    },
    {
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
        title: "The Tropical Studio | 5 mins to Beach",
        price: "₹22,824",
        rating: "4.96",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
        price: "₹39,942",
        rating: "4.95",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        title: "Modern villa with a peaceful garden view",
        price: "₹35,500",
        rating: "4.92",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        title: "Stylish apartment near the beach",
        price: "₹28,700",
        rating: "4.89",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        title: "Cozy retreat with a private pool",
        price: "₹41,250",
        rating: "4.97",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
        title: "Luxury home surrounded by nature",
        price: "₹46,800",
        rating: "4.94",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=800&q=80",
        title: "Bright studio in the heart of the city",
        price: "₹19,900",
        rating: "4.90",
    },
];

export default function MoreStays() {
    const staysContainerRef = useRef(null);
    const [page, setPage] = useState(1);

    const slideStays = (direction) => {
        staysContainerRef.current?.scrollBy({
            left: direction * 850,
            behavior: "smooth",
        });

        setPage((currentPage) => {
            if (direction === 1) return Math.min(currentPage + 1, 2);
            return Math.max(currentPage - 1, 1);
        });
    };

    return (
        <section className="border-t border-[#dddddd] pt-10 mt-10 pb-8 md:pt-16 md:mt-16 md:pb-12 max-w-[1280px] mx-auto px-5 md:px-20">
            <div className="flex items-center justify-between mb-7">
                <h2 className="text-[26px] leading-8 font-semibold text-[#222222]">
                    More stays nearby
                </h2>

                <div className="hidden md:flex items-center gap-3">
                    <span className="text-[16px] text-[#717171]">{page} / 2</span>

                    <button
                        type="button"
                        onClick={() => slideStays(-1)}
                        aria-label="Previous stays"
                        className="w-11 h-11 rounded-full border border-[#dddddd] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] transition"
                    >
                        <ChevronLeft size={24} strokeWidth={1.5} />
                    </button>

                    <button
                        type="button"
                        onClick={() => slideStays(1)}
                        aria-label="Next stays"
                        className="w-11 h-11 rounded-full border border-[#717171] flex items-center justify-center text-[#222222] hover:bg-[#f7f7f7] transition"
                    >
                        <ChevronRight size={24} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            <div
                ref={staysContainerRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {stays.map((stay) => (
                    <article
                        key={stay.title}
                        className="shrink-0 w-[245px] sm:w-[200px] cursor-pointer"
                    >
                        <img
                            src={stay.image}
                            alt={stay.title}
                            className="w-full h-[295px] sm:h-[226px] object-cover rounded-[14px]"
                        />

                        <h3 className="mt-3 text-[15px] font-semibold leading-6 text-[#222222]">
                            {stay.title}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-[14px] text-[#222222]">
                            <span>{stay.price}</span>

                            <span className="flex items-center gap-1">
                                <Star size={15} fill="currentColor" strokeWidth={0} />
                                {stay.rating}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}