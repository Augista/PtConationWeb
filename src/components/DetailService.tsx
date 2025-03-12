"use client"
import React, {useRef} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ServicesCarousel: React.FC = () => {
  const swiperRef = useRef<any>(null);
  
  // Create refs for each section
    const customizationRef = useRef(null);
    const milledRef = useRef(null);
    const roastingRef = useRef(null);
    const supplyChainRef = useRef(null);
  
    const cardRefs = {
        1: customizationRef,
        2: milledRef,
        3: roastingRef,
        4: supplyChainRef
      };

  const serviceCards = [
    { 
      id: 1, 
      title: "Customization Beans", 
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", 
      image: "/images/coffee.jpg",
      ref: customizationRef 
    },
    { 
      id: 2, 
      title: "Milled Coffee", 
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", 
      image: "/productservice/milledbeans.png",
      ref: milledRef 
    },
    { 
      id: 3, 
      title: "Roasting", 
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", 
      image: "/productservice/roasting.png",
      ref: roastingRef 
    },
    { 
      id: 4, 
      title: "Supply Chain Systems", 
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", 
      image: "/productservice/SCMdashboard.jpg",
      ref: supplyChainRef 
    },
  ];
  
  const scrollToSection = (ref:any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-3xl font-bold text-center mb-12">Our Services</h2>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, EffectCoverflow, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            navigation
            effect="coverflow"
            coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            breakpoints={{
              768: { slidesPerView: 3 },
            }}
            className="flex justify-center"
          >
            {serviceCards.map((card) => (
              <SwiperSlide key={card.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform scale-90 md:scale-100 border-8 border-blue-500">
                <div className="relative h-60">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>
                <div className="p-6 text-center bg-blue-100 rounded-b-lg">
                  <h3 className="font-bold text-2xl mb-3 text-blue-700">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                  <button 
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => scrollToSection(card.ref)}
                  >
                    Learn More
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Customization Section */}
      <section ref={customizationRef} className="bg-white py-16">
        <div className="items-center flex">
          <div className="w-1/2 flex flex-col mx-24 mb-10 md:mb-0">
            <div className='w-full'>
              <h1 className="text-3xl font-bold mb-4 text-yellow-600">Customizeable Coffee</h1>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity adalah perusahaan yang berkomitmen untuk membawa perubahan dalam industri kopi Indonesia. Dengan visi untuk memberdayakan petani kopi lokal dan menghubungkan mereka dengan pasar yang lebih luas, kami berfokus pada inovasi dalam pengolahan dan distribusi kopi. Kami memahami tantangan yang dihadapi oleh petani kopi Indonesia, seperti keterbatasan pengetahuan tentang standar terbaru dalam pengolahan kopi serta kesulitan dalam memenuhi permintaan pasar yang semakin spesifik.
              </p>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity menyediakan solusi yang mencakup layanan pemesanan kopi yang dapat disesuaikan dengan kebutuhan spesifik pelanggan. Kami juga mendampingi mitra petani dalam menerapkan standar pengolahan yang lebih baik, guna memastikan kualitas kopi yang tinggi dan konsisten. Selain itu, kami juga mendorong digitalisasi dalam manajemen operasional dan rantai pasokan untuk meningkatkan efisiensi.
              </p>
              <div className="hashtag text-blue-600 font-bold">
                #RootToRoast
              </div>
            </div>
          </div>
          <div className="flex w-[43%] h-[10%] mt-16 items-center justify-center">
            <div className="image-container relative">
              <Image 
                src="/productservice/customable.png" 
                alt="About Us Header" 
                width={500} 
                height={400} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Milled Section */}
      <section ref={milledRef} className="bg-white py-16">
        <div className="items-center flex">
          <div className="flex w-[43%] h-[10%] mt-16 items-center justify-center">
            <div className="image-container relative">
              <Image 
                src="/productservice/milledbeans.png" 
                alt="About Us Header" 
                width={500} 
                height={400} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col mx-24 mb-10 md:mb-0">
            <div className='w-full'>
              <h1 className="text-3xl font-bold mb-4 text-yellow-600">Milled Coffee</h1>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity adalah perusahaan yang berkomitmen untuk membawa perubahan dalam industri kopi Indonesia. Dengan visi untuk memberdayakan petani kopi lokal dan menghubungkan mereka dengan pasar yang lebih luas, kami berfokus pada inovasi dalam pengolahan dan distribusi kopi. Kami memahami tantangan yang dihadapi oleh petani kopi Indonesia, seperti keterbatasan pengetahuan tentang standar terbaru dalam pengolahan kopi serta kesulitan dalam memenuhi permintaan pasar yang semakin spesifik.
              </p>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity menyediakan solusi yang mencakup layanan pemesanan kopi yang dapat disesuaikan dengan kebutuhan spesifik pelanggan. Kami juga mendampingi mitra petani dalam menerapkan standar pengolahan yang lebih baik, guna memastikan kualitas kopi yang tinggi dan konsisten. Selain itu, kami juga mendorong digitalisasi dalam manajemen operasional dan rantai pasokan untuk meningkatkan efisiensi.
              </p>
              <div className="hashtag text-blue-600 font-bold">
                #RootToRoast
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section ref={supplyChainRef} className="bg-white py-16">
        <div className="items-center flex">
          <div className="w-1/2 flex flex-col mx-24 mb-10 md:mb-0">
            <div className='w-full'>
              <h1 className="text-3xl font-bold mb-4 text-yellow-600">Supply Chain Management</h1>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity adalah perusahaan yang berkomitmen untuk membawa perubahan dalam industri kopi Indonesia. Dengan visi untuk memberdayakan petani kopi lokal dan menghubungkan mereka dengan pasar yang lebih luas, kami berfokus pada inovasi dalam pengolahan dan distribusi kopi. Kami memahami tantangan yang dihadapi oleh petani kopi Indonesia, seperti keterbatasan pengetahuan tentang standar terbaru dalam pengolahan kopi serta kesulitan dalam memenuhi permintaan pasar yang semakin spesifik.
              </p>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity menyediakan solusi yang mencakup layanan pemesanan kopi yang dapat disesuaikan dengan kebutuhan spesifik pelanggan. Kami juga mendampingi mitra petani dalam menerapkan standar pengolahan yang lebih baik, guna memastikan kualitas kopi yang tinggi dan konsisten. Selain itu, kami juga mendorong digitalisasi dalam manajemen operasional dan rantai pasokan untuk meningkatkan efisiensi.
              </p>
              <div className="hashtag text-blue-600 font-bold">
                #RootToRoast
              </div>
            </div>
          </div>
          <div className="flex w-[43%] h-[10%] mt-16 items-center justify-center">
            <div className="image-container relative">
              <Image 
                src="/productservice/SCMdashboard.jpg" 
                alt="About Us Header" 
                width={300} 
                height={200} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Roasting Section */}
      <section ref={roastingRef} className="bg-white py-16">
        <div className="items-center flex">
          <div className="flex w-[43%] h-[10%] mt-16 items-center justify-center">
            <div className="image-container relative">
              <Image 
                src="/productservice/roasting.png" 
                alt="About Us Header" 
                width={500} 
                height={400} 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col mx-24 mb-10 md:mb-0">
            <div className='w-full'>
              <h1 className="text-3xl font-bold mb-4 text-yellow-600">Roasting Coffee</h1>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity adalah perusahaan yang berkomitmen untuk membawa perubahan dalam industri kopi Indonesia. Dengan visi untuk memberdayakan petani kopi lokal dan menghubungkan mereka dengan pasar yang lebih luas, kami berfokus pada inovasi dalam pengolahan dan distribusi kopi. Kami memahami tantangan yang dihadapi oleh petani kopi Indonesia, seperti keterbatasan pengetahuan tentang standar terbaru dalam pengolahan kopi serta kesulitan dalam memenuhi permintaan pasar yang semakin spesifik.
              </p>
              <p className="text-gray-700 mb-6">
                PT Coffee Nation Prosperity menyediakan solusi yang mencakup layanan pemesanan kopi yang dapat disesuaikan dengan kebutuhan spesifik pelanggan. Kami juga mendampingi mitra petani dalam menerapkan standar pengolahan yang lebih baik, guna memastikan kualitas kopi yang tinggi dan konsisten. Selain itu, kami juga mendorong digitalisasi dalam manajemen operasional dan rantai pasokan untuk meningkatkan efisiensi.
              </p>
              <div className="hashtag text-blue-600 font-bold">
                #RootToRoast
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesCarousel;