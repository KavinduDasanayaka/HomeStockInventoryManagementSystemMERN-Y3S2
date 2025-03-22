import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { welcomeTranslations } from "../../assets/country";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-[#517891] shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-[#90D5FF]">Home</span>
            <span className="text-[#90D5FF]">Stock</span>
          </h1>
        </Link>

        <div className="hidden sm:inline hover:underline text-cyan-400">
            <p>{currentUser && welcomeTranslations[currentUser?.country]}</p>
          </div>

        <ul className="flex items-center gap-6">
          {!currentUser && (
            <Link to="/" className="hidden sm:inline text-white hover:underline">
              Home
            </Link>
          )}
{/*
          {!currentUser && (
            <Link to="/about" className="hidden sm:inline text-white hover:underline">
              About
            </Link>
          )}
*/}
          <Link to={currentUser ? '/grocery-list' : '/about'}>
           <li className='hidden sm:inline text-white hover:underline'>
            {currentUser ? 'Grocery List' : 'About'}
          </li>
          </Link>
          

          {/*user log welanm item list page ekt nettm sign in page ekt*/}
          <Link to={currentUser ? '/item-list' : '/sign-in'}>
           <li className='hidden sm:inline text-white hover:underline'>
            {currentUser ? 'Borrowed And Lent Items' : 'Sign in'}
          </li>
          </Link>

          {currentUser && (
            <Link to="/upload-receipt" className="hidden sm:inline text-white hover:underline">
              UploadReceipt
            </Link>
          )}

          {/* Dropdown for Timeline & Post */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white hover:underline focus:outline-none"
              >
                Recipe Share ▼
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[white] rounded-lg shadow-lg">
                  <Link to="/timeline" className="block px-4 py-2 text-black hover:bg-[#77b1d4]">
                    Timeline
                  </Link>
                  <Link to="/post" className="block px-4 py-2 text-black hover:bg-[#77b1d4]">
                    Create Post
                  </Link>
                </div>
              )}
            </div>
          )}

          
{/*
          {!currentUser && (
            <Link to="/sign-in" className="hidden sm:inline text-white hover:underline">
              Sign in
            </Link>
          )}
*/}
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <button className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300">
                Sign Up
              </button>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
