import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="font-extrabold text-2xl text-green-600 dark:text-green-400">BhojanMap!</h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6 text-green-700 dark:text-green-300 font-medium">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>
            <Link to="/contact">Contact</Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="text-green-700 dark:text-green-300">Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-green-400">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/cart" className="relative cursor-pointer text-green-700 dark:text-green-300">
              <ShoppingCart />
              {cart.length > 0 && (
                <Button
                  size="icon"
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                >
                  {cart.length}
                </Button>
              )}
            </Link>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {loading ? (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={logout} className="bg-green-600 hover:bg-green-700 text-white">
                Logout
              </Button>
            )}
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const { setTheme } = useThemeStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full bg-green-100 text-green-800 hover:bg-green-200" variant="outline">
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-green-600 dark:text-green-400">BhojanMap</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-green-400">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1 text-green-700 dark:text-green-300">
          <Link to="/profile" className="flex items-center gap-4 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer hover:text-green-900 font-medium">
            <User /> <span>Profile</span>
          </Link>
          <Link to="/order/status" className="flex items-center gap-4 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer hover:text-green-900 font-medium">
            <HandPlatter /> <span>Order</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-4 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer hover:text-green-900 font-medium">
            <ShoppingCart /> <span>Cart (0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link to="/admin/menu" className="flex items-center gap-4 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer hover:text-green-900 font-medium">
                <SquareMenu /> <span>Menu</span>
              </Link>
              <Link to="/admin/restaurant" className="flex items-center gap-4 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer hover:text-green-900 font-medium">
                <UtensilsCrossed /> <span>Restaurant</span>
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-4 hover:bg-green-100 px-3 py-2 rounded-lg cursor-pointer hover:text-green-900 font-medium">
                <PackageCheck /> <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold text-green-700 dark:text-green-300">{user?.fullname}</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={logout} className="bg-green-600 hover:bg-green-700 text-white">
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
