import { useEffect, useState } from "react";
import { MdAccountCircle, MdNotifications } from "react-icons/md";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    //to close the profile box when we click anywhere on the body
    const closeProfileBox = () => {
      setShowProfile(false);
    };

    document.documentElement.addEventListener("click", closeProfileBox);

    return () => {
      document.documentElement.removeEventListener("click", closeProfileBox);
    };
  }, []);

  return (
    <nav>
      {/* nav bar */}
      <div className="nav-center">
        <div className="nav-header">
          <div className="nav-left">
            <div className="nav-title">
              <h1>Dashboard</h1>
            </div>
          </div>
          <div className="nav-right">
            <button
              className=" nav-icon notifications-icon"
              title="notifications"
            >
              <MdNotifications />
            </button>
            <button
              className="nav-icon user-profile-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfile((prev) => !prev);
              }}
              title="profile"
            >
              <MdAccountCircle />
            </button>
            {/* profile box */}
            {showProfile && (
              <div className="profile-box">
                <ul className="profile-options">
                  <li>User Profile</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
