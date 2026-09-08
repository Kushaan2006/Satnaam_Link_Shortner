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
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-sm dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            {user ? (
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost ${user && "btn-accent"}`}
              >
                <div className="">
                  <p>{user ? user.name : "Join"}</p>
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
