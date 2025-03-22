import Image1 from '../assets/Home_image_1.png';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <div>

    <div className='flex items-center justify-between max-w-6xl mx-auto p-10'>
      {/* Left Side - Text Content */}
      <div className='flex flex-col gap-6 max-w-lg'>
        <h1 className='text-gray-700 font-bold text-3xl lg:text-6xl'>
          Make your <span className='text-[#0066cc]'>Home</span>
          <span className='text-[#0066cc]'>Stock</span>
          <br />
          with ease
        </h1>
        <p className='text-black text-xs sm:text-sm'>
          Home Stock is the best place to easily manage your home inventory items in one place.
          <br />
          Save time, reduce waste, and never forget an item again!
        </p>
      </div>

      {/* Right Side - Image */}
      <div className='w-1/2 flex justify-end'>
        <img src={Image1} alt='Home Stock' className='w-full max-w-md' />
      </div>
      
    </div>
    <Footer />
    </div>
    
  );
}
