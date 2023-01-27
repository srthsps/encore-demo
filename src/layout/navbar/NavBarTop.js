import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiPhoneCall, FiMail, FiUser } from 'react-icons/fi';

//internal import
import LoginModal from '@component/modal/LoginModal';
import { UserContext } from '@context/UserContext';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const NavBarTop = () => {

  const {
    state: { userInfo },
    dispatch,
  } = useContext(UserContext);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleModal = () => {
    if (userInfo?.data) {
      // router.push('/user/dashboard');
    } else {
      setModalOpen(!modalOpen);
    }
  };

  const handleLogOut = () => {
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('portal-token')
    Cookies.remove('userInfo');
    Cookies.remove('couponInfo');
    router.push('/');
  };

  const handleLogin = () => {
    setModalOpen(!modalOpen)
    setShowLogin(true)

  }

  return (
    <>
      {modalOpen && (
        <LoginModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
         />
      )}

      <div className="hidden lg:block bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="text-gray-700 py-2 font-sans text-xs font-medium border-b flex justify-between items-center">
            <span className="flex items-center">
              <FiPhoneCall className="mr-2" />
              We are available 24/7, Need help? Call Us:{' '}
              <a
                href="tel:+012345609"
                className="font-bold text-cyan-600 ml-1"
              >
                +971 4 358 1030
              </a>
            </span>

            <span className="flex items-center">
              <FiMail className="mr-2" />
              We are available 24/7, Need help? Email:{' '}
              <a
                href="tel:+012345609"
                className="font-bold text-cyan-600 ml-1"
              >
                sales@encorepowers.com
              </a>
            </span>

            <div className="lg:text-right flex items-center">
              <Link href="/about-us">
                <a className="font-medium hover:text-cyan-400">About Us</a>
              </Link>
              <span className="mx-2">|</span>
              {/* <Link href="/contact-us">
                <a className="font-medium hover:text-cyan-400">Contact Us</a>
              </Link> */}
              <span className="mx-2">|</span>
              {/* <button
                onClick={handleModal}
                className="font-medium hover:text-cyan-400"
              >
                My account
              </button> */}
              {/* <span className="mx-2">|</span> */}
              {
                userInfo?.data ?
                  (<button
                    onClick={handleLogOut}
                    className="flex items-center font-medium hover:text-cyan-400"
                  >
                    <span className="mr-1">
                      <FiUser />
                    </span>
                    Logout
                  </button>)
                  :
                  (
                    <button
                      onClick={() => handleLogin()}
                      className="flex items-center font-medium hover:text-cyan-400"
                    >
                      <span className="mr-1">
                        <FiUser />
                      </span>
                      Login
                    </button>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarTop;
