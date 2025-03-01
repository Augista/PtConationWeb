
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const services = [
  {
    icon: '/images/coffee.jpg',
    title: 'Customization Beans',
    description: 'Produksi biji kopi yang berkualitas'},
  {
    icon: '/images/coffee.jpg',
    title: 'Milled Coffee',
    description: 'Kopi yang telah di grind dan siap di sajikan'},
  {
    icon: '/images/coffee.jpg',
    title: 'Supply Chain Systems',
    description: 'Mendukung supply chain management bagi seller'},
  {
    icon: '/images/coffee.jpg',
    title: 'Roasting Service',
    description: 'Roasting biji kopi yang berkualitas'},
];

// const advertisingOptions = [
//   'Letter Sign', 'Videotron', 'Jasa Pembuatan Billboard', 'Spanduk', 
//   'Umbul-Umbul', 'Baliho', 'Digital Printing', 'Pylon Sign', 
//   'Pole Sign', 'Iklan di Transportasi', 'Perizinan Reklame', 'Baliho'
// ];

const ProductDisplay: NextPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Layanan Kami - Advertising Services</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        {/* Header Section */}
        <section className="text-center py-12 bg-blue-800 text-white">
          <h1 className="text-3xl font-bold mb-4">Layanan Kami</h1>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-4"></div>
        </section>

        {/* Specialization Section */}
        <section className="py-16">
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 shadow-lg rounded-lg">
                <div className="flex justify-center mb-4">
                  <Image src={service.icon} alt={service.title} width={64} height={64} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-600">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advertising Options Grid
        <section className="py-16 bg-gray-100">
          <div className="grid md:grid-cols-6 grid-cols-3 gap-6 container mx-auto">
            {advertisingOptions.map((option, index) => (
              <div 
                key={index} 
                className="bg-white shadow-md rounded-lg p-4 text-center hover:bg-blue-50 transition-colors"
              >
                {option}
              </div>
            ))}
          </div>
        </section> */}

        {/* per product Section */}
        <section className="bg-white py-16">
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

              {/* milled */}
              <section className="bg-white py-16">
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

         {/* Supply chain Section */}
         <section className="bg-white py-16">
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
                        width={500} 
                        height={400} 
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Roasting */}
              <section className="bg-white py-16">
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
        
      </main>
    </div>
  );
};

export default ProductDisplay;