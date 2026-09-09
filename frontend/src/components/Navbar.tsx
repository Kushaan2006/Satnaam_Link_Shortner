import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthModal from "./AuthModal";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user, accessToken } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (user && showAuthModal) {
      setShowAuthModal(false);
    }
  }, [user, showAuthModal]);

  return (
    <>
      {showAuthModal && <AuthModal />}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            LinklyWinkly
          </Link>
        </div>
        <div className="flex-none">
          {user && (
            <Link to="/dashboard">
              <div tabIndex={0} role="button" className={`btn btn-ghost`}>
                <div className="">
                  <p>Dashboard</p>
                </div>
              </div>
            </Link>
          )}
          <div className="dropdown dropdown-end">
            {user ? (
              <div>
                <div
                  tabIndex={0}
                  role="button"
                  className={`btn btn-ghost ${user && "btn-accent"}`}
                >
                  <div className="">
                    <p>{user ? user.name : "Join"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!user) {
                    setShowAuthModal(true);
                  }
                }}
              >
                Authenticate
              </button>
            )}
            {user && (
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {/* <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li> */}
                <li>
                  <LogoutButton />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <nav>
        <h2>Satnaam</h2>
        <p>{user ? user.name : "Not Logged In"}</p>
        <p>{accessToken ? accessToken : "Missing Token"}</p>
      </nav>
    </>
  );
}
