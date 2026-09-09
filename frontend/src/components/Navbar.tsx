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
      <div className="navbar relative z-20 min-h-20 flex-wrap gap-y-2 border-b border-base-300 bg-base-100 px-4 py-3 text-base-content sm:px-8 lg:px-[max(2rem,calc((100vw-68rem)/2))]">
        <div className="flex-1 min-w-0">
          <Link
            to="/"
            className="btn btn-ghost h-11 px-2 text-lg tracking-tight text-base-content sm:text-xl border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
          >
            LinklyWinkly
          </Link>
        </div>
        <div className="flex-none flex items-center gap-1 sm:gap-3">
          {user && (
            <Link to="/dashboard">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost h-11 px-3 text-sm text-base-content border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral`}
              >
                <div className="min-w-0 truncate">
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
                  className={`btn btn-ghost max-w-32 truncate h-11 px-3 text-base-content border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral ${user && "btn-accent"}`}
                >
                  <div className="min-w-0 truncate">
                    <p>{user ? user.name : "Join"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary h-11 px-4 text-sm text-neutral border! rounded-xl font-semibold shadow-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral"
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
                className="menu menu-sm dropdown-content rounded-2xl border border-base-300 bg-base-100 text-base-content z-30 mt-3 w-52 p-2 shadow-xl shadow-neutral/10"
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
      {/* <nav className="border-b border-base-300 bg-base-100 px-6 py-3 text-center text-sm text-base-content/70 [&>h2]:m-0! [&>h2]:text-sm! [&>h2]:font-medium! [&>h2]:text-base-content! [&>p]:mt-1 [&>p:last-child]:hidden">
        <h2>Satnaam</h2>
        <p>{user ? user.name : "Not Logged In"}</p>
        <p>{accessToken ? accessToken : "Missing Token"}</p>
      </nav> */}
    </>
  );
}
