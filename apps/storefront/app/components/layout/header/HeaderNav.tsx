export const HeaderNav = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      <Link 
        to="/products" 
        className="text-primary-50 hover:text-primary-100 transition-colors py-2"
      >
        Products
      </Link>
      {/* ... other nav items ... */}
    </nav>
  );
}; 