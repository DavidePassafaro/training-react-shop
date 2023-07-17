import logo from "@assets/react.svg";
import { NavLinkClassName, Product } from "@shared/models";
import { useCartPanel } from "@shared/services";
import { NavLink } from "react-router-dom";
import { CartPanel } from "./CartPanel";

interface NavBarLink {
  description: string;
  to: string;
}

const BOTTOM_BAR_LINKS: NavBarLink[] = [
  { description: "Login", to: "login" },
  { description: "CMS", to: "cms" },
];

const isMainButtonActive = ({ isActive }: NavLinkClassName) =>
  "text-xl" + (isActive ? " text-sky-400 font-bold" : "");

const isBottomButtonActive = ({ isActive }: NavLinkClassName) =>
  "btn accent lg" + (isActive ? " border-4 border-yellow-300" : "");

export function NavBar() {
  const isCartOpen: boolean = useCartPanel((state) => state.open);
  const toggleCartPanel: () => void = useCartPanel((state) => state.toggle);

  return (
    <div className="fixed top-0 left-0 right-0 shadow-2xl z-10">
      <div className="bg-slate-900 flex justify-between items-center h-20 text-white p-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Shop logo" className="w-16" />

          <NavLink to="shop" className={isMainButtonActive}>
            SHOP
          </NavLink>
        </div>

        {/* Cart */}
        <div>
          <button className="btn accent lg" onClick={toggleCartPanel}>
            Cart: 0
          </button>
        </div>

        {isCartOpen && (
          <CartPanel
            productsOrderList={[
              {
                quantity: 4,
                product: { id: "1", name: "Nutella", cost: 4 } as Product,
              },
              {
                quantity: 5,
                product: { id: "2", name: "Oreo", cost: 2 } as Product,
              },
            ]}
          />
        )}

        {/* Bottom Bar */}
        <div className="fixed bottom-2 right-2 p-5">
          {BOTTOM_BAR_LINKS.map(
            ({ description, to }: NavBarLink, index: number) => (
              <NavLink key={index} className={isBottomButtonActive} to={to}>
                {description}
              </NavLink>
            )
          )}

          <button className="btn primary lg">Logout</button>
        </div>
      </div>
    </div>
  );
}
