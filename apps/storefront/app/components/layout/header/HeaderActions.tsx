export const HeaderActions = () => {
  return (
    <div className="flex items-center">
      <button 
        type="button"
        className="text-primary-50 hover:text-primary-100 transition-colors p-2"
      >
        {/* ... button content ... */}
      </button>
      
      <CartButton 
        className="text-primary-50 hover:text-primary-100 transition-colors p-2"
      />
    </div>
  );
}; 