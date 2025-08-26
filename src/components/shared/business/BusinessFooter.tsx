const BusinessFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-transparent">
      <div className="wrapper py-[32px]">
        <div className="flex items-center justify-center">
          <p className="text-center">
            © {new Date().getFullYear()} ARTYLST • Custom sound for modern brands
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BusinessFooter;
