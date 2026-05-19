// 'use client';

// import { useState, useRef, useEffect, useCallback } from 'react';
// import { Search, Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';
// import { gsap } from '@/lib/gsapConfig';

// interface NavbarProps {
//   sidebarWidth: string;
// }

// export default function Navbar({ sidebarWidth }: NavbarProps) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLButtonElement>(null);

//   // Close when clicking outside the dropdown and trigger
//   const handleOutsideClick = useCallback((e: MouseEvent) => {
//     if (
//       dropdownRef.current?.contains(e.target as Node) ||
//       triggerRef.current?.contains(e.target as Node)
//     ) return;
//     setDropdownOpen(false);
//   }, []);

//   useEffect(() => {
//     if (dropdownOpen) {
//       document.addEventListener('mousedown', handleOutsideClick);
//       // Animate in
//       if (dropdownRef.current) {
//         gsap.fromTo(
//           dropdownRef.current,
//           { opacity: 0, y: -8, scale: 0.97 },
//           { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
//         );
//       }
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     }
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, [dropdownOpen, handleOutsideClick]);

//   const toggleDropdown = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDropdownOpen((prev) => !prev);
//   };


//   return (
//     <header
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: sidebarWidth,
//         right: 0,
//         height: 'var(--navbar-height)',
//         background: 'rgba(8,8,8,0.85)',
//         backdropFilter: 'blur(16px)',
//         WebkitBackdropFilter: 'blur(16px)',
//         borderBottom: '1px solid var(--border)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '0 1.5rem',
//         zIndex: 200,
//         transition: 'left var(--transition-slow) cubic-bezier(0.4,0,0.2,1)',
//       }}
//     >
//       {/* Search */}
//       <div style={{ position: 'relative', flex: '1', maxWidth: '360px' }}>
//         <Search
//           size={15}
//           style={{
//             position: 'absolute',
//             left: '1rem',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             color: 'var(--text-muted)',
//             pointerEvents: 'none',
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Search orders, projects..."
//           style={{
//             width: '100%',
//             background: 'rgba(255,255,255,0.04)',
//             border: '1px solid var(--border)',
//             borderRadius: '10px',
//             padding: '0.5rem 1rem 0.5rem 2.75rem',
//             color: 'var(--text-primary)',
//             fontSize: '0.875rem',
//             outline: 'none',
//             transition: 'border-color var(--transition-normal), background var(--transition-normal)',
//           }}
//           onFocus={(e) => {
//             e.target.style.borderColor = 'var(--accent-start)';
//             e.target.style.background = 'rgba(255,255,255,0.06)';
//           }}
//           onBlur={(e) => {
//             e.target.style.borderColor = 'var(--border)';
//             e.target.style.background = 'rgba(255,255,255,0.04)';
//           }}
//         />
//         <span
//           style={{
//             position: 'absolute',
//             right: '0.75rem',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             fontSize: '0.65rem',
//             color: 'var(--text-muted)',
//             background: 'rgba(255,255,255,0.06)',
//             border: '1px solid var(--border)',
//             borderRadius: '4px',
//             padding: '1px 5px',
//           }}
//         >
//           ⌘K
//         </span>
//       </div>

//       {/* Right side */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
//         {/* Notifications */}
//         <button
//           id="notifications-btn"
//           style={{
//             position: 'relative',
//             width: 36,
//             height: 36,
//             borderRadius: '9px',
//             background: 'rgba(255,255,255,0.04)',
//             border: '1px solid var(--border)',
//             color: 'var(--text-secondary)',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             transition: 'background var(--transition-fast)',
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
//           onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
//         >
//           <Bell size={16} />
//           <span className="notification-dot" />
//         </button>

//         {/* Divider */}
//         <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

//         {/* User avatar dropdown */}
//         <div style={{ position: 'relative' }}>
//           <button
//             id="user-menu-btn"
//             ref={triggerRef}
//             onClick={toggleDropdown}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '0.625rem',
//               background: 'rgba(255,255,255,0.04)',
//               border: '1px solid var(--border)',
//               borderRadius: '10px',
//               padding: '0.375rem 0.75rem 0.375rem 0.375rem',
//               cursor: 'pointer',
//               transition: 'background var(--transition-fast)',
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
//             onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
//           >
//             <div
//               style={{
//                 width: 28,
//                 height: 28,
//                 borderRadius: '7px',
//                 background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '0.75rem',
//                 fontWeight: 700,
//                 color: 'white',
//                 flexShrink: 0,
//               }}
//             >
//               AC
//             </div>
//             <div style={{ textAlign: 'left' }}>
//               <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
//                 Abdul Wahab CEO
//               </p>
//               <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Founder</p>
//             </div>
//             <ChevronDown
//               size={13}
//               style={{
//                 color: 'var(--text-muted)',
//                 transform: dropdownOpen ? 'rotate(180deg)' : 'none',
//                 transition: 'transform var(--transition-fast)',
//               }}
//             />
//           </button>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
//             <div
//               ref={dropdownRef}
//               style={{
//                 position: 'absolute',
//                 top: 'calc(100% + 8px)',
//                 right: 0,
//                 minWidth: '180px',
//                 background: '#111118',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 borderRadius: '12px',
//                 padding: '0.375rem',
//                 boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
//                 zIndex: 9999,
//               }}
//             >
//               {[
//                 { icon: User, label: 'My Profile' },
//                 { icon: Settings, label: 'Preferences' },
//               ].map((item) => (
//                 <button
//                   key={item.label}
//                   onMouseDown={(e) => e.preventDefault()}
//                   style={{
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '0.625rem',
//                     padding: '0.625rem 0.75rem',
//                     borderRadius: '8px',
//                     background: 'none',
//                     border: 'none',
//                     color: 'var(--text-secondary)',
//                     fontSize: '0.875rem',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     transition: 'background var(--transition-fast), color var(--transition-fast)',
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
//                     e.currentTarget.style.color = 'var(--text-primary)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = 'none';
//                     e.currentTarget.style.color = 'var(--text-secondary)';
//                   }}
//                 >
//                   <item.icon size={14} />
//                   {item.label}
//                 </button>
//               ))}
//               <div style={{ height: 1, background: 'var(--border)', margin: '0.25rem 0' }} />
//               <button
//                 onMouseDown={(e) => e.preventDefault()}
//                 style={{
//                   width: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.625rem',
//                   padding: '0.625rem 0.75rem',
//                   borderRadius: '8px',
//                   background: 'none',
//                   border: 'none',
//                   color: '#f87171',
//                   fontSize: '0.875rem',
//                   cursor: 'pointer',
//                   textAlign: 'left',
//                   transition: 'background var(--transition-fast)',
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
//                 onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
//               >
//                 <LogOut size={14} />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }



'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';

interface NavbarProps {
  sidebarWidth: string;
}

export default function Navbar({ sidebarWidth }: NavbarProps) {
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // CLOSE OUTSIDE CLICK
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current?.contains(e.target as Node) ||
      triggerRef.current?.contains(e.target as Node)
    ) return;

    setDropdownOpen(false);
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);

      if (dropdownRef.current) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -8, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' }
        );
      }
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownOpen, handleOutsideClick]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarWidth,
        right: 0,
        height: 'var(--navbar-height)',
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        zIndex: 200,
      }}
    >
      {/* SEARCH */}
      <div style={{ position: 'relative', flex: '1', maxWidth: '360px' }}>
        <Search size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />

        <input
          type="text"
          placeholder="Search orders, projects..."
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '0.5rem 1rem 0.5rem 2.75rem',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

        {/* NOTIFICATION */}
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: '9px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell size={16} />
        </button>

        {/* USER MENU */}
        <div style={{ position: 'relative' }}>

          <button
            ref={triggerRef}
            onClick={toggleDropdown}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '7px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              AC
            </div>

            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>Admin</p>
              <p style={{ fontSize: '0.7rem', color: 'gray' }}>Founder</p>
            </div>

            <ChevronDown size={13} />
          </button>

          {/* DROPDOWN */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: '180px',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '0.4rem',
                zIndex: 9999,
              }}
            >

              <button style={menuStyle}>
                <User size={14} />
                Profile
              </button>

              <button style={menuStyle}>
                <Settings size={14} />
                Settings
              </button>

              <div style={{ height: 1, background: '#333', margin: '0.3rem 0' }} />

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                style={{
                  ...menuStyle,
                  color: '#f87171',
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  );
}

// menu style
const menuStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0.6rem 0.7rem',
  borderRadius: '8px',
  background: 'none',
  border: 'none',
  color: '#aaa',
  cursor: 'pointer',
  fontSize: '0.85rem',
};