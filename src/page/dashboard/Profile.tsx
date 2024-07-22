import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utils/getUserInfo';
import toast from 'react-hot-toast';
import classNames from 'classnames';

export default function Profile() {
  const user = getUserInfo();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users/update-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ email: user.data.email, currentPassword, newPassword })
    });

    const data = await response.json();
    setIsLoading(false);

    if (response.ok) {
      toast.success('Password updated successfully!');
      router('/dashboard');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-70 bg-black"
          />
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x={0}
            y={0}
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </section>
      <section className="relative py-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-20 ml-8">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {user.data.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                  {user.data.email}
                </div>
              </div>
              <div className="mt-10 py-5 text-center"></div>
              <div className="mt-10 py-5 text-center">
                <form onSubmit={handlePasswordChange} className="w-full max-w-sm mx-auto">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currentPassword">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                  <button
                type="submit"
                className={classNames({
                  "py-3 bg-[#287BCB] px-9 rounded-2xl text-white w-full mt-3":
                    true,
                  "opacity-100 ": !isLoading,
                  "opacity-20 cursor-wait": isLoading,
                })}
              >
                Update Password
              </button>
                  </div>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
